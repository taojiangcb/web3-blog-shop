import {
  ChatPromptTemplate,
  SystemMessagePromptTemplate,
} from "@langchain/core/prompts";
import {
  MorphemeAnalysis,
  SimpleMorphemeAnalysis,
} from "../interfaces/IMorphemeAnalysis";
import { z } from "zod";
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { expandMorpheme } from "../utils/morphemeTransformer";

// 应当在文件顶部或配置模块中定义（用户当前缺失的部分）
const EXAMPLE_CONFIG = {
  count: 1, // 控制例句数量
  cognates: 2, // 控制同源词数量
} as const;

// 示例响应生成函数
const createSampleResponse = (): SimpleMorphemeAnalysis => ({
  w: "unpredictable",
  m: {
    p: [["un-", "否定"]],
    r: [["dict", "说"]],
    s: [["-able", "能够", "adj/形容词"]],  // 更改为具体的词性标注
  },
  e: [["The weather here is utterly unpredictable.", "这里的天气完全无法预测"]],
});

// 动态生成符合校验的示例
const sampleResponse = createSampleResponse();
const sampleResponseStr = JSON.stringify(sampleResponse, null, 2);

const escapeCurlyBraces = (str: string) =>
  str.replace(/{/g, "{{").replace(/}/g, "}}");

// 强化提示词结构
const analyzerWordPrompt = SystemMessagePromptTemplate.fromTemplate(`
As a morphological analysis expert, analyze the word "{word}" and output in the following JSON format:

\`\`\`json
${escapeCurlyBraces(sampleResponseStr)} 
\`\`\`

Requirements:
1. Ensure accurate morpheme analysis
2. For suffixes, provide the part of speech (e.g., "noun", "verb", "adjective", "adverb") as the third element
3. Provide exactly ${EXAMPLE_CONFIG.count} example sentence(s)
4. Strictly follow the output format
`);

// 定义简化的数据结构
const SimpleSchema = z.object({
  w: z.string(),
  m: z.object({
    p: z.array(z.tuple([z.string(), z.string()])).optional(),
    r: z.array(z.tuple([z.string(), z.string()])),
    s: z.array(z.tuple([z.string(), z.string(), z.string()])).optional(),
  }),
  e: z.array(z.tuple([z.string(), z.string()])),
});

// 创建自定义解析器
class MorphemeParser extends StructuredOutputParser<typeof SimpleSchema> {
  static formatInstructions() {
    return "Response must be valid JSON with markdown code block";
  }

  // 先返回简化结构
  async parse(text: string): Promise<z.infer<typeof SimpleSchema>> {
    try {
      // 1. 清理 markdown 格式并提取 JSON
      const cleaned = text
        .replace(/```json\s*/g, "")
        .replace(/```\s*/g, "")
        .replace(/\\n/g, "\n")  // 处理转义的换行符
        .replace(/\\"/g, '"')   // 处理转义的引号
        .trim();
  
      // 2. 尝试提取 JSON 字符串
      const jsonMatch = cleaned.match(/({[\s\S]*})/);
      if (!jsonMatch) {
        console.error('无法提取 JSON:', cleaned);
        throw new Error('无法找到有效的 JSON 格式');
      }
  
      // 3. 解析 JSON
      let json: unknown;
      try {
        const jsonStr = jsonMatch[1].trim();
        json = JSON.parse(jsonStr);
      } catch (e) {
        console.error('JSON 解析错误:', e);
        throw new Error(`JSON 解析失败: ${jsonMatch[1]}`);
      }

      // 3. 验证简化结构
      // const result = SimpleSchema.safeParse(json);
      // if (!result.success) {
      //   throw new Error(`数据结构验证失败: ${result.error.message}`);
      // }

      // // 4. 直接返回简化结构
      // return result.data;
      return json as z.infer<typeof SimpleSchema>;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "未知错误";
      throw new Error(`词素分析失败: ${errorMessage}`);
    }
  }

  // 添加新方法用于获取完整结构
  async parseToFull(text: string): Promise<MorphemeAnalysis> {
    const simpleResult = await this.parse(text);
    return expandMorpheme(simpleResult);
  }
}

// 初始化解析器实例
const morphemeParser = new MorphemeParser(SimpleSchema);

// 优化后的提示模板
const analyzerChartPrompt = ChatPromptTemplate.fromMessages([
  analyzerWordPrompt,
]);

export { analyzerChartPrompt, morphemeParser };

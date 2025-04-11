import {
  ChatPromptTemplate,
  SystemMessagePromptTemplate,
} from "@langchain/core/prompts";
import MorphemeAnalysis from "../interfaces/IMorphemeAnalysis";
import { z } from "zod";
import { StructuredOutputParser } from "@langchain/core/output_parsers";

// 应当在文件顶部或配置模块中定义（用户当前缺失的部分）
const EXAMPLE_CONFIG = {
  count: 1, // 控制例句数量
  cognates: 2, // 控制同源词数量
} as const;

// 示例响应生成函数
const createSampleResponse = (): MorphemeAnalysis => ({
  word: "unpredictable",
  morphemes: {
    prefixes: [
      {
        segment: "un-",
        meaning: "否定",
        // origin: "古英语",
        // linguisticRegister: "formal",
      },
    ],
    roots: [
      {
        segment: "dict",
        meaning: "说",
        // origin: "拉丁语",
        // variantForms: ["dic", "dit"],
      },
    ],
    suffixes: [
      {
        segment: "-able",
        function: "形容词化",
        meaning: "后缀含义",
        // productivity: "high",
      },
    ],
  },
  usage: {
    examples: Array(EXAMPLE_CONFIG.count).fill({
      en: "The weather here is utterly unpredictable.",
      zh: "这里的天气完全无法预测",
    }),
  },
});

// 动态生成符合校验的示例
const sampleResponse = createSampleResponse();
const sampleResponseStr = JSON.stringify(sampleResponse, null, 2);

const escapeCurlyBraces = (str: string) =>
  str.replace(/{/g, "{{").replace(/}/g, "}}");

// 强化提示词结构
const analyzerWordPrompt = SystemMessagePromptTemplate.fromTemplate(`
# 词源学分析协议

## 处理目标
分析 {word} 的构词结构和语义演变

## 处理规范
[[形态切分]]
1. 最大分词法识别词素
2. 语素标注规则：
   - 语源优先级：拉丁语 > 希腊语 > 古英语
   - 非标准变体标记（如 phon → phono）
   - 混合词源使用 "hybrid" 标记

[[语义映射]]
1. 字面含义组合
2. 语义演变路径展示（使用 → 符号）
3. 现代语义标注

[[数据要求]]
1. 当代例句：
   - 数量：精确 ${EXAMPLE_CONFIG.count} 个
   - 格式：严格中英对照

## 输出规范
\`\`\`json
${escapeCurlyBraces(sampleResponseStr)} 
\`\`\`

## 异常处理
1. 词素冲突：保留所有可能性
2. 解析失败：记录到 warnings 字段
3. 位置信息：保留原始词素序列

开始分析：{word}`);

// 定义核心数据结构
const MorphemeSchema = z.object({
  prefixes: z.array(
    z.object({
      segment: z.string(),
      meaning: z.string(),
      origin: z.string(),
      linguisticRegister: z.enum(["formal", "informal"]).optional(),
    })
  ),
  roots: z.array(
    z.object({
      segment: z.string(),
      meaning: z.string(),
      origin: z.string(),
      variantForms: z.array(z.string()).optional(),
    })
  ),
  suffixes: z.array(
    z.object({
      segment: z.string(),
      function: z.string(),
      productivity: z.enum(["high", "medium", "low"]).optional(),
      origin: z.string().optional(), // 新增可选字段
    })
  ),
});

const CognateSchema = z.object({
  word: z.string(),
  type: z.enum(["noun", "verb", "adjective", "adverb"]), // 根据实际响应字段调整
  meaning: z.string(),
});

const OutputSchema = z.object({
  word: z.string(),
  morphemes: MorphemeSchema,
  semanticEvolution: z.object({
    literal: z.string(),
    modern: z.string(),
    path: z.string().optional(), // 新增语义演变路径
  }),
  usage: z.object({
    examples: z.array(
      z.object({
        en: z.string(),
        zh: z.string(),
      })
    ),
    cognates: z.array(CognateSchema), // 使用调整后的同源词模式
  }),
  warnings: z.array(z.string()).optional(),
});

// 创建自定义解析器
class MorphemeParser extends StructuredOutputParser<typeof OutputSchema> {
  static formatInstructions() {
    return "Response must be valid JSON with markdown code block";
  }

  async parse(text: string): Promise<z.infer<typeof OutputSchema>> {
    try {
      // 清洗响应内容
      const cleaned = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();
      const json = JSON.parse(cleaned);
      return json;
    } catch (error) {
      throw new Error(
        `Failed to parse output: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }
}

// 初始化解析器实例
const morphemeParser = new MorphemeParser(OutputSchema);

// 优化后的提示模板
const analyzerChartPrompt = ChatPromptTemplate.fromMessages([
  analyzerWordPrompt,
]);

export { analyzerChartPrompt, morphemeParser };

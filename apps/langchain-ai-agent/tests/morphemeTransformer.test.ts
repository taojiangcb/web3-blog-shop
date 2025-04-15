import { expandMorpheme, simplifyMorpheme } from '../src/utils/morphemeTransformer';
import { SimpleMorphemeAnalysis, MorphemeAnalysis } from '../src/interfaces/IMorphemeAnalysis';

describe('morphemeTransformer', () => {
  describe('expandMorpheme', () => {
    it('应该正确展开完整的形态素分析', () => {
      const input: SimpleMorphemeAnalysis = {
        w: "unpredictable",
        m: {
          p: [["un-", "否定"]],
          r: [["dict", "说"]],
          s: [["-able", "能够", "adj"]],
        },
        e: [["The weather is unpredictable.", "天气是不可预测的"]]
      };

      const expected: MorphemeAnalysis = {
        word: "unpredictable",
        morphemes: {
          prefixes: [{ segment: "un-", meaning: "否定" }],
          roots: [{ segment: "dict", meaning: "说" }],
          suffixes: [{ segment: "-able", meaning: "能够", function: "adj" }],
        },
        usage: {
          examples: [{ 
            en: "The weather is unpredictable.", 
            zh: "天气是不可预测的" 
          }],
        },
      };

      expect(expandMorpheme(input)).toEqual(expected);
    });

    it('应该处理可选字段为空的情况', () => {
      const input: SimpleMorphemeAnalysis = {
        w: "test",
        m: {
          r: [["test", "测试"]],
        },
        e: [["Run the test.", "运行测试。"]]
      };

      const expected: MorphemeAnalysis = {
        word: "test",
        morphemes: {
          prefixes: [],
          roots: [{ segment: "test", meaning: "测试" }],
          suffixes: [],
        },
        usage: {
          examples: [{ 
            en: "Run the test.", 
            zh: "运行测试。" 
          }],
        },
      };

      expect(expandMorpheme(input)).toEqual(expected);
    });
  });

  describe('simplifyMorpheme', () => {
    it('应该正确简化形态素分析', () => {
      const input: MorphemeAnalysis = {
        word: "unpredictable",
        morphemes: {
          prefixes: [{ segment: "un-", meaning: "否定" }],
          roots: [{ segment: "dict", meaning: "说" }],
          suffixes: [{ segment: "-able", meaning: "能够", function: "adj" }],
        },
        usage: {
          examples: [{ 
            en: "The weather is unpredictable.", 
            zh: "天气是不可预测的" 
          }],
        },
      };

      const expected: SimpleMorphemeAnalysis = {
        w: "unpredictable",
        m: {
          p: [["un-", "否定"]],
          r: [["dict", "说"]],
          s: [["-able", "能够", "adj"]],
        },
        e: [["The weather is unpredictable.", "天气是不可预测的"]]
      };

      expect(simplifyMorpheme(input)).toEqual(expected);
    });

    it('应该处理空数组的情况', () => {
      const input: MorphemeAnalysis = {
        word: "test",
        morphemes: {
          prefixes: [],
          roots: [{ segment: "test", meaning: "测试" }],
          suffixes: [],
        },
        usage: {
          examples: [{ 
            en: "Run the test.", 
            zh: "运行测试。" 
          }],
        },
      };

      const expected: SimpleMorphemeAnalysis = {
        w: "test",
        m: {
          p: [],
          r: [["test", "测试"]],
          s: [],
        },
        e: [["Run the test.", "运行测试。"]]
      };

      expect(simplifyMorpheme(input)).toEqual(expected);
    });
  });
});
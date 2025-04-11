/**
 * 词素分析结果类型定义
 * 用于描述单词的词源学分析结果，包含词素分解、语义演变和使用信息
 */
export default interface MorphemeAnalysis {
  /** 目标单词 */
  word: string;
  /** 词素分解结果 */
  morphemes: {
    /** 前缀信息 */
    prefixes: Array<{
      /** 前缀片段 */
      segment: string;
      /** 前缀含义 */
      meaning: string;
      /** 词源 */
      origin: string;
      /** 语体标记（正式/非正式） */
      linguisticRegister?: "formal" | "informal";
    }>;
    /** 词根信息 */
    roots: Array<{
      /** 词根片段 */
      segment: string;
      /** 词根含义 */
      meaning: string;
      /** 词源 */
      origin: string;
      /** 变体形式 */
      variantForms?: string[];
    }>;
    /** 后缀信息 */
    suffixes: Array<{
      /** 后缀片段 */
      segment: string;
      /** 语法功能 */
      function: string;
      /** 后缀含义 */
      meaning: string;
      /** 能产性（高/中/低） */
      productivity?: "high" | "medium" | "low";
    }>;
  };
  /** 语义演变信息 */
  // semanticEvolution: {
  //   /** 字面含义 */
  //   literal: string;
  //   /** 现代含义 */
  //   modern: string;
  // };
  /** 使用信息 */
  usage: {
    /** 示例句子（中英对照） */
    examples: Array<{
      en: string;
      zh: string;
    }>;
    /** 同源词列表 */
    // cognates: string[];
  };
  /** 分析过程中的警告信息 */
  // warnings?: string[];
}

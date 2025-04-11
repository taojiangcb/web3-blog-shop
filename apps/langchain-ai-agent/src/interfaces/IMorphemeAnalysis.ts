export interface SimpleMorphemeAnalysis {
  w: string;  // word
  m: {
    p?: [string, string][],  // [segment, meaning]
    r: [string, string][],   // [segment, meaning]
    s?: [string, string][]   // [segment, meaning]
  };
  e: [string, string][];     // examples [en, zh]
}

export interface MorphemeAnalysis {
  word: string;
  morphemes: {
    prefixes: Array<{
      segment: string;
      meaning: string;
    }>;
    roots: Array<{
      segment: string;
      meaning: string;
    }>;
    suffixes: Array<{
      segment: string;
      function: string;
      meaning: string;
    }>;
  };
  usage: {
    examples: Array<{
      en: string;
      zh: string;
    }>;
  };
}

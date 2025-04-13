export interface SimpleMorphemeAnalysis {
  w: string; // word
  m: {
    p?: [string, string][]; // [segment, meaning]
    r: [string, string][]; // [segment, meaning]
    s?: [string, string, string][]; // [segment, meaning, function]
  };
  e: [string, string][]; // examples [en, zh]
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
      meaning: string;
      function: string;
    }>;
  };
  usage: {
    examples: Array<{
      en: string;
      zh: string;
    }>;
  };
}

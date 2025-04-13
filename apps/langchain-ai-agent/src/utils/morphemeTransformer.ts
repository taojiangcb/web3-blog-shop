import {
  SimpleMorphemeAnalysis,
  MorphemeAnalysis,
} from "../interfaces/IMorphemeAnalysis";

export function expandMorpheme(
  simple: SimpleMorphemeAnalysis
): MorphemeAnalysis {
  return {
    word: simple.w,
    morphemes: {
      prefixes: (simple.m.p || []).map(([segment, meaning]) => ({
        segment,
        meaning,
      })),
      roots: simple.m.r.map(([segment, meaning]) => ({
        segment,
        meaning,
      })),
      suffixes: (simple.m.s || []).map(([segment, meaning, func]) => ({
        segment,
        function: func,
        meaning,
      })),
    },
    usage: {
      examples: simple.e.map(([en, zh]) => ({
        en,
        zh,
      })),
    },
  };
}

export function simplifyMorpheme(
  full: MorphemeAnalysis
): SimpleMorphemeAnalysis {
  return {
    w: full.word,
    m: {
      p: full.morphemes.prefixes.map((p) => [p.segment, p.meaning]),
      r: full.morphemes.roots.map((r) => [r.segment, r.meaning]),
      s: full.morphemes.suffixes.map((s) => [s.segment, s.meaning,s.function]),
    },
    e: full.usage.examples.map((e) => [e.en, e.zh]),
  };
}

import {
  SimpleMorphemeAnalysis,
  MorphemeAnalysis,
} from "../interfaces/IMorphemeAnalysis";

export function expandMorpheme(
  simple: SimpleMorphemeAnalysis
): MorphemeAnalysis {
  const p = simple?.m?.p || [];
  const r = simple?.m?.r || [];
  const s = simple?.m?.s || [];
  const e = simple.e || [];

  const prefixes = p.map(([segment, meaning]) => ({ segment, meaning }));
  const roots = r.map(([segment, meaning]) => ({ segment, meaning }));
  const suffixes = s.map(([segment, meaning, func]) => ({
    segment,
    meaning,
    function: func,
  }));

  const examples = e.map(([en, zh]) => ({ en, zh }));

  return {
    word: simple.w,
    morphemes: {
      prefixes,
      roots,
      suffixes,
    },
    usage: {
      examples,
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
      s: full.morphemes.suffixes.map((s) => [s.segment, s.meaning, s.function]),
    },
    e: full.usage.examples.map((e) => [e.en, e.zh]),
  };
}

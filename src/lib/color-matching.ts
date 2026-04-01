import * as dE from "delta-e";
import convert from "color-convert";
import type { ExtractedColor, BrandMatch, MatchedColor, PaintColor } from "@/types";

import sherwinWilliams from "@/data/sherwin-williams.json";
import benjaminMoore from "@/data/benjamin-moore.json";
import behr from "@/data/behr.json";
import ppg from "@/data/ppg.json";
import valspar from "@/data/valspar.json";
import pantone from "@/data/pantone.json";

interface LAB {
  L: number;
  A: number;
  B: number;
}

const brandDatasets: { brand: string; colors: PaintColor[] }[] = [
  { brand: "Sherwin-Williams", colors: sherwinWilliams as PaintColor[] },
  { brand: "Benjamin Moore", colors: benjaminMoore as PaintColor[] },
  { brand: "Behr", colors: behr as PaintColor[] },
  { brand: "PPG", colors: ppg as PaintColor[] },
  { brand: "Valspar", colors: valspar as PaintColor[] },
  { brand: "Pantone", colors: pantone as PaintColor[] },
];

// Pre-compute LAB values for all brand colors
const brandDatasetsWithLab = brandDatasets.map(({ brand, colors }) => ({
  brand,
  colors: colors.map((c) => {
    if (c.lab) return c;
    const [l, a, b] = convert.rgb.lab([c.rgb.r, c.rgb.g, c.rgb.b]);
    return { ...c, lab: { l, a, b } };
  }),
}));

function findClosestMatch(
  targetLab: LAB,
  brand: string,
  colors: PaintColor[]
): BrandMatch {
  let bestMatch: PaintColor = colors[0];
  let bestDelta = Infinity;

  for (const color of colors) {
    const lab = color.lab!;
    const delta = dE.getDeltaE00(
      { L: targetLab.L, A: targetLab.A, B: targetLab.B },
      { L: lab.l, A: lab.a, B: lab.b }
    );
    if (delta < bestDelta) {
      bestDelta = delta;
      bestMatch = color;
    }
  }

  return {
    brand,
    code: bestMatch.code,
    name: bestMatch.name,
    hex: bestMatch.hex,
    deltaE: Math.round(bestDelta * 100) / 100,
  };
}

export function matchColors(extractedColors: ExtractedColor[]): MatchedColor[] {
  return extractedColors.map((color) => {
    const targetLab: LAB = { L: color.lab.l, A: color.lab.a, B: color.lab.b };
    const matches = brandDatasetsWithLab.map(({ brand, colors }) =>
      findClosestMatch(targetLab, brand, colors as PaintColor[])
    );

    return { ...color, matches };
  });
}

import { Vibrant } from "node-vibrant/node";
import convert from "color-convert";
import type { ExtractedColor } from "@/types";

export async function extractColors(
  imageBuffer: Buffer
): Promise<ExtractedColor[]> {
  const palette = await Vibrant.from(imageBuffer)
    .maxColorCount(64)
    .quality(1)
    .getPalette();

  const colors: ExtractedColor[] = [];
  const swatches = [
    palette.Vibrant,
    palette.DarkVibrant,
    palette.LightVibrant,
    palette.Muted,
    palette.DarkMuted,
    palette.LightMuted,
  ];

  for (const swatch of swatches) {
    if (!swatch) continue;
    const [r, g, b] = swatch.rgb.map(Math.round);
    const hex = `#${convert.rgb.hex([r, g, b])}`;
    const [l, a, bVal] = convert.rgb.lab([r, g, b]);

    colors.push({
      hex,
      rgb: { r, g, b },
      lab: { l, a, b: bVal },
      population: swatch.population,
    });
  }

  return colors;
}

import { NextRequest, NextResponse } from "next/server";
import { matchColors } from "@/lib/color-matching";
import type { ExtractedColor } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const { colors } = (await request.json()) as { colors: ExtractedColor[] };

    if (!colors || !Array.isArray(colors) || colors.length === 0) {
      return NextResponse.json(
        { error: "No colors provided" },
        { status: 400 }
      );
    }

    const matched = matchColors(colors);

    return NextResponse.json({ colors: matched });
  } catch (error) {
    console.error("Color matching error:", error);
    return NextResponse.json(
      { error: "Failed to match colors" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { extractColors } from "@/lib/color-extraction";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("image") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const colors = await extractColors(buffer);

    return NextResponse.json({ colors });
  } catch (error) {
    console.error("Color extraction error:", error);
    return NextResponse.json(
      { error: "Failed to extract colors" },
      { status: 500 }
    );
  }
}

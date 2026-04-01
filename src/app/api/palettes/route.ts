import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: palettes, error } = await supabase
    .from("palettes")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const palettesWithColors = await Promise.all(
    (palettes || []).map(async (palette) => {
      const { data: colors } = await supabase
        .from("palette_colors")
        .select("*")
        .eq("palette_id", palette.id)
        .order("position");
      return { ...palette, colors: colors || [] };
    })
  );

  return NextResponse.json({ palettes: palettesWithColors });
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name, colors } = await request.json();

  const { data: palette, error: paletteError } = await supabase
    .from("palettes")
    .insert({ name, user_id: user.id })
    .select()
    .single();

  if (paletteError) {
    return NextResponse.json({ error: paletteError.message }, { status: 500 });
  }

  const colorRows = colors.map(
    (
      color: {
        hex: string;
        rgb: { r: number; g: number; b: number };
        lab: { l: number; a: number; b: number };
        matches: {
          brand: string;
          code: string;
          name: string;
        }[];
      },
      i: number
    ) => {
      const findMatch = (brand: string) =>
        color.matches.find((m) => m.brand === brand);

      const sw = findMatch("Sherwin-Williams");
      const bm = findMatch("Benjamin Moore");
      const behr = findMatch("Behr");
      const ppg = findMatch("PPG");
      const valspar = findMatch("Valspar");
      const pantone = findMatch("Pantone");

      return {
        palette_id: palette.id,
        position: i + 1,
        hex: color.hex,
        rgb_r: color.rgb.r,
        rgb_g: color.rgb.g,
        rgb_b: color.rgb.b,
        lab_l: color.lab.l,
        lab_a: color.lab.a,
        lab_b: color.lab.b,
        pantone_code: pantone?.code || null,
        pantone_name: pantone?.name || null,
        sherwin_williams_code: sw?.code || null,
        sherwin_williams_name: sw?.name || null,
        benjamin_moore_code: bm?.code || null,
        benjamin_moore_name: bm?.name || null,
        behr_code: behr?.code || null,
        behr_name: behr?.name || null,
        ppg_code: ppg?.code || null,
        ppg_name: ppg?.name || null,
        valspar_code: valspar?.code || null,
        valspar_name: valspar?.name || null,
      };
    }
  );

  const { error: colorsError } = await supabase
    .from("palette_colors")
    .insert(colorRows);

  if (colorsError) {
    return NextResponse.json({ error: colorsError.message }, { status: 500 });
  }

  return NextResponse.json({ palette: { ...palette, colors: colorRows } });
}

export async function DELETE(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await request.json();

  await supabase.from("palette_colors").delete().eq("palette_id", id);
  const { error } = await supabase.from("palettes").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

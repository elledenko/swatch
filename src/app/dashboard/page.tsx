"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { SavedPalette } from "@/types";

export default function DashboardPage() {
  const [palettes, setPalettes] = useState<SavedPalette[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    loadPalettes();
  }, []);

  async function loadPalettes() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { data: palettesData } = await supabase
      .from("palettes")
      .select("*")
      .order("created_at", { ascending: false });

    if (palettesData) {
      const palettesWithColors = await Promise.all(
        palettesData.map(async (palette) => {
          const { data: colors } = await supabase
            .from("palette_colors")
            .select("*")
            .eq("palette_id", palette.id)
            .order("position");
          return { ...palette, colors: colors || [] };
        })
      );
      setPalettes(palettesWithColors);
    }
    setLoading(false);
  }

  async function deletePalette(id: string) {
    await supabase.from("palette_colors").delete().eq("palette_id", id);
    await supabase.from("palettes").delete().eq("id", id);
    setPalettes(palettes.filter((p) => p.id !== id));
  }

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-16">
        <p className="text-stone-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-serif font-bold text-stone-900">
          Your Palettes
        </h1>
        <Link
          href="/"
          className="px-4 py-2 bg-stone-900 text-white rounded-lg text-sm font-medium hover:bg-stone-800 transition-colors"
        >
          + New Palette
        </Link>
      </div>

      {palettes.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-stone-500 text-lg mb-4">No palettes saved yet.</p>
          <Link
            href="/"
            className="text-amber-700 font-medium hover:underline"
          >
            Upload an image to get started
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {palettes.map((palette) => (
            <div
              key={palette.id}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex h-20">
                {palette.colors.map((color) => (
                  <div
                    key={color.id}
                    className="flex-1"
                    style={{ backgroundColor: color.hex }}
                  />
                ))}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-stone-900">
                  {palette.name}
                </h3>
                <p className="text-sm text-stone-500 mt-1">
                  {new Date(palette.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
                <button
                  onClick={() => deletePalette(palette.id)}
                  className="mt-3 text-xs text-stone-400 hover:text-red-500 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

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
        <div className="w-8 h-8 border-2 border-blush border-t-terracotta rounded-full animate-spin mx-auto" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-serif font-bold text-navy">
          Your Palettes
        </h1>
        <Link
          href="/"
          className="px-5 py-2 bg-terracotta text-white rounded-full text-sm font-medium hover:bg-terracotta-dark transition-colors"
        >
          + New Palette
        </Link>
      </div>

      {palettes.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-20 h-20 rounded-full bg-blush/30 flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-terracotta/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-navy/40 text-lg mb-4">No palettes saved yet.</p>
          <Link
            href="/"
            className="text-terracotta font-medium hover:underline"
          >
            Upload an image to get started
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {palettes.map((palette) => (
            <div
              key={palette.id}
              className="bg-white/70 backdrop-blur-sm rounded-2xl border border-blush/30 overflow-hidden shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
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
                <h3 className="font-semibold text-navy">
                  {palette.name}
                </h3>
                <p className="text-sm text-navy/40 mt-1">
                  {new Date(palette.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
                <button
                  onClick={() => deletePalette(palette.id)}
                  className="mt-3 text-xs text-navy/25 hover:text-red-500 transition-colors"
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

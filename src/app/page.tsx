"use client";

import { useState } from "react";
import ImageUploader from "@/components/ImageUploader";
import PaletteDisplay from "@/components/PaletteDisplay";
import type { MatchedColor } from "@/types";

export default function HomePage() {
  const [colors, setColors] = useState<MatchedColor[] | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleImageUpload(file: File) {
    setLoading(true);
    setError(null);
    setColors(null);

    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const extractRes = await fetch("/api/extract", {
        method: "POST",
        body: formData,
      });

      if (!extractRes.ok) throw new Error("Failed to extract colors");
      const extracted = await extractRes.json();

      const matchRes = await fetch("/api/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ colors: extracted.colors }),
      });

      if (!matchRes.ok) throw new Error("Failed to match colors");
      const matched = await matchRes.json();

      setColors(matched.colors);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setColors(null);
    setImagePreview(null);
    setError(null);
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      {!colors ? (
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-sm font-medium tracking-widest uppercase text-terracotta mb-6">
            Image to Paint Color
          </p>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-navy mb-6 leading-tight">
            Upload an image.<br />
            <span className="text-terracotta">Find your colors.</span>
          </h1>
          <p className="text-lg text-navy/50 mb-12 max-w-md mx-auto">
            Instantly match any photo to Sherwin-Williams, Benjamin Moore, Behr, PPG, Valspar &amp; Pantone.
          </p>
          <ImageUploader onUpload={handleImageUpload} loading={loading} />
          {error && (
            <p className="mt-4 text-red-600 text-sm">{error}</p>
          )}
          <div className="mt-16 flex items-center justify-center gap-8 text-xs text-navy/30 font-medium tracking-wider uppercase">
            <span>Sherwin-Williams</span>
            <span>Benjamin Moore</span>
            <span>Behr</span>
            <span>PPG</span>
            <span>Valspar</span>
            <span>Pantone</span>
          </div>
        </div>
      ) : (
        <PaletteDisplay
          colors={colors}
          imagePreview={imagePreview}
          onReset={handleReset}
        />
      )}
    </div>
  );
}

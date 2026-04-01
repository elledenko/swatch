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
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-stone-900 mb-4">
            Upload an image.
          </h1>
          <p className="text-xl text-stone-500 mb-12">
            Find your colors across every major paint brand.
          </p>
          <ImageUploader onUpload={handleImageUpload} loading={loading} />
          {error && (
            <p className="mt-4 text-red-600 text-sm">{error}</p>
          )}
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

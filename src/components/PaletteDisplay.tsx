"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { MatchedColor } from "@/types";
import ColorCard from "./ColorCard";

interface Props {
  colors: MatchedColor[];
  imagePreview: string | null;
  onReset: () => void;
}

export default function PaletteDisplay({ colors, imagePreview, onReset }: Props) {
  const [expandedIndex, setExpandedIndex] = useState(0);
  const [saving, setSaving] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [paletteName, setPaletteName] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const supabase = createClient();

  async function handleSave() {
    if (!paletteName.trim()) return;
    setSaving(true);
    setSaveError(null);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setSaveError("Sign in to save palettes");
      setSaving(false);
      return;
    }

    try {
      const res = await fetch("/api/palettes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: paletteName, colors }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save");
      }

      setSaveSuccess(true);
      setShowSaveModal(false);
      setPaletteName("");
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onReset}
          className="text-sm text-stone-500 hover:text-stone-700 transition-colors flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          New image
        </button>

        {saveSuccess ? (
          <span className="text-sm text-green-600 font-medium">Saved!</span>
        ) : (
          <button
            onClick={() => setShowSaveModal(true)}
            className="px-4 py-2 bg-stone-900 text-white rounded-lg text-sm font-medium hover:bg-stone-800 transition-colors"
          >
            Save Palette
          </button>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Image preview + palette strip */}
        <div className="lg:w-80 shrink-0">
          {imagePreview && (
            <div className="rounded-2xl overflow-hidden border border-stone-200 mb-4">
              <img
                src={imagePreview}
                alt="Uploaded"
                className="w-full h-48 object-cover"
              />
            </div>
          )}
          <div className="flex rounded-xl overflow-hidden border border-stone-200">
            {colors.map((color, i) => (
              <button
                key={i}
                onClick={() => setExpandedIndex(i)}
                className={`flex-1 h-14 transition-all ${expandedIndex === i ? "ring-2 ring-stone-900 ring-offset-1 z-10 rounded-lg" : ""}`}
                style={{ backgroundColor: color.hex }}
                title={color.hex}
              />
            ))}
          </div>
        </div>

        {/* Color details */}
        <div className="flex-1 space-y-3">
          {colors.map((color, i) => (
            <ColorCard
              key={i}
              color={color}
              index={i}
              isExpanded={expandedIndex === i}
              onToggle={() => setExpandedIndex(expandedIndex === i ? -1 : i)}
            />
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <p className="mt-12 text-center text-xs text-stone-400">
        Color matches are approximations based on digital color values. Actual paint colors may vary.
        Pantone codes are nearest-match estimates, not official Pantone references.
      </p>

      {/* Save modal */}
      {showSaveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <h3 className="text-lg font-serif font-semibold text-stone-900 mb-4">
              Name your palette
            </h3>
            <input
              type="text"
              value={paletteName}
              onChange={(e) => setPaletteName(e.target.value)}
              placeholder="e.g., Living Room Inspo"
              autoFocus
              className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent text-stone-900"
              onKeyDown={(e) => e.key === "Enter" && handleSave()}
            />
            {saveError && (
              <p className="mt-2 text-red-600 text-sm">{saveError}</p>
            )}
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setShowSaveModal(false)}
                className="flex-1 py-2 px-4 text-sm text-stone-600 hover:text-stone-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !paletteName.trim()}
                className="flex-1 py-2 px-4 bg-stone-900 text-white rounded-lg text-sm font-medium hover:bg-stone-800 disabled:opacity-50 transition-colors"
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

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
          className="text-sm text-navy/40 hover:text-navy transition-colors flex items-center gap-2 font-medium"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          New image
        </button>

        {saveSuccess ? (
          <span className="text-sm text-sage-dark font-medium px-4 py-2 bg-sage/10 rounded-full">Saved!</span>
        ) : (
          <button
            onClick={() => setShowSaveModal(true)}
            className="px-5 py-2 bg-terracotta text-white rounded-full text-sm font-medium hover:bg-terracotta-dark transition-colors"
          >
            Save Palette
          </button>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Image preview + palette strip */}
        <div className="lg:w-80 shrink-0">
          {imagePreview && (
            <div className="rounded-2xl overflow-hidden border border-blush/40 mb-4 shadow-sm">
              <img
                src={imagePreview}
                alt="Uploaded"
                className="w-full h-48 object-cover"
              />
            </div>
          )}
          <div className="flex rounded-2xl overflow-hidden border border-blush/40 shadow-sm">
            {colors.map((color, i) => (
              <button
                key={i}
                onClick={() => setExpandedIndex(i)}
                className={`flex-1 h-16 transition-all duration-200 ${expandedIndex === i ? "ring-2 ring-navy ring-offset-2 z-10 rounded-xl scale-105" : "hover:scale-105"}`}
                style={{ backgroundColor: color.hex }}
                title={color.hex}
              />
            ))}
          </div>
          <p className="text-xs text-navy/30 mt-3 text-center">Click a color to see matches</p>
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

      {/* Save modal */}
      {showSaveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/30 backdrop-blur-sm">
          <div className="bg-cream rounded-3xl p-8 w-full max-w-sm shadow-2xl border border-blush/40">
            <h3 className="text-xl font-serif font-bold text-navy mb-5">
              Name your palette
            </h3>
            <input
              type="text"
              value={paletteName}
              onChange={(e) => setPaletteName(e.target.value)}
              placeholder="e.g., Living Room Inspo"
              autoFocus
              className="w-full px-4 py-3 rounded-xl border border-blush focus:outline-none focus:ring-2 focus:ring-terracotta/40 focus:border-terracotta text-navy bg-white"
              onKeyDown={(e) => e.key === "Enter" && handleSave()}
            />
            {saveError && (
              <p className="mt-2 text-red-600 text-sm">{saveError}</p>
            )}
            <div className="flex gap-3 mt-5">
              <button
                onClick={() => setShowSaveModal(false)}
                className="flex-1 py-3 px-4 text-sm text-navy/50 hover:text-navy transition-colors rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !paletteName.trim()}
                className="flex-1 py-3 px-4 bg-terracotta text-white rounded-xl text-sm font-medium hover:bg-terracotta-dark disabled:opacity-50 transition-colors"
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

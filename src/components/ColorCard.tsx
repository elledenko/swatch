"use client";

import type { MatchedColor } from "@/types";
import BrandMatchCard from "./BrandMatch";

interface Props {
  color: MatchedColor;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}

export default function ColorCard({ color, index, isExpanded, onToggle }: Props) {
  return (
    <div className="bg-white/70 rounded-2xl border border-blush/30 overflow-hidden shadow-sm backdrop-blur-sm">
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 p-4 hover:bg-white/50 transition-colors text-left"
      >
        <div
          className="w-14 h-14 rounded-xl shrink-0 shadow-sm border border-white/50"
          style={{ backgroundColor: color.hex }}
        />
        <div className="flex-1 min-w-0">
          <p className="font-mono text-sm font-semibold text-navy">
            {color.hex.toUpperCase()}
          </p>
          <p className="text-xs text-navy/35 mt-0.5">
            RGB({color.rgb.r}, {color.rgb.g}, {color.rgb.b})
          </p>
        </div>
        <span className="text-xs font-medium text-terracotta/70 bg-terracotta/8 px-3 py-1 rounded-full">
          {index + 1}
        </span>
        <svg
          className={`w-5 h-5 text-navy/30 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isExpanded && (
        <div className="px-4 pb-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {color.matches.map((match) => (
              <BrandMatchCard key={match.brand} match={match} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

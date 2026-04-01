import type { BrandMatch } from "@/types";

interface Props {
  match: BrandMatch;
}

export default function BrandMatchCard({ match }: Props) {
  return (
    <div className="bg-stone-50 rounded-xl p-3 border border-stone-100">
      <div className="flex items-center gap-2 mb-2">
        <div
          className="w-8 h-8 rounded-lg shadow-sm border border-stone-200"
          style={{ backgroundColor: match.hex }}
        />
        <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
          {match.brand}
        </span>
      </div>
      <p className="font-mono text-xs font-semibold text-stone-900">
        {match.code}
      </p>
      <p className="text-xs text-stone-600 mt-0.5">{match.name}</p>
      <p className="text-[10px] text-stone-400 mt-1">
        {match.hex.toUpperCase()} &middot; {match.deltaE < 3 ? "Excellent" : match.deltaE < 6 ? "Good" : "Approximate"} match
      </p>
    </div>
  );
}

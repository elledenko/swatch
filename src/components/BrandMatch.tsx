import type { BrandMatch } from "@/types";

interface Props {
  match: BrandMatch;
}

function matchQuality(deltaE: number): { label: string; color: string } {
  if (deltaE < 3) return { label: "Excellent", color: "text-sage-dark" };
  if (deltaE < 6) return { label: "Good", color: "text-ochre-dark" };
  return { label: "Approx.", color: "text-navy/40" };
}

export default function BrandMatchCard({ match }: Props) {
  const quality = matchQuality(match.deltaE);

  return (
    <div className="bg-warm-white rounded-xl p-3 border border-blush/20 hover:border-blush/50 transition-colors">
      <div className="flex items-start justify-between mb-2">
        <span className="text-[10px] font-semibold text-navy/40 uppercase tracking-wider leading-none">
          {match.brand}
        </span>
        <span className={`text-[10px] font-medium ${quality.color}`}>
          {quality.label}
        </span>
      </div>
      <div
        className="w-full h-10 rounded-lg shadow-sm border border-black/5 mb-2"
        style={{ backgroundColor: match.hex }}
      />
      <p className="font-mono text-xs font-bold text-navy leading-tight">
        {match.code}
      </p>
      <p className="text-xs text-navy/55 mt-0.5 leading-tight">{match.name}</p>
      {match.shopUrl && (
        <a
          href={match.shopUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 mt-2 text-[11px] font-medium text-terracotta hover:text-terracotta-dark transition-colors"
        >
          Shop this color
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      )}
    </div>
  );
}

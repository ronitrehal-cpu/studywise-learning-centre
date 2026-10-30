import React from 'react';
import { timeline } from '../data/timeline';

// Crest colours (brand.orange, brand.sky, brand.mist)
const ORANGE = '#E36531';
const SKY = '#2988BC';
const MIST = '#EAF4FA';

// Concentric "growth rings": entry n has n rings; past entries are sky blue, the latest is filled orange with white rings
function GrowthRings({ rings, latest }: { rings: number; latest: boolean }) {
  const outer = 22;
  const radii = Array.from({ length: rings }, (_, k) => (outer * (k + 1)) / rings);

  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className="w-12 h-12 flex-shrink-0 relative">
      {latest ? (
        <>
          <circle cx="24" cy="24" r={outer} fill={ORANGE} />
          {radii.slice(0, -1).map((r) => (
            <circle key={r} cx="24" cy="24" r={r} fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
          ))}
          <circle cx="24" cy="24" r="2.5" fill="#FFFFFF" />
        </>
      ) : (
        <>
          <circle cx="24" cy="24" r={outer} fill={MIST} stroke={SKY} strokeWidth="2" />
          {radii.slice(0, -1).map((r) => (
            <circle key={r} cx="24" cy="24" r={r} fill="none" stroke={SKY} strokeWidth="2" />
          ))}
          <circle cx="24" cy="24" r="3" fill={SKY} />
        </>
      )}
    </svg>
  );
}

export function Timeline() {
  return (
    <ol
      className="relative grid gap-12 md:gap-8 md:grid-cols-[repeat(var(--cols),minmax(0,1fr))]"
      style={{ '--cols': timeline.length } as React.CSSProperties}
    >
      <span
        aria-hidden="true"
        className="absolute bg-[#8DC3E0] left-[23px] top-6 bottom-6 w-[2px] md:left-0 md:right-0 md:top-[23px] md:bottom-auto md:w-auto md:h-[2px]"
      />
      {timeline.map((entry, index) => (
        <li key={entry.year} className="relative flex md:block gap-6">
          <GrowthRings rings={index + 1} latest={index === timeline.length - 1} />
          <div className="md:mt-6">
            <p className="font-serif font-medium text-brand-navy text-[30px] leading-tight tracking-tight">{entry.year}</p>
            <p className="mt-2 text-[17px] leading-[1.6] text-brand-slate max-w-sm">{entry.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

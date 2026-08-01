"use client";

import Link from "next/link";
import React from "react";

type Sponsor = {
  name: string;
  phrase?: string;
  href?: string;
//   eyebrow?: string;
  badge?: string;
};

export default function SponsorTicker({ sponsors }: { sponsors: Sponsor[] }) {
  if (!sponsors || sponsors.length === 0) return null;

  const phrase = sponsors[0].phrase || "Trusted by";

  // Build repeated list for smooth infinite marquee
  const nodes = sponsors.map((s, i) => (
    <div key={`s-${i}`} className="flex items-center mx-6">
      {s.href ? (
        <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.name} className="flex items-center justify-center px-2 py-1">
          {s.badge ? (
            <img
              src={`/sponsors/${s.badge}`}
              alt={s.name}
              className="h-20 sm:h-24 md:h-28 lg:h-32 w-auto max-w-[180px] object-contain opacity-90"
            />
          ) : (
            <span className="text-[var(--color-muted)]">{s.name}</span>
          )}
        </a>
      ) : (
        s.badge ? (
          <img
            src={`/sponsors/${s.badge}`}
            alt={s.name}
            className="h-20 sm:h-24 md:h-28 lg:h-32 w-auto max-w-[180px] object-contain opacity-90"
          />
        ) : (
          <span className="text-[var(--color-muted)]">{s.name}</span>
        )
      )}
    </div>
  ));

  return (
    <div className="mt-8 max-w-4xl mx-auto">
      <div className="text-sm uppercase tracking-widest text-[var(--color-muted)] mb-3 text-center">
        {phrase}
      </div>

      <div className="overflow-hidden relative">
        <div
          className="whitespace-nowrap flex items-center text-base sm:text-lg md:text-xl font-medium"
          style={{
            WebkitMaskImage: 'linear-gradient(90deg, transparent, black 6%, black 94%, transparent)',
          }}
        >
          <div
            className="marquee flex items-center"
            style={{
              display: 'inline-flex',
              animation: `marquee 18s linear infinite`,
              gap: '1.5rem',
            }}
          >
            {nodes}
            {nodes}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

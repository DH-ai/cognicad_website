"use client";

export type Sponsor = {
  name: string;
  phrase?: string;
  href?: string;
  badge?: string;
};

const NAMES: Record<string, string> = {
  dsse: "Desai Sethi School of Entrepreneurship",
  groww: "Groww",
  "iit-bombay": "IIT Bombay",
};

function Badge({ sponsor }: { sponsor: Sponsor }) {
  const label = NAMES[sponsor.name] ?? sponsor.name;
  const content = sponsor.badge ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/sponsors/${sponsor.badge}`}
      alt={label}
      className="sponsor-badge h-16 sm:h-20 md:h-24 w-auto max-w-[220px] object-contain"
    />
  ) : (
    <span className="text-base text-muted">{label}</span>
  );

  if (sponsor.href) {
    return (
      <a
        href={sponsor.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="flex items-center justify-center px-2 py-2 rounded-[4px] opacity-90 hover:opacity-100 transition-opacity duration-[180ms]"
      >
        {content}
      </a>
    );
  }
  return <div className="flex items-center justify-center px-2 py-2 opacity-90">{content}</div>;
}

export default function SponsorTicker({ sponsors }: { sponsors: Sponsor[] }) {
  if (!sponsors || sponsors.length === 0) return null;

  const phrase = sponsors[0].phrase || "Trusted by";

  const nodes = (suffix: string, hidden = false) =>
    sponsors.map((s, i) => (
      <div
        key={`${suffix}-${i}`}
        className="flex items-center mx-8"
        aria-hidden={hidden || undefined}
      >
        <Badge sponsor={s} />
      </div>
    ));

  return (
    <div className="border-t border-line pt-8">
      <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
        <p className="type-tech text-muted shrink-0">{phrase}</p>

        <div className="marquee relative overflow-hidden flex-1">
          <div
            className="whitespace-nowrap"
            style={{
              WebkitMaskImage:
                "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
              maskImage:
                "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
            }}
          >
            <div className="marquee-track">
              {nodes("a")}
              {nodes("b", true)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

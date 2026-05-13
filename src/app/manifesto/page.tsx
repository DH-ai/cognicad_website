import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manifesto — CogniCAD",
  description:
    "The philosophy behind CogniCAD. On human cognition, engineering intelligence, and the future of how we build the physical world.",
};

const SECTIONS = [
  {
    chapter: "I",
    title: "Philosophy",
    body: [
      "Engineering is an act of cognition before it is an act of geometry.",
      "When an engineer designs a structural joint, they are not moving points in space — they are reasoning through load paths, manufacturing constraints, material properties, and failure modes simultaneously. The geometry is the final output of a deeply cognitive process.",
      "Every engineering software product ever shipped has gotten this exactly backwards. They offer commands first, and leave the thinking entirely to the engineer.",
      "We are reversing this. CogniCAD is built around the thesis that the right interface for engineering work is not a menu system — it is a reasoning partner.",
    ],
  },
  {
    chapter: "II",
    title: "Human + AI",
    body: [
      "There is a failure mode in how most people think about AI in engineering: that it should replace engineering judgment, or that it should merely automate tedious tasks.",
      "Both are wrong, and both miss the real opportunity.",
      "The right model is cognitive partnership. An AI system that can hold the constraints, reason across the trade space, surface relevant precedent, and flag physical inconsistencies — while the engineer makes the decisions that require human judgment, creativity, and accountability.",
      "This is how great teams work. One person does not replace another. The whole becomes capable of things neither could achieve alone. We are building the AI half of that team.",
    ],
  },
  {
    chapter: "III",
    title: "Future of Engineering",
    body: [
      "The history of engineering tools is a history of abstraction. The lathe abstracted raw material removal. CAD abstracted geometric construction. Simulation abstracted physical testing.",
      "Each abstraction freed engineers to think at a higher level. To tackle problems that were previously intractable. To compress the cycle from concept to validation.",
      "Cognitive engineering is the next abstraction. It abstracts the workflow itself — the sequence of decisions, commands, and context switches that consume 60% of an engineer's working day.",
      "When engineers work with cognitive systems, they will think differently. Not because their judgment is replaced, but because the cognitive overhead of translating thought into software command is gone.",
    ],
  },
  {
    chapter: "IV",
    title: "Why CogniCAD Exists",
    body: [
      "We started CogniCAD because we kept building the same workaround scripts at every engineering job we worked.",
      "The gap between what we wanted to express — intent, function, constraint — and what the software could accept — coordinates, features, parameters — was constant. Exhausting. Unnecessary.",
      "The technology now exists to close this gap. Large language models that can parse design intent. Geometric AI that can reason over B-rep topology. Simulation systems that can connect mesh generation to physical specification automatically.",
      "None of these technologies, alone, solves the problem. But composed into a coherent architecture — a cognitive stack — they enable something genuinely new. That is what we are building.",
    ],
  },
];

export default function ManifestoPage() {
  return (
    <main className="min-h-[100dvh] bg-[var(--color-void)] pt-28 pb-40">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">

        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-16 mb-28">
          <div>
            <p className="text-[11px] tracking-[0.25em] uppercase text-[var(--color-glow)]/60 mb-8">
              Manifesto
            </p>
          </div>
          <div>
            <h1 className="text-5xl md:text-7xl tracking-tighter leading-[0.93] text-[var(--color-accent)] font-light mb-8">
              On cognitive tools
              <br />
              for engineering.
            </h1>
            <p className="text-[var(--color-muted)] text-lg leading-relaxed max-w-[55ch]">
              This is our position on where engineering software stands,
              where it is going, and why CogniCAD is the response we believe
              this moment demands.
            </p>
          </div>
        </div>

        {/* Manifesto sections */}
        <div className="flex flex-col">
          {SECTIONS.map((section) => (
            <div
              key={section.chapter}
              className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-16 py-16 border-t border-white/[0.04]"
            >
              <div className="flex flex-col gap-3">
                <span className="font-[family-name:var(--font-geist-mono)] text-[10px] text-[var(--color-muted)]/35 tracking-widest">
                  {section.chapter}
                </span>
                <h2 className="text-xl tracking-tight text-[var(--color-accent)] font-light">
                  {section.title}
                </h2>
              </div>

              <div className="flex flex-col gap-7">
                {section.body.map((paragraph, i) => (
                  <p
                    key={i}
                    className={`leading-relaxed max-w-[65ch] ${
                      i === 0
                        ? "text-xl text-[var(--color-accent)] font-light"
                        : "text-base text-[var(--color-muted)]"
                    }`}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Closing statement */}
        <div className="border-t border-white/[0.04] pt-20 mt-8">
          <p className="text-3xl md:text-4xl tracking-tighter leading-tight text-[var(--color-accent)] font-light max-w-3xl mb-4">
            "You are witnessing the emergence of a new engineering paradigm."
          </p>
          <p className="text-sm text-[var(--color-muted)]/50 font-[family-name:var(--font-geist-mono)] tracking-widest mt-6">
            — CogniCAD
          </p>
        </div>
      </div>
    </main>
  );
}

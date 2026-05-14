"use client";

import { useState } from "react";

const OPEN_ROLES = [
  {
    title: "Frontend Engineering Intern",
    team: "Engineering",
    location: "Remote / San Francisco",
    type: "Internship",
    duration: "3–6 months",
    description:
      "Working on the CogniCAD interface layer — the surface through which engineers interact with the cognitive engine. You care deeply about how information is presented, how interactions feel, and how to make complex engineering state visible and navigable.",
    requirements: [
      "Strong command of React and TypeScript",
      "Experience with animation (Framer Motion, GSAP, or similar)",
      "Comfort with 3D or data-dense UI is a plus",
      "Portfolio of work that demonstrates taste and precision",
    ],
  },
  {
    title: "MLOps Intern",
    team: "AI Infrastructure",
    location: "Remote / San Francisco",
    type: "Internship",
    duration: "3–6 months",
    description:
      "Owning the infrastructure that trains, evaluates, and deploys the models powering CogniCAD's reasoning layer. You will work on model serving pipelines, evaluation harnesses, and the feedback loops that connect production behavior to training data.",
    requirements: [
      "Experience with model training pipelines (PyTorch, HuggingFace)",
      "Familiarity with infrastructure tooling (Docker, K8s, Ray, or similar)",
      "Understanding of evaluation methodology for generative models",
      "Prior internship or project experience in ML systems",
    ],
  },
  {
    title: "Product Design Intern",
    team: "Design",
    location: "Remote / San Francisco",
    type: "Internship",
    duration: "3–6 months",
    description:
      "Designing the language of cognitive engineering — from how design intent is entered to how reasoning state is communicated back to the engineer. You will work on interaction patterns that do not yet have precedent in existing software.",
    requirements: [
      "Strong foundation in interaction design and visual systems",
      "Experience with Figma at a high level of craft",
      "Comfort with ambiguity and designing for novel problem spaces",
      "Interest in engineering tools or technical domains is a strong plus",
    ],
  },
];

const CULTURE_POINTS = [
  {
    title: "Systems thinking",
    description:
      "We hire people who see the whole problem before reaching for local solutions.",
  },
  {
    title: "Technical curiosity",
    description:
      "The engineers here read papers they were not assigned. They build things to understand them.",
  },
  {
    title: "Research mindset",
    description:
      "Hard problems are worked from first principles, not from stackoverflow. We write things down.",
  },
  {
    title: "Ambitious builders",
    description:
      "We are making a multi-decade bet. The people here find that energizing, not daunting.",
  },
];

type FormState = "idle" | "loading" | "success" | "error";

function ApplicationForm({ role }: { role: string }) {
  const [state, setState] = useState<FormState>("idle");
  const [fields, setFields] = useState({
    name: "",
    email: "",
    portfolio: "",
    whyCognicad: "",
    favoriteProblem: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    try {
      const res = await fetch("/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, role }),
      });
      setState(res.ok ? "success" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="py-12 px-10 border border-[var(--color-glow)]/20 mt-8">
        <p className="text-[11px] tracking-[0.2em] uppercase text-[var(--color-glow)]/70 mb-3">
          Application received
        </p>
        <p className="text-xl tracking-tight text-[var(--color-accent)] font-light">
          We will reach out within 5 working days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8 mt-8">
      <input type="hidden" value={role} readOnly />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-2">
          <label className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-muted)]/70">
            Name
          </label>
          <input
            className="cad-input"
            placeholder="Fenris Okafor"
            value={fields.name}
            onChange={(e) => setFields((f) => ({ ...f, name: e.target.value }))}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-muted)]/70">
            Email
          </label>
          <input
            type="email"
            className="cad-input"
            placeholder="fenris@geometrylabs.io"
            value={fields.email}
            onChange={(e) => setFields((f) => ({ ...f, email: e.target.value }))}
            required
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-muted)]/70">
          Resume / Portfolio
        </label>
        <input
          className="cad-input"
          placeholder="Link to resume, portfolio, or GitHub"
          value={fields.portfolio}
          onChange={(e) => setFields((f) => ({ ...f, portfolio: e.target.value }))}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-muted)]/70">
          Why CogniCAD?
        </label>
        <textarea
          className="cad-input"
          placeholder="What about this problem draws you in specifically..."
          value={fields.whyCognicad}
          onChange={(e) => setFields((f) => ({ ...f, whyCognicad: e.target.value }))}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-muted)]/70">
          Favorite technical problem you have solved
        </label>
        <textarea
          className="cad-input"
          placeholder="Tell us about something technically hard you worked through..."
          value={fields.favoriteProblem}
          onChange={(e) => setFields((f) => ({ ...f, favoriteProblem: e.target.value }))}
        />
      </div>

      {state === "error" && (
        <p className="text-sm text-red-400/80">
          Submission failed. Please try again or email us at hello@cognicad.io.
        </p>
      )}

      <button
        type="submit"
        disabled={state === "loading"}
        className="px-10 py-4 bg-[var(--color-accent)] text-[var(--color-void)] text-[11px] tracking-[0.18em] uppercase font-medium self-start hover:opacity-90 active:scale-[0.98] disabled:opacity-50 transition-all duration-200 cursor-pointer"
      >
        {state === "loading" ? "Submitting..." : "Submit Application"}
      </button>
    </form>
  );
}

export default function JoinUsPage() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  return (
    <main className="relative z-10 min-h-[100dvh] pt-28 pb-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
        {/* Header */}
        <div className="mb-24">
          <p className="text-[11px] tracking-[0.25em] uppercase text-[var(--color-glow)]/60 mb-8">
            Join Us
          </p>
          <h1 className="text-5xl md:text-7xl tracking-tighter leading-[0.93] text-[var(--color-accent)] font-light mb-8 max-w-3xl">
            We are looking for obsessive builders.
          </h1>
          <p className="text-[var(--color-muted)] text-lg leading-relaxed max-w-[52ch]">
            Our internship program is designed for students and early-career
            engineers who want to work on genuinely hard problems. No busywork.
            Real ownership from day one.
          </p>
        </div>

        {/* Culture */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 mb-24 border-t border-[var(--color-border-subtle)]">
          {CULTURE_POINTS.map((point, i) => (
            <div
              key={point.title}
              className={`py-8 ${
                i % 2 === 0
                  ? "md:pr-12 md:border-r border-[var(--color-border-subtle)]"
                  : "md:pl-12"
              } border-b border-[var(--color-border-subtle)]`}
            >
              <h3 className="text-base tracking-tight text-[var(--color-accent)] font-light mb-3">
                {point.title}
              </h3>
              <p className="text-sm text-[var(--color-muted)]/70 leading-relaxed">
                {point.description}
              </p>
            </div>
          ))}
        </div>

        {/* Open roles */}
        <div className="mb-16">
          <p className="text-[11px] tracking-[0.25em] uppercase text-[var(--color-glow)]/60 mb-12">
            Open Internships
          </p>

          <div className="flex flex-col divide-y divide-[var(--color-border-subtle)]">
            {OPEN_ROLES.map((role) => (
              <div key={role.title} className="py-10">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-5">
                  <div>
                    <h3 className="text-lg tracking-tight text-[var(--color-accent)] font-light mb-2">
                      {role.title}
                    </h3>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-[10px] tracking-[0.15em] uppercase text-[var(--color-glow)]/60">
                        {role.team}
                      </span>
                      <span className="text-[var(--color-muted)]/25 text-xs">·</span>
                      <span className="text-[10px] tracking-[0.12em] uppercase text-[var(--color-muted)]/40">
                        {role.location}
                      </span>
                      <span className="text-[var(--color-muted)]/25 text-xs">·</span>
                      <span className="text-[10px] tracking-[0.12em] uppercase text-[var(--color-glow)]/50">
                        {role.type} · {role.duration}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      setSelectedRole(selectedRole === role.title ? null : role.title)
                    }
                    className="text-[11px] tracking-[0.15em] uppercase border border-[var(--color-accent)]/22 text-[var(--color-accent)]/65 px-5 py-2.5 hover:border-[var(--color-accent)]/45 hover:text-[var(--color-accent)] active:scale-[0.97] transition-all duration-200 self-start md:self-center cursor-pointer flex-shrink-0"
                  >
                    {selectedRole === role.title ? "Collapse" : "Apply"}
                  </button>
                </div>

                <p className="text-sm text-[var(--color-muted)]/70 leading-relaxed max-w-[60ch] mb-5">
                  {role.description}
                </p>

                <div className="flex flex-col gap-1.5">
                  {role.requirements.map((req) => (
                    <div key={req} className="flex items-start gap-3">
                      <div className="w-px h-3 bg-[var(--color-glow)]/30 flex-shrink-0 mt-1.5" />
                      <p className="text-sm text-[var(--color-muted)]/60">{req}</p>
                    </div>
                  ))}
                </div>

                {selectedRole === role.title && (
                  <ApplicationForm role={role.title} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* General applications */}
        <div className="border-t border-[var(--color-border-subtle)] pt-12">
          <p className="text-sm text-[var(--color-muted)] leading-relaxed max-w-[55ch]">
            Not a student? We occasionally hire exceptional full-time engineers
            directly. If you are deeply technical and want to work on a multi-decade
            problem, reach out at{" "}
            <span className="text-[var(--color-glow)]">team@cognicad.io</span>.
          </p>
        </div>
      </div>
    </main>
  );
}

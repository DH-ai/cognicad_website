"use client";

import { useState } from "react";

const OPEN_ROLES = [
  // {
  //   title: "Frontend Engineering Intern",
  //   team: "Engineering",
  //   location: "Remote / Mumbai",
  //   type: "Internship",
  //   duration: "3 months",
  //   description:
  //     "Working on the JusCAD interface layer — the surface through which engineers interact with the cognitive engine. You care deeply about how information is presented, how interactions feel, and how to make complex engineering state visible and navigable.",
  //   requirements: [
  //     "Strong command of React and TypeScript",
  //     "Experience with animation (Framer Motion, GSAP, or similar)",
  //     "Comfort with 3D or data-dense UI is a plus",
  //     "Portfolio of work that demonstrates taste and precision",
  //   ],
  // },
  // {
  //   title: "MLOps Intern",
  //   team: "AI Infrastructure",
  //   location: "Remote / Mumbai",
  //   type: "Internship",
  //   duration: "3 months",
  //   description:
  //     "Owning the infrastructure that trains, evaluates, and deploys the models powering JusCAD's reasoning layer. You will work on model serving pipelines, evaluation harnesses, and the feedback loops that connect production behavior to training data.",
  //   requirements: [
  //     "Experience with model training pipelines (PyTorch, HuggingFace)",
  //     "Familiarity with infrastructure tooling (Docker, K8s, Ray, or similar)",
  //     "Understanding of evaluation methodology for generative models",
  //     "Prior internship or project experience in ML systems",
  //   ],
  // },
  {
    title: "Product Design Intern",
    team: "Design",
    location: "Remote / Mumbai",
    type: "Internship",
    duration: "3 months",
    description:
      "Developing an independent FreeCAD AI Workbench. A working desktop application both for Windows 11, AI Workbench for FreeCad (partially opensource), backend integration, redesigned interface for better UI and UX,",
    requirements: [
      "Strong foundation in C++ and Python",
      "Understand optimization workflows, networking, and bulding binaries both c++ and python, explore freecad guide https://freecad.github.io/DevelopersHandbook/gettingstarted/",
      "Understanding of good UI and bad UI and some understanding of UX and desgining with Figma canva, need good taste, does not matter if its claude design, nano banana or figma from scratch",
      "Interest in backedn architecture domains is a strong plus",
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
  const slug = role.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(formData.get("name") ?? ""),
          email: String(formData.get("email") ?? ""),
          portfolio: String(formData.get("portfolio") ?? ""),
          whyJuscad: String(formData.get("whyJuscad") ?? ""),
          favoriteProblem: String(formData.get("favoriteProblem") ?? ""),
          role,
        }),
      });
      setState(res.ok ? "success" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="panel p-8 md:p-10 mt-8" role="status">
        <p className="status status-ok mb-4">
          <span aria-hidden="true">✓</span>
          Application received
        </p>
        <p className="type-small text-fg">
          We will reach out within 5 working days.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="panel p-6 md:p-8 mt-8 flex flex-col gap-6"
      aria-label={`Application for ${role}`}
    >
      <input type="hidden" name="role" value={role} readOnly />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="field">
          <label htmlFor={`name-${slug}`} className="field-label">
            Name
          </label>
          <input
            id={`name-${slug}`}
            name="name"
            autoComplete="name"
            className="field-input"
            placeholder="Fenris Okafor"
            required
          />
        </div>
        <div className="field">
          <label htmlFor={`email-${slug}`} className="field-label">
            Email
          </label>
          <input
            id={`email-${slug}`}
            name="email"
            type="email"
            autoComplete="email"
            className="field-input"
            placeholder="fenris@geometrylabs.io"
            required
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor={`portfolio-${slug}`} className="field-label">
          Resume / portfolio
          <span className="field-label-optional">Optional</span>
        </label>
        <input
          id={`portfolio-${slug}`}
          name="portfolio"
          type="url"
          inputMode="url"
          className="field-input"
          placeholder="Link to resume, portfolio, or GitHub"
        />
      </div>

      <div className="field">
        <label htmlFor={`why-juscad-${slug}`} className="field-label">
          Why JusCAD?
        </label>
        <textarea
          id={`why-juscad-${slug}`}
          name="whyJuscad"
          className="field-input"
          placeholder="What about this problem draws you in specifically…"
        />
      </div>

      <div className="field">
        <label htmlFor={`favorite-problem-${slug}`} className="field-label">
          Favorite technical problem you have solved
        </label>
        <textarea
          id={`favorite-problem-${slug}`}
          name="favoriteProblem"
          className="field-input"
          placeholder="Tell us about something technically hard you worked through…"
        />
      </div>

      {state === "error" && (
        <p className="status status-error" role="alert">
          <span aria-hidden="true">✕</span>
          Submission failed. Please try again or email us at hello@juscad.io.
        </p>
      )}

      <div>
        <button
          type="submit"
          disabled={state === "loading"}
          className="btn btn-primary"
        >
          {state === "loading" ? "Submitting…" : "Submit application"}
        </button>
      </div>
    </form>
  );
}

export default function JoinUsPage() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  return (
    <main className="relative z-10 min-h-[100dvh] pt-32 md:pt-40 pb-24 md:pb-32 bg-canvas">
      <div className="container-jc">
        <header className="mb-20 md:mb-28 max-w-[62rem]">
          <p className="eyebrow mb-8">
            <span>Join us</span>
          </p>
          <h1 className="type-hero text-fg mb-10 max-w-[14ch]">
            We are looking for obsessive builders.
          </h1>
          <p className="type-lead text-muted measure">
            Our internship program is designed for students and early-career
            engineers who want to work on genuinely hard problems. No busywork.
            Real ownership from day one.
          </p>
        </header>

        <section className="mb-20 md:mb-28 border-t border-line pt-12 md:pt-16">
          <p className="eyebrow mb-10">
            <span>01</span>
            <span>How we work</span>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CULTURE_POINTS.map((point, i) => (
              <article key={point.title} className="panel p-6 flex flex-col gap-3">
                <span className="type-tech text-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="type-title text-fg">{point.title}</h3>
                <p className="type-body text-muted">{point.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-16 border-t border-line pt-12 md:pt-16">
          <p className="eyebrow mb-10">
            <span>02</span>
            <span>Open internships</span>
          </p>

          <div className="flex flex-col divide-y divide-line border-y border-line">
            {OPEN_ROLES.map((role) => {
              const open = selectedRole === role.title;
              const panelId = `apply-${role.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
              return (
                <article key={role.title} className="py-10 md:py-12">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
                    <div>
                      <h3 className="type-small text-fg mb-3">{role.title}</h3>
                      <ul className="flex items-center gap-x-3 gap-y-1 flex-wrap type-tech text-muted">
                        <li>{role.team}</li>
                        <li aria-hidden="true">·</li>
                        <li>{role.location}</li>
                        <li aria-hidden="true">·</li>
                        <li>
                          {role.type} · {role.duration}
                        </li>
                      </ul>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedRole(open ? null : role.title)}
                      aria-expanded={open}
                      aria-controls={panelId}
                      className={`btn ${open ? "btn-secondary" : "btn-primary"} shrink-0 self-start`}
                    >
                      {open ? "Collapse" : "Apply"}
                    </button>
                  </div>

                  <p className="type-body text-muted measure mb-6">
                    {role.description}
                  </p>

                  <ul className="flex flex-col gap-2 measure">
                    {role.requirements.map((req) => (
                      <li key={req} className="flex items-start gap-3">
                        <span
                          aria-hidden="true"
                          className="mt-[0.7em] w-3 h-px bg-blue shrink-0"
                        />
                        <p className="type-body text-muted break-words">{req}</p>
                      </li>
                    ))}
                  </ul>

                  <div id={panelId}>
                    {open && <ApplicationForm role={role.title} />}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="pt-4">
          <p className="type-body text-muted measure">
            Not a student? We occasionally hire exceptional full-time engineers
            directly on contracts basis. If you are deeply technical and want to
            work on a multi-decade problem, reach out at{" "}
            <a
              href="mailto:dhruvchaturvedi@juscad.com"
              className="text-fg underline underline-offset-4 decoration-line hover:decoration-fg transition-colors duration-[180ms]"
            >
              dhruvchaturvedi@juscad.com
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}

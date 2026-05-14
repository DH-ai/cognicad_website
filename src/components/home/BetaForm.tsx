"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

type FormState = "idle" | "loading" | "success" | "error";

const ROLE_OPTIONS = [
  "Mechanical Engineer",
  "Aerospace Engineer",
  "Structural Engineer",
  "CAD Designer",
  "Systems Engineer",
  "Research Scientist",
  "Engineering Manager",
  "CTO / Technical Lead",
  "Student / Academic",
  "Other",
];

export default function BetaForm() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.1, once: true });
  const [formState, setFormState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [fields, setFields] = useState({
    name: "",
    email: "",
    role: "",
    organization: "",
    whatYouBuild: "",
    frustration: "",
  });

  function validate() {
    const errs: Record<string, string> = {};
    if (!fields.name.trim()) errs.name = "Name is required.";
    if (!fields.email.trim() || !fields.email.includes("@"))
      errs.email = "Valid email is required.";
    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setFormState("loading");

    try {
      const res = await fetch("/api/beta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      if (!res.ok) throw new Error("Failed");
      setFormState("success");
    } catch {
      setFormState("error");
    }
  }

  function Field({
    id,
    label,
    helper,
    children,
  }: {
    id: string;
    label: string;
    helper?: string;
    children: React.ReactNode;
  }) {
    return (
      <div className="flex flex-col gap-2">
        <label
          htmlFor={id}
          className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-muted)]/70"
        >
          {label}
        </label>
        {children}
        {helper && !errors[id] && (
          <span className="text-[11px] text-[var(--color-muted)]/40">{helper}</span>
        )}
        {errors[id] && (
          <span className="text-[11px] text-red-400/80">{errors[id]}</span>
        )}
      </div>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] flex items-center bg-transparent overflow-hidden"
      id="beta"
    >
      {/* Subtle grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]" aria-hidden="true">
        <svg className="w-full h-full">
          <defs>
            <pattern id="beta-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="var(--color-accent)" strokeWidth="0.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#beta-grid)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto w-full px-6 md:px-16 lg:px-24 py-28">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-20 items-start">
          {/* Left — copy */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="text-[11px] tracking-[0.25em] uppercase text-[var(--color-glow)]/60 mb-8"
            >
              Beta Program
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-5xl tracking-tighter leading-[0.95] text-[var(--color-accent)] font-light mb-8"
            >
              Compress design cycles
              from weeks to hours.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="text-[var(--color-muted)] leading-relaxed max-w-[38ch] text-base"
            >
              We integrate into the CAD, simulation, and analysis tools you
              already use. Early access is limited and curated — for engineers
              who think deeply about the cost of every iteration.
            </motion.p>
          </div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            {formState === "success" ? (
              <div className="py-16 border border-[var(--color-glow)]/20 px-10">
                <p className="text-[11px] tracking-[0.2em] uppercase text-[var(--color-glow)]/70 mb-4">
                  Application received
                </p>
                <p className="text-2xl tracking-tight text-[var(--color-accent)] font-light mb-4">
                  We will be in touch.
                </p>
                <p className="text-sm text-[var(--color-muted)] leading-relaxed max-w-[40ch]">
                  Your application is under review. We are building a small,
                  focused cohort of engineers for the first release.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Field id="name" label="Name" >
                    <input
                      id="name"
                      className="cad-input"
                      placeholder="Elara Vasquez"
                      value={fields.name}
                      onChange={(e) =>
                        setFields((f) => ({ ...f, name: e.target.value }))
                      }
                    />
                  </Field>
                  <Field id="email" label="Email">
                    <input
                      id="email"
                      type="email"
                      className="cad-input"
                      placeholder="elara@structures.io"
                      value={fields.email}
                      onChange={(e) =>
                        setFields((f) => ({ ...f, email: e.target.value }))
                      }
                    />
                  </Field>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Field id="role" label="Role">
                    <select
                      id="role"
                      className="cad-input"
                      value={fields.role}
                      onChange={(e) =>
                        setFields((f) => ({ ...f, role: e.target.value }))
                      }
                    >
                      <option value="" disabled>
                        Select role
                      </option>
                      {ROLE_OPTIONS.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field id="organization" label="Organization" helper="Company, lab, or institution">
                    <input
                      id="organization"
                      className="cad-input"
                      placeholder="Orbital Systems Ltd."
                      value={fields.organization}
                      onChange={(e) =>
                        setFields((f) => ({ ...f, organization: e.target.value }))
                      }
                    />
                  </Field>
                </div>

                <Field id="whatYouBuild" label="What do you build?">
                  <textarea
                    id="whatYouBuild"
                    className="cad-input"
                    placeholder="Aerospace structures, turbomachinery, satellite components..."
                    value={fields.whatYouBuild}
                    onChange={(e) =>
                      setFields((f) => ({ ...f, whatYouBuild: e.target.value }))
                    }
                  />
                </Field>

                <Field id="frustration" label="Biggest workflow frustration?">
                  <textarea
                    id="frustration"
                    className="cad-input"
                    placeholder="The gap between simulation intent and what the geometry actually does..."
                    value={fields.frustration}
                    onChange={(e) =>
                      setFields((f) => ({ ...f, frustration: e.target.value }))
                    }
                  />
                </Field>

                {formState === "error" && (
                  <p className="text-sm text-red-400/80">
                    Submission failed. Please try again or reach out directly.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={formState === "loading"}
                  className="mt-2 px-10 py-4 bg-[var(--color-accent)] text-[var(--color-void)] text-[11px] tracking-[0.18em] uppercase font-medium self-start hover:opacity-90 active:scale-[0.98] disabled:opacity-50 transition-all duration-200 cursor-pointer"
                >
                  {formState === "loading" ? "Submitting..." : "Request Access"}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

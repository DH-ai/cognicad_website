"use client";

import { useState } from "react";
import { MapPin, Phone, EnvelopeSimple, ArrowUpRight } from "@phosphor-icons/react";

const CONTACT_INFO = [
  {
    icon: MapPin,
    label: "Address",
    lines: ["742 Market Street, Suite 1200", "San Francisco, CA 94102", "United States"],
  },
  {
    icon: Phone,
    label: "Phone",
    lines: ["+1 (415) 847-2391"],
  },
  {
    icon: EnvelopeSimple,
    label: "Email",
    lines: ["hello@cognicad.io", "research@cognicad.io"],
  },
];

const CONTACT_TYPES = [
  { label: "General Inquiry", value: "general" },
  { label: "Beta Program", value: "beta" },
  { label: "Research Collaboration", value: "research" },
  { label: "Press & Media", value: "press" },
  { label: "Investor Relations", value: "investor" },
  { label: "Partnership", value: "partnership" },
];

type State = "idle" | "loading" | "success" | "error";

export default function ContactPage() {
  const [state, setState] = useState<State>("idle");
  const [fields, setFields] = useState({
    name: "",
    email: "",
    type: "",
    message: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!fields.email || !fields.name || !fields.message) return;
    setState("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      setState(res.ok ? "success" : "error");
    } catch {
      setState("error");
    }
  }

  return (
    <main className="relative z-10 min-h-[100dvh] pt-28 pb-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">

        {/* Header */}
        <div className="mb-20">
          <p className="text-[11px] tracking-[0.25em] uppercase text-[var(--color-glow)]/60 mb-6">
            Contact
          </p>
          <h1 className="text-5xl md:text-7xl tracking-tighter leading-[0.93] text-[var(--color-accent)] font-light mb-8 max-w-3xl">
            Get in touch.
          </h1>
          <p className="text-[var(--color-muted)] text-lg leading-relaxed max-w-[48ch]">
            Whether you are an engineer interested in the beta, a researcher
            looking to collaborate, or a journalist — we respond to every note.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-20 items-start">
          {/* Left — contact info */}
          <div className="flex flex-col gap-12">
            {CONTACT_INFO.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex gap-5 items-start">
                  <div className="w-9 h-9 border border-[var(--color-border-subtle)] flex items-center justify-center flex-shrink-0">
                    <Icon size={14} weight="light" style={{ color: "var(--color-glow)" }} />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-muted)]/50 mb-2">
                      {item.label}
                    </p>
                    {item.lines.map((line) => (
                      <p key={line} className="text-sm text-[var(--color-muted)] leading-relaxed">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Map placeholder */}
            <div className="relative overflow-hidden border border-[var(--color-border-subtle)] aspect-[4/3] max-w-[320px]">
              {/* Simplified map SVG placeholder */}
              <div className="w-full h-full bg-[var(--color-graphite)] flex items-center justify-center">
                <div className="text-center">
                  <MapPin size={24} weight="light" style={{ color: "var(--color-glow)", opacity: 0.6, margin: "0 auto 8px" }} />
                  <p className="text-[10px] tracking-[0.15em] uppercase text-[var(--color-muted)]/40">
                    San Francisco, CA
                  </p>
                  <p className="text-[9px] text-[var(--color-muted)]/25 mt-1">
                    Market Street District
                  </p>
                </div>
              </div>
            </div>

            {/* Office hours */}
            <div className="border-t border-[var(--color-border-subtle)] pt-8">
              <p className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-muted)]/50 mb-3">
                Office Hours
              </p>
              <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                Monday — Friday, 9:00 AM – 6:00 PM PST
              </p>
              <p className="text-xs text-[var(--color-muted)]/40 mt-1">
                We typically respond within 24 hours.
              </p>
            </div>
          </div>

          {/* Right — form */}
          <div>
            {state === "success" ? (
              <div className="glass p-10">
                <p className="text-[11px] tracking-[0.2em] uppercase text-[var(--color-glow)]/70 mb-4">
                  Message sent
                </p>
                <p className="text-2xl tracking-tight text-[var(--color-accent)] font-light mb-4">
                  We received your message.
                </p>
                <p className="text-sm text-[var(--color-muted)] leading-relaxed max-w-[40ch]">
                  Someone from the team will follow up at the email you provided,
                  usually within one business day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-muted)]/70">
                      Name
                    </label>
                    <input
                      className="cad-input"
                      placeholder="Kaspar Delacroix"
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
                      placeholder="kaspar@propulsion.io"
                      value={fields.email}
                      onChange={(e) => setFields((f) => ({ ...f, email: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-muted)]/70">
                    Nature of inquiry
                  </label>
                  <select
                    className="cad-input"
                    value={fields.type}
                    onChange={(e) => setFields((f) => ({ ...f, type: e.target.value }))}
                  >
                    <option value="" disabled>Select type</option>
                    {CONTACT_TYPES.map((t) => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-muted)]/70">
                    Message
                  </label>
                  <textarea
                    className="cad-input"
                    rows={5}
                    placeholder="Describe what you are working on and how we might be relevant..."
                    value={fields.message}
                    onChange={(e) => setFields((f) => ({ ...f, message: e.target.value }))}
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
                  className="px-10 py-4 bg-[var(--color-accent)] text-[var(--color-void)] text-[11px] tracking-[0.18em] uppercase font-medium self-start hover:opacity-90 active:scale-[0.98] disabled:opacity-50 transition-all duration-200 cursor-pointer flex items-center gap-2"
                >
                  {state === "loading" ? "Sending..." : "Send Message"}
                  {state !== "loading" && <ArrowUpRight size={12} weight="bold" />}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

"use client";

import { useState } from "react";
import styles from "./page.module.css";
// import { MapPin, Phone, EnvelopeSimple, ArrowUpRight } from "@phosphor-icons/react";1
import {
  PhoneIcon,
  MapPinIcon,
  EnvelopeSimpleIcon,
  ArrowUUpRightIcon,
  DiscordLogoIcon,
  InstagramLogoIcon,
} from "@phosphor-icons/react";

const CONTACT_INFO = [
  {
    icon: MapPinIcon,
    label: "Address",
    lines: ["Desai Sethi School of Entrepreneurship", "Indian Institute of Technology Bombay", "Powai", "Mumbai, Maharashtra 400076", "India"],
  },
  {
    icon: PhoneIcon,
    label: "Phone",
    lines: ["+91 9171981824"],
  },
  {
    icon: EnvelopeSimpleIcon,
    label: "Email",
    lines: ["enquire@cognicad.xyz", "dhruvchaturvedi@cognicad.xyz"],
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

const SOCIAL_LINKS = [
  {
    icon: DiscordLogoIcon,
    label: "Discord",
    href: "https://discord.gg/Mt3JxYDpf",
    hoverColor: "#5865F2",
  },
  {
    icon: InstagramLogoIcon,
    label: "Instagram",
    href: "https://instagram.com/cognicad",
    hoverColor: "#E1306C",
  },
]

type State = "idle" | "loading" | "success" | "error";

export default function ContactPage() {
  const [state, setState] = useState<State>("idle");
  const [fields, setFields] = useState({
    name: "",
    email: "",
    type: "",
    message: "",
  });

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
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
            {/* <div claNa·  */}

              <div className="border-t border-[var(--color-border-subtle)] pt-8">
                <p className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-muted)]/50 mb-4">
                  Join us
                </p>
                <div className="flex flex-col gap-3">
                  {SOCIAL_LINKS.map((item) => {
                    const Icon = item.icon;
                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className={`group glass ${styles.socialCard} flex items-center gap-4 px-4 py-3 border border-[var(--color-border-subtle)]/60 transition-all duration-300 hover:scale-[1.01] hover:border-transparent hover:shadow-[0_18px_60px_-38px_var(--hover-color)] active:scale-[0.99]`}
                        style={{
                          ["--hover-color" as string]: item.hoverColor,
                        }}
                      >
                        <div className="w-10 h-10 rounded-full border border-[var(--color-border-subtle)]/70 bg-[var(--color-void)]/20 backdrop-blur-sm flex items-center justify-center text-[var(--color-muted)]/75 transition-all duration-300 group-hover:border-transparent group-hover:bg-[var(--hover-color)]/15 group-hover:text-[var(--hover-color)] group-hover:shadow-[0_14px_38px_-26px_var(--hover-color)] group-hover:scale-[1.02]">
                          <Icon size={18} weight="light" className="transition-colors duration-300" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-[var(--color-accent)] transition-colors duration-300 group-hover:text-[var(--hover-color)]">{item.label}</p>
                          <p className="text-xs text-[var(--color-muted)]/55 transition-colors duration-300 group-hover:text-[var(--hover-color)]/75">
                            {item.href.replace(/^https?:\/\//, "")}
                          </p>
                        </div>
                        <ArrowUUpRightIcon
                          size={12}
                          weight="bold"
                          style={{ color: "var(--color-glow)" }}
                          className="transition-[color,transform] duration-300 group-hover:!text-[var(--hover-color)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </a>
                    );
                  })}
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
                    Submission failed. Please try again or email us at enquiry@cognicad.xyz.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={state === "loading"}
                  className="px-10 py-4 bg-[var(--color-accent)] text-[var(--color-void)] text-[11px] tracking-[0.18em] uppercase font-medium self-start hover:opacity-90 active:scale-[0.98] disabled:opacity-50 transition-all duration-200 cursor-pointer flex items-center gap-2"
                >
                  {state === "loading" ? "Sending..." : "Send Message"}
                  {state !== "loading" && <ArrowUUpRightIcon size={12} weight="bold" />}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

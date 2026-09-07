"use client";

import { useState } from "react";
import {
  PhoneIcon,
  MapPinIcon,
  EnvelopeSimpleIcon,
  ArrowUpRightIcon,
  DiscordLogoIcon,
  InstagramLogoIcon,
  XLogoIcon,
} from "@phosphor-icons/react";

const CONTACT_INFO = [
  {
    icon: MapPinIcon,
    label: "Address",
    lines: [
      "Desai Sethi School of Entrepreneurship",
      "Indian Institute of Technology Bombay",
      "Powai",
      "Mumbai, Maharashtra 400076",
      "India",
    ],
  },
  {
    icon: PhoneIcon,
    label: "Phone",
    lines: ["+91 9171981824"],
  },
  {
    icon: EnvelopeSimpleIcon,
    label: "Email",
    lines: ["enquire@juscad.com", "dhruvchaturvedi@juscad.com"],
  },
];

const CONTACT_TYPES = [
  { label: "General inquiry", value: "general" },
  { label: "Beta program", value: "beta" },
  { label: "Research collaboration", value: "research" },
  { label: "Press & media", value: "press" },
  { label: "Investor relations", value: "investor" },
  { label: "Partnership", value: "partnership" },
];

const SOCIAL_LINKS = [
  {
    icon: DiscordLogoIcon,
    label: "Discord",
    href: "https://discord.gg/Mt3JxYDpf",
  },
  {
    icon: InstagramLogoIcon,
    label: "Instagram",
    href: "https://instagram.com/juscad",
  },
  {
    icon: XLogoIcon,
    label: "X (Twitter)",
    href: "https://twitter.com/juscad",
  },
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
    <main className="relative z-10 min-h-[100dvh] pt-32 md:pt-40 pb-24 md:pb-32 bg-canvas">
      <div className="container-jc">
        <header className="mb-20 md:mb-28 max-w-[62rem]">
          <p className="eyebrow mb-8">
            <span>Contact</span>
          </p>
          <h1 className="type-hero text-fg mb-10">Get in touch.</h1>
          <p className="type-lead text-muted measure">
            Whether you are an engineer interested in the beta, a researcher
            looking to collaborate, or a journalist — we respond to every note.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-16 lg:gap-24 items-start border-t border-line pt-12 md:pt-16">
          <div className="flex flex-col gap-10">
            <dl className="flex flex-col gap-8">
              {CONTACT_INFO.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex gap-5 items-start">
                    <div
                      className="w-11 h-11 panel flex items-center justify-center shrink-0 text-blue"
                      aria-hidden="true"
                    >
                      <Icon size={22} weight="light" />
                    </div>
                    <div>
                      <dt className="type-tech text-muted mb-2">{item.label}</dt>
                      <dd className="flex flex-col">
                        {item.lines.map((line) => {
                          const isEmail = line.includes("@");
                          return isEmail ? (
                            <a
                              key={line}
                              href={`mailto:${line}`}
                              className="type-body text-fg underline underline-offset-4 decoration-line hover:decoration-fg transition-colors duration-[180ms] self-start"
                            >
                              {line}
                            </a>
                          ) : (
                            <span key={line} className="type-body text-fg/85">
                              {line}
                            </span>
                          );
                        })}
                      </dd>
                    </div>
                  </div>
                );
              })}
            </dl>

            <div className="border-t border-line pt-8">
              <p className="type-tech text-muted mb-4">Join us</p>
              <ul className="flex flex-col gap-3">
                {SOCIAL_LINKS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className="group panel flex items-center gap-4 px-4 py-3 hover:border-line-strong transition-colors duration-[180ms]"
                      >
                        <span
                          className="w-10 h-10 rounded-[4px] bg-canvas border border-line flex items-center justify-center text-muted group-hover:text-fg transition-colors duration-[180ms]"
                          aria-hidden="true"
                        >
                          <Icon size={20} weight="light" />
                        </span>
                        <span className="flex-1 min-w-0">
                          <span className="block text-base font-[550] text-fg">
                            {item.label}
                          </span>
                          <span className="block type-tech-sm text-muted truncate">
                            {item.href.replace(/^https?:\/\//, "")}
                          </span>
                        </span>
                        <ArrowUpRightIcon
                          size={18}
                          weight="regular"
                          aria-hidden="true"
                          className="text-muted group-hover:text-fg transition-colors duration-[180ms]"
                        />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div>
            {state === "success" ? (
              <div className="panel p-8 md:p-12" role="status">
                <p className="status status-ok mb-6">
                  <span aria-hidden="true">✓</span>
                  Message sent
                </p>
                <p className="type-small text-fg mb-4">
                  We received your message.
                </p>
                <p className="type-body text-muted measure-narrow">
                  Someone from the team will follow up at the email you
                  provided, usually within one business day.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="panel p-6 md:p-10 flex flex-col gap-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="field">
                    <label htmlFor="contact-name" className="field-label">
                      Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      autoComplete="name"
                      className="field-input"
                      placeholder="Kaspar Delacroix"
                      value={fields.name}
                      onChange={(e) =>
                        setFields((f) => ({ ...f, name: e.target.value }))
                      }
                      required
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="contact-email" className="field-label">
                      Email
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="field-input"
                      placeholder="kaspar@propulsion.io"
                      value={fields.email}
                      onChange={(e) =>
                        setFields((f) => ({ ...f, email: e.target.value }))
                      }
                      required
                    />
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="contact-type" className="field-label">
                    Nature of inquiry
                    <span className="field-label-optional">Optional</span>
                  </label>
                  <select
                    id="contact-type"
                    name="type"
                    className="field-input"
                    value={fields.type}
                    onChange={(e) =>
                      setFields((f) => ({ ...f, type: e.target.value }))
                    }
                  >
                    <option value="" disabled>
                      Select type
                    </option>
                    {CONTACT_TYPES.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="field">
                  <label htmlFor="contact-message" className="field-label">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    className="field-input"
                    rows={6}
                    placeholder="Describe what you are working on and how we might be relevant…"
                    value={fields.message}
                    onChange={(e) =>
                      setFields((f) => ({ ...f, message: e.target.value }))
                    }
                    required
                  />
                </div>

                {state === "error" && (
                  <p className="status status-error" role="alert">
                    <span aria-hidden="true">✕</span>
                    Submission failed. Please try again or email us at
                    enquiry@juscad.com.
                  </p>
                )}

                <div>
                  <button
                    type="submit"
                    disabled={state === "loading"}
                    className="btn btn-primary"
                  >
                    {state === "loading" ? "Sending…" : "Send message"}
                    {state !== "loading" && (
                      <ArrowUpRightIcon size={16} weight="regular" aria-hidden="true" />
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

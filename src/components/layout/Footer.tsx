import Link from "next/link";

const FOOTER_LINKS = {
  Product: [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: "Beta Program", href: "/beta" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Join Us", href: "/join-us" },
    { label: "Contact", href: "/contact" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative z-10 bg-[var(--color-void)] border-t border-[var(--color-border-subtle)] py-20 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-12 mb-20">
          {/* Brand */}
          <div className="flex flex-col gap-6">
            <span className="font-display text-3xl md:text-4xl text-[var(--color-accent)] leading-none">
              Cogni<span className="text-[var(--color-glow)]">C</span>AD
            </span>
            <p className="text-sm text-[var(--color-muted)] leading-relaxed max-w-[38ch]">
              Building cognitive tools for engineering.
              <br />
              The next paradigm of how engineers think with software.
            </p>
          </div>

          {/* Link groups */}
          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div key={group} className="flex flex-col gap-4">
              <span className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-muted)]/60">
                {group}
              </span>
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div className="border-t border-[var(--color-border-subtle)] pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <span className="text-[11px] text-[var(--color-muted)]/40 tracking-widest uppercase">
            &copy; {new Date().getFullYear()} CogniCAD. All rights reserved.
          </span>
          <span className="text-[11px] text-[var(--color-muted)]/30 tracking-widest uppercase">
            Cognitive Engineering Systems
          </span>
        </div>
      </div>
    </footer>
  );
}

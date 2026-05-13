import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "Blog — CogniCAD",
  description: "Engineering perspectives, research notes, and product thinking from the CogniCAD team.",
};

const FEATURED_POST = {
  category: "Essay",
  title: "The Cognitive Gap in Engineering Software",
  description:
    "For forty years, engineering software has been built on a single, unquestioned assumption: the human specifies, the machine executes. We think that assumption is wrong — and that getting it right will change how physical products are built.",
  date: "2024-11-20",
  readTime: "14 min",
  author: "Arjun Mehta",
  image: "https://picsum.photos/seed/cognicad-featured/1200/600",
  slug: "cognitive-gap-in-engineering-software",
};

const BLOG_POSTS = [
  {
    category: "Research",
    title: "What We Learned Training on CAD History Trees",
    description:
      "Transformers can learn the grammar of parametric modeling. Here is what our first round of experiments showed — and what surprised us.",
    date: "2024-11-14",
    readTime: "11 min",
    author: "Leila Nakamura",
    image: "https://picsum.photos/seed/cad-trees/800/450",
    slug: "training-on-cad-history-trees",
  },
  {
    category: "Engineering",
    title: "Why BREP is Still the Right Representation",
    description:
      "Implicit surfaces, point clouds, and neural fields are fascinating. But for manufacturing-intent geometry, boundary representation remains the only sensible choice. Here is why.",
    date: "2024-11-06",
    readTime: "9 min",
    author: "Leila Nakamura",
    image: "https://picsum.photos/seed/brep-geo/800/450",
    slug: "why-brep-is-still-right",
  },
  {
    category: "Product",
    title: "What the Beta Cohort Taught Us",
    description:
      "Our first 12 beta users spent 3 weeks breaking CogniCAD in every direction imaginable. These are the three things we learned that we did not expect.",
    date: "2024-10-28",
    readTime: "8 min",
    author: "Arjun Mehta",
    image: "https://picsum.photos/seed/beta-users/800/450",
    slug: "what-beta-cohort-taught-us",
  },
  {
    category: "Research",
    title: "Constraint Satisfaction at the Speed of Language",
    description:
      "The hardest problem in cognitive CAD is not generating geometry — it is maintaining constraint consistency when the input channel is natural language. We propose a new formulation.",
    date: "2024-10-15",
    readTime: "18 min",
    author: "Leila Nakamura",
    image: "https://picsum.photos/seed/constraint-sat/800/450",
    slug: "constraint-satisfaction-language",
  },
  {
    category: "Engineering",
    title: "Building the Intent-to-Geometry Pipeline",
    description:
      "Step by step: how an engineering intent expressed in plain language becomes a constrained, manufacturable solid. The architecture and the hard parts.",
    date: "2024-10-02",
    readTime: "15 min",
    author: "Arjun Mehta",
    image: "https://picsum.photos/seed/intent-geometry/800/450",
    slug: "intent-to-geometry-pipeline",
  },
];

const CATEGORIES = ["All", "Research", "Engineering", "Product", "Essay"];

export default function BlogPage() {
  return (
    <main className="min-h-[100dvh] bg-[var(--color-void)] pt-28 pb-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">

        {/* Header */}
        <div className="mb-16">
          <p className="text-[11px] tracking-[0.25em] uppercase text-[var(--color-glow)]/60 mb-6">
            Blog
          </p>
          <h1 className="text-5xl md:text-6xl tracking-tighter leading-[0.93] text-[var(--color-accent)] font-light mb-6">
            Engineering perspectives.
          </h1>
          <p className="text-[var(--color-muted)] max-w-[52ch] leading-relaxed">
            Research notes, product thinking, and essays from the CogniCAD team.
            Written for engineers who think carefully about their tools.
          </p>
        </div>

        {/* Category filters */}
        <div className="flex gap-6 mb-16 border-b border-[var(--color-border-subtle)] pb-5 overflow-x-auto">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`text-[11px] tracking-[0.15em] uppercase whitespace-nowrap transition-colors duration-200 ${
                cat === "All"
                  ? "text-[var(--color-accent)] border-b border-[var(--color-accent)]/40 pb-px"
                  : "text-[var(--color-muted)]/55 hover:text-[var(--color-muted)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured post */}
        <Link href={`/blog/${FEATURED_POST.slug}`} className="group block mb-16">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-8 md:gap-12 items-start border border-[var(--color-border-subtle)] hover:border-[var(--color-border-light)] transition-colors duration-300 overflow-hidden">
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image
                src={FEATURED_POST.image}
                alt={FEATURED_POST.title}
                fill
                className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-[var(--color-void)]/20 group-hover:bg-transparent transition-colors duration-300" />
            </div>
            <div className="p-8 md:p-10 flex flex-col justify-center gap-5">
              <div className="flex items-center gap-3">
                <span className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-glow)]/70">
                  {FEATURED_POST.category}
                </span>
                <span className="text-[10px] tracking-[0.1em] text-[var(--color-muted)]/35 bg-[var(--color-graphite)] px-2 py-0.5">
                  Featured
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl tracking-tight text-[var(--color-accent)] font-light leading-snug group-hover:text-white transition-colors duration-200">
                {FEATURED_POST.title}
              </h2>
              <p className="text-sm text-[var(--color-muted)]/70 leading-relaxed max-w-[48ch]">
                {FEATURED_POST.description}
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] text-[var(--color-muted)]/60">{FEATURED_POST.author}</p>
                  <p className="text-[10px] font-[family-name:var(--font-geist-mono)] text-[var(--color-muted)]/35 mt-0.5">
                    {FEATURED_POST.date} · {FEATURED_POST.readTime}
                  </p>
                </div>
                <ArrowUpRight
                  size={16}
                  weight="light"
                  className="text-[var(--color-muted)]/30 group-hover:text-[var(--color-muted)]/80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
                />
              </div>
            </div>
          </div>
        </Link>

        {/* Post grid — asymmetric 2-col zig-zag */}
        <div className="flex flex-col divide-y divide-[var(--color-border-subtle)]">
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group py-8 grid grid-cols-1 md:grid-cols-[200px_1fr_auto] gap-6 md:gap-10 items-start"
            >
              {/* Thumbnail */}
              <div className="relative aspect-[4/3] overflow-hidden border border-[var(--color-border-subtle)] max-w-[200px]">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
                  sizes="200px"
                />
              </div>

              {/* Content */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[10px] tracking-[0.18em] uppercase text-[var(--color-glow)]/60">
                    {post.category}
                  </span>
                  <span className="text-[var(--color-muted)]/25">·</span>
                  <span className="text-[10px] font-[family-name:var(--font-geist-mono)] text-[var(--color-muted)]/35">
                    {post.date}
                  </span>
                </div>
                <h2 className="text-lg tracking-tight text-[var(--color-accent)] font-light mb-3 group-hover:text-white transition-colors duration-200">
                  {post.title}
                </h2>
                <p className="text-sm text-[var(--color-muted)]/65 leading-relaxed max-w-[55ch]">
                  {post.description}
                </p>
              </div>

              {/* Meta */}
              <div className="flex flex-col items-end gap-2 md:pt-1 min-w-[80px]">
                <span className="text-[10px] text-[var(--color-muted)]/35">
                  {post.readTime}
                </span>
                <ArrowUpRight
                  size={14}
                  weight="light"
                  className="text-[var(--color-muted)]/25 group-hover:text-[var(--color-muted)]/70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

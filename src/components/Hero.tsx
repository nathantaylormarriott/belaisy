import { useEffect, useRef, useState } from "react";
import heroAsset from "@/assets/hero-shopfront.webp.asset.json";
import { business } from "@/lib/business";

export function Hero() {
  const [offset, setOffset] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setOffset(window.scrollY));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const fade = Math.max(0, 1 - offset / 620);

  return (
    <section id="top" ref={ref} className="relative h-[100svh] min-h-[620px] overflow-hidden">
      <div
        className="absolute inset-x-0 -top-[12%] h-[124%] will-change-transform"
        style={{ transform: `translate3d(0, ${offset * 0.28}px, 0) scale(1.04)` }}
      >
        <img
          src={heroAsset.url}
          alt="The Cosy Chapter shopfront on Long Street, Atherstone — teal joinery, gold signwriting and hanging flower baskets"
          className="h-full w-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0" style={{ background: "var(--gradient-veil)" }} />
      </div>

      <div className="container-tight relative flex h-full flex-col justify-end pb-20 sm:pb-24">
        <div style={{ opacity: fade, transform: `translate3d(0, ${offset * -0.06}px, 0)` }}>
          <p className="eyebrow">Boutique book bar · {business.town}, Warwickshire</p>
          <h1 className="mt-5 max-w-4xl text-5xl leading-[0.95] text-primary-foreground sm:text-7xl lg:text-[5.75rem]">
            Books by day,
            <span className="block italic text-brass">wine by candlelight.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-primary-foreground/80">
            A cosy corner of Long Street where good coffee, curated sharing boards and a
            proper glass of wine live between the bookshelves. Chapters are best shared.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#visit"
              className="inline-flex items-center gap-3 bg-brass px-7 py-3.5 text-[0.7rem] uppercase tracking-[0.24em] text-primary transition-colors duration-500 hover:bg-primary-foreground"
            >
              Plan your visit
            </a>
            <a
              href={business.phoneHref}
              className="text-[0.7rem] uppercase tracking-[0.24em] text-primary-foreground/85 underline decoration-brass/60 underline-offset-8 transition-colors hover:text-brass"
            >
              {business.phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-7 left-1/2 h-12 w-px -translate-x-1/2 bg-linear-to-b from-transparent to-brass"
        style={{ opacity: fade }}
        aria-hidden="true"
      />
    </section>
  );
}

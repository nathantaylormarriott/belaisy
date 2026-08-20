import { Fragment, useEffect, useRef, useState } from "react";
import { SiteLogo } from "@/components/SiteLogo";
import heroShopfront from "@/assets/hero-shopfront.webp";
import mobileHero from "@/assets/mobile-hero.webp";
import { business } from "@/lib/business";

const MARQUEE_WORDS = [
  "Books",
  "Coffee",
  "Wine",
  "Sharing boards",
  "Book club",
  "Tasting nights",
  "Cosy corners",
] as const;

function MarqueeWords() {
  return (
    <div className="flex items-center gap-12 whitespace-nowrap">
      {MARQUEE_WORDS.map((word, index) => (
        <Fragment key={word}>
          {index > 0 && (
            <span
              className="shrink-0 text-[0.7rem] leading-none tracking-[0.34em] text-brass"
              aria-hidden="true"
            >
              ·
            </span>
          )}
          <span className="shrink-0 text-[0.7rem] uppercase leading-none tracking-[0.34em] text-primary-foreground/70">
            {word}
          </span>
        </Fragment>
      ))}
    </div>
  );
}

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
    <section
      id="top"
      ref={ref}
      className="relative grid h-[100svh] min-h-[620px] grid-rows-[1fr_auto] overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-x-0 -top-[12%] h-[124%] will-change-transform"
          style={{ transform: `translate3d(0, ${offset * 0.28}px, 0) scale(1.04)` }}
        >
          <picture>
            <source media="(min-width: 768px)" srcSet={heroShopfront} />
            <img
              src={mobileHero}
              alt="The Cosy Chapter — book bar, coffee and wine on Long Street, Atherstone"
              className="h-full w-full object-cover object-center"
              fetchPriority="high"
            />
          </picture>
          <div className="absolute inset-0" style={{ background: "var(--gradient-veil)" }} />
          <div className="absolute inset-0 bg-primary/20" />
          <div className="absolute inset-0" style={{ background: "var(--hero-vignette)" }} />
        </div>
      </div>

      <div className="relative z-10 flex translate-y-10 items-center justify-center px-6 text-center sm:translate-y-11">
        <div
          className="hero-copy-shadow w-full max-w-3xl"
          style={{ opacity: fade, transform: `translate3d(0, ${offset * -0.06}px, 0)` }}
        >
          <h1 className="hero-logo-shadow flex justify-center">
            <SiteLogo className="h-24 w-auto sm:h-32 lg:h-40" />
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base font-medium leading-relaxed text-white">
            {business.heroTagline}
          </p>
        </div>
      </div>

      <div
        className="relative z-10 overflow-hidden bg-primary py-4"
        aria-label="Highlights"
      >
        <div className="marquee-track flex w-max items-center gap-12">
          {Array.from({ length: 2 }).map((_, i) => (
            <MarqueeWords key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

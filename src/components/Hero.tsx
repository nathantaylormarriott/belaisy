import { useEffect, useRef, useState } from "react";
import { HeroTagline } from "@/components/HeroTagline";
import { heroShopfront } from "@/assets";
import { subscribeLenisScroll } from "@/lib/lenis-scroll";
import { cn } from "@/lib/utils";

const MARQUEE_WORDS = [
  "Cuts and Colour",
  "Balayage",
  "Blow Drys",
  "Nails and Beauty",
  "Treatments",
  "Bridal Hair",
  "The Lounge",
] as const;

const HERO_MARQUEE_COLOR = "text-primary/90";

function HeroMarqueeTrack() {
  const loop = [...MARQUEE_WORDS, ...MARQUEE_WORDS];

  return (
    <>
      {loop.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className={cn(
            "shrink-0 font-display text-xl leading-none sm:text-2xl",
            HERO_MARQUEE_COLOR,
          )}
        >
          {word}
        </span>
      ))}
    </>
  );
}

export function Hero() {
  const [offset, setOffset] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    return subscribeLenisScroll(setOffset);
  }, []);

  const fade = Math.max(0, 1 - offset / 620);

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex h-[100svh] min-h-[620px] flex-col overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-x-0 -top-[12%] h-[124%] will-change-transform"
          style={{ transform: `translate3d(0, ${offset * 0.28}px, 0) scale(1.04)` }}
        >
          <img
            src={heroShopfront}
            alt="Belaisy Hair and Beauty Lounge on Long Street, Atherstone"
            width={1920}
            height={1440}
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-[center_22%] md:object-center"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.96_0.03_78/0.26)] via-[oklch(0.97_0.025_82/0.14)] to-[oklch(0.95_0.04_75/0.42)] md:from-[oklch(0.96_0.03_78/0.39)] md:via-[oklch(0.97_0.025_82/0.23)] md:to-[oklch(0.95_0.04_75/0.6)]" />
          <div className="absolute inset-0 hero-sepia-wash opacity-80 md:opacity-100" />
          <div className="absolute inset-0 opacity-80 md:opacity-100" style={{ background: "var(--hero-veil)" }} />
          <div className="absolute inset-0 opacity-70 md:opacity-100" style={{ background: "var(--hero-vignette)" }} />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-4 sm:px-6 md:px-8">
        <div
          className="pointer-events-auto w-full"
          style={{ opacity: fade, transform: `translate3d(0, ${offset * -0.06}px, 0)` }}
        >
          <HeroTagline />
        </div>
      </div>

      <div
        className={cn(
          "hero-copy-shadow relative z-10 mt-auto overflow-hidden py-5 sm:py-6",
          "bg-gradient-to-t from-[oklch(0.96_0.03_78/0.55)] to-transparent backdrop-blur-[2px]",
        )}
        aria-label="Highlights"
      >
        <div className="hero-marquee-track flex w-max items-center gap-8 whitespace-nowrap sm:gap-12">
          <HeroMarqueeTrack />
        </div>
      </div>
    </section>
  );
}

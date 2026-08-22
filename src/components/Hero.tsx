import { Fragment, useEffect, useRef, useState } from "react";
import { SiteLogo } from "@/components/SiteLogo";
import { HeroTagline } from "@/components/HeroTagline";
import {
  heroShopfront,
  mobileHero,
  nightHeroDesktop,
  nightMobileHero,
} from "@/assets";
import { useHeroTime } from "@/lib/hero-time";
import { subscribeLenisScroll } from "@/lib/lenis-scroll";
import { cn } from "@/lib/utils";

const MARQUEE_WORDS = [
  "Books",
  "Coffee",
  "Wine",
  "Sharing boards",
  "Book club",
  "Tasting nights",
  "Cosy corners",
] as const;

function MarqueeSeparator() {
  return (
    <span
      className="shrink-0 font-display text-xl leading-none text-brass sm:text-2xl"
      aria-hidden="true"
    >
      ·
    </span>
  );
}

function HeroMarqueeTrack() {
  const loop = [...MARQUEE_WORDS, ...MARQUEE_WORDS];

  return (
    <>
      {loop.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          {index > 0 ? <MarqueeSeparator /> : null}
          <span className="shrink-0 font-display text-xl leading-none text-white sm:text-2xl">
            {word}
          </span>
        </Fragment>
      ))}
    </>
  );
}

export function Hero() {
  const { isNight } = useHeroTime();
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
      className="relative grid h-[100svh] min-h-[620px] grid-rows-[1fr_auto] overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-x-0 -top-[12%] h-[124%] will-change-transform"
          style={{ transform: `translate3d(0, ${offset * 0.28}px, 0) scale(1.04)` }}
        >
          <picture
            className={cn(
              "absolute inset-0 transition-opacity duration-700 ease-in-out",
              isNight ? "opacity-0" : "opacity-100",
            )}
          >
            <source media="(min-width: 768px)" srcSet={heroShopfront} />
            <img
              src={mobileHero}
              alt=""
              aria-hidden="true"
              className="h-full w-full object-cover object-center"
            />
          </picture>
          <picture
            className={cn(
              "absolute inset-0 transition-opacity duration-700 ease-in-out",
              isNight ? "opacity-100" : "opacity-0",
            )}
          >
            <source media="(min-width: 768px)" srcSet={nightHeroDesktop} />
            <img
              src={nightMobileHero}
              alt="The Cosy Chapter — book bar, coffee and wine on Long Street, Atherstone"
              className="h-full w-full object-cover object-center"
              fetchPriority="high"
            />
          </picture>
          <div className="absolute inset-0" style={{ background: "var(--gradient-veil)" }} />
          <div className="absolute inset-0 bg-primary/12" />
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
          <HeroTagline className="mt-6 max-w-xl leading-relaxed" />
        </div>
      </div>

      <div
        className="hero-copy-shadow relative z-10 overflow-hidden py-5 sm:py-6"
        aria-label="Highlights"
      >
        <div className="marquee-track flex w-max items-center gap-8 whitespace-nowrap sm:gap-12">
          <HeroMarqueeTrack />
        </div>
      </div>
    </section>
  );
}

import { business } from "@/lib/business";
import { cn } from "@/lib/utils";

const heroCopyClass =
  "font-[family-name:var(--font-sans)] text-base font-semibold leading-none tracking-[0.01em] text-foreground/95 sm:text-lg md:text-xl lg:text-2xl";

type HeroTaglineProps = {
  className?: string;
};

/** Hero lockup: large wordmark with tagline tucked below-left. */
export function HeroTagline({ className }: HeroTaglineProps) {
  return (
    <div className={cn("relative mx-auto flex w-full justify-center px-2 sm:px-4", className)}>
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[min(150%,34rem)] w-[min(100%,52rem)] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            "radial-gradient(ellipse 100% 88% at 50% 50%, oklch(0.96 0.03 78 / 0.42) 0%, oklch(0.97 0.025 82 / 0.2) 38%, transparent 76%)",
        }}
      />

      <div className="relative z-[1] max-w-full pb-4 md:pb-5">
        <h1 className="hero-wordmark font-display text-foreground">{business.shortName}</h1>

        <p className={cn(heroCopyClass, "absolute top-full left-0 -mt-2 text-left sm:-mt-2.5 md:-mt-3 lg:-mt-3.5")}>
          {business.logoTagline}
        </p>
      </div>
    </div>
  );
}

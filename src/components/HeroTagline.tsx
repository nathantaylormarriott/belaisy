import { business } from "@/lib/business";
import { cn } from "@/lib/utils";

type HeroTaglineProps = {
  className?: string;
};

export function HeroTagline({ className }: HeroTaglineProps) {
  return (
    <p
      className={cn(
        "mx-auto font-display leading-snug text-foreground",
        "text-lg sm:text-xl lg:text-2xl",
        className,
      )}
    >
      <span className="block">{business.heroTagline[0]}</span>
      <span className="block">{business.heroTagline[1]}</span>
    </p>
  );
}

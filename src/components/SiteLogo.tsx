import { business } from "@/lib/business";
import { cn } from "@/lib/utils";

type SiteLogoProps = {
  variant?: "default" | "onDark";
  showTagline?: boolean;
  className?: string;
};

export function SiteLogo({ variant = "default", showTagline = true, className }: SiteLogoProps) {
  const onDark = variant === "onDark";

  return (
    <div
      className={cn(
        "inline-flex flex-col leading-none",
        onDark ? "items-center text-white" : "items-start text-foreground",
        className,
      )}
      aria-label={business.name}
    >
      <span className="font-display text-[1.75rem] sm:text-[2rem]">
        {business.shortName}
      </span>
      {showTagline ? (
        <span
          className={cn(
            "mt-1 font-sans text-[0.7rem] font-semibold tracking-[0.01em]",
            onDark ? "text-white/75" : "text-muted-foreground",
          )}
        >
          {business.logoTagline}
        </span>
      ) : null}
    </div>
  );
}

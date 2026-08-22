import { Moon, Sun } from "lucide-react";
import { useHeroTime } from "@/lib/hero-time";
import { cn } from "@/lib/utils";

type NightToggleProps = {
  className?: string;
  showLabel?: boolean;
};

export function NightToggle({ className, showLabel = false }: NightToggleProps) {
  const { isNight, isAuto, toggleNight } = useHeroTime();

  return (
    <button
      type="button"
      onClick={toggleNight}
      aria-pressed={isNight}
      aria-label={
        isAuto
          ? isNight
            ? "Preview day hero"
            : "Preview night hero"
          : "Return to automatic day and night"
      }
      className={cn(
        "btn-classic border border-brass/70 px-4 py-2.5 text-brass transition-colors duration-500 hover:bg-brass hover:text-primary sm:px-5",
        className,
      )}
    >
      {isNight ? <Sun className="h-3.5 w-3.5" aria-hidden /> : <Moon className="h-3.5 w-3.5" aria-hidden />}
      {showLabel ? <span>{isAuto ? (isNight ? "Night" : "Day") : "Auto"}</span> : null}
    </button>
  );
}

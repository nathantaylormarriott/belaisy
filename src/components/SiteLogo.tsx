import newLogo from "@/assets/new-logo.webp";
import { cn } from "@/lib/utils";

type SiteLogoProps = {
  variant?: "default" | "onDark";
  className?: string;
};

export function SiteLogo({ className }: SiteLogoProps) {
  return (
    <img
      src={newLogo}
      alt="The Cosy Chapter"
      width={2940}
      height={1028}
      className={cn("h-11 w-auto sm:h-12", className)}
    />
  );
}

import { Link } from "@tanstack/react-router";
import {
  Hand,
  Layers,
  Link2,
  Palette,
  WandSparkles,
  Scissors,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { useReducedMotion } from "framer-motion";
import type { HomeTreatmentPreview } from "@/data/treatments";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

type ServicesBentoGridProps = {
  items: HomeTreatmentPreview[];
};

type BentoTile = {
  span: string;
  rotate: string;
  tint: string;
  icon: LucideIcon;
  delay: number;
};

const tileLayout: BentoTile[] = [
  {
    span: "md:col-span-6",
    rotate: "-rotate-[1.75deg]",
    tint: "from-blush/90 to-blush/40",
    icon: Scissors,
    delay: 0,
  },
  {
    span: "md:col-span-6",
    rotate: "rotate-[2.25deg]",
    tint: "from-lilac/80 to-blush/30",
    icon: Palette,
    delay: 60,
  },
  {
    span: "md:col-span-4",
    rotate: "-rotate-[1.25deg]",
    tint: "from-sage/70 to-blush/25",
    icon: Layers,
    delay: 100,
  },
  {
    span: "md:col-span-4",
    rotate: "rotate-[2deg]",
    tint: "from-blush/85 to-lilac/20",
    icon: Sparkles,
    delay: 140,
  },
  {
    span: "md:col-span-4",
    rotate: "-rotate-[2.5deg]",
    tint: "from-lilac/75 to-sage/25",
    icon: Link2,
    delay: 180,
  },
  {
    span: "md:col-span-5",
    rotate: "rotate-[1.5deg]",
    tint: "from-sage/65 to-blush/30",
    icon: Hand,
    delay: 220,
  },
  {
    span: "md:col-span-7",
    rotate: "-rotate-[0.85deg]",
    tint: "from-blush/80 to-lilac/35",
    icon: WandSparkles,
    delay: 260,
  },
];

function BentoCard({
  item,
  tile,
  reduceMotion,
}: {
  item: HomeTreatmentPreview;
  tile: BentoTile;
  reduceMotion: boolean | null;
}) {
  const isWide = tile.span.includes("col-span-7");
  const Icon = tile.icon;

  return (
    <Reveal delay={tile.delay} className={cn("h-full", tile.span)}>
      <div className={cn("bento-tile h-full", !reduceMotion && tile.rotate)}>
        <Link
          to="/menu"
          hash={item.chapterId}
          className="bento-card relative flex h-full min-h-[11.5rem] flex-col rounded-3xl border-2 border-white bg-card p-5 sm:min-h-[12.5rem] sm:p-6"
        >
          <div
            className={cn(
              "pointer-events-none absolute inset-0 overflow-hidden rounded-[1.375rem] bg-gradient-to-br opacity-90",
              tile.tint,
            )}
            aria-hidden="true"
          />

        <div
          className={cn(
            "relative z-[1] flex items-center justify-center rounded-2xl border border-primary/10 bg-white/55 text-primary shadow-sm",
            isWide ? "mb-5 h-14 w-14 sm:h-16 sm:w-16" : "mb-4 h-12 w-12 sm:h-14 sm:w-14",
          )}
          aria-hidden="true"
        >
          <Icon className={cn(isWide ? "h-7 w-7 sm:h-8 sm:w-8" : "h-6 w-6 sm:h-7 sm:w-7")} strokeWidth={1.5} />
        </div>

        <div className="relative z-[1] mt-auto flex flex-col">
          <p className="text-xs font-medium text-primary sm:text-sm">{item.provider}</p>
          <h3
            className={cn(
              "mt-2 font-display leading-tight text-foreground",
              isWide ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl",
            )}
          >
            {item.title}
          </h3>
          <p
            className={cn(
              "mt-3 text-sm leading-relaxed text-muted-foreground",
              isWide ? "max-w-xl" : "max-w-sm",
            )}
          >
            {item.summary}
          </p>
          <span className="mt-4 text-sm font-medium text-primary">See prices →</span>
        </div>
        </Link>
      </div>
    </Reveal>
  );
}

export function ServicesBentoGrid({ items }: ServicesBentoGridProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="mt-10">
      <div className="grid auto-rows-[minmax(11.5rem,auto)] grid-cols-1 gap-6 sm:gap-7 md:grid-cols-12 md:gap-6 lg:gap-7">
        {items.map((item, index) => (
          <BentoCard
            key={item.chapterId}
            item={item}
            tile={tileLayout[index] ?? tileLayout[tileLayout.length - 1]!}
            reduceMotion={reduceMotion}
          />
        ))}
      </div>

      <Reveal delay={320} className="mt-10 text-center">
        <Link to="/menu" className="btn-primary">
          View full price list
        </Link>
      </Reveal>
    </div>
  );
}

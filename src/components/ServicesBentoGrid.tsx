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
  ArrowRight,
} from "lucide-react";
import { useReducedMotion } from "framer-motion";
import type { HomeTreatmentPreview } from "@/data/treatments";
import { Reveal } from "@/components/Reveal";
import {
  ardicAesthetics,
  colourAndHighlights,
  colourCutsExtensions,
  cutsStylingTreatments,
  gelBiabNailart,
  permanentJewellery,
  serenityCalmMassage,
} from "@/assets";
import { cn } from "@/lib/utils";

type ServicesBentoGridProps = {
  items: HomeTreatmentPreview[];
};

type BentoTile = {
  span: string;
  rotate: string;
  icon: LucideIcon;
  delay: number;
};

const tileLayout: BentoTile[] = [
  {
    span: "md:col-span-6",
    rotate: "-rotate-[1.75deg]",
    icon: Scissors,
    delay: 0,
  },
  {
    span: "md:col-span-6",
    rotate: "rotate-[2.25deg]",
    icon: Palette,
    delay: 60,
  },
  {
    span: "md:col-span-4",
    rotate: "-rotate-[1.25deg]",
    icon: Layers,
    delay: 100,
  },
  {
    span: "md:col-span-4",
    rotate: "rotate-[2deg]",
    icon: Sparkles,
    delay: 140,
  },
  {
    span: "md:col-span-4",
    rotate: "-rotate-[2.5deg]",
    icon: Link2,
    delay: 180,
  },
  {
    span: "md:col-span-5",
    rotate: "rotate-[1.5deg]",
    icon: Hand,
    delay: 220,
  },
  {
    span: "md:col-span-7",
    rotate: "-rotate-[0.85deg]",
    icon: WandSparkles,
    delay: 260,
  },
];

const servicePhotos: Record<string, string> = {
  "belaisy-hair": cutsStylingTreatments,
  "belaisy-colour": colourAndHighlights,
  "leah-hair": colourCutsExtensions,
  "amber-nails": gelBiabNailart,
  "maddie-jewellery": permanentJewellery,
  "joanne-massage": serenityCalmMassage,
  "medine-aesthetics": ardicAesthetics,
};

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
          <img
            src={servicePhotos[item.chapterId]}
            alt=""
            className="bento-photo pointer-events-none absolute inset-0 h-full w-full rounded-[1.375rem] object-cover"
          />
          <div
            className="pointer-events-none absolute inset-0 rounded-[1.375rem] bg-gradient-to-t from-card via-card/78 to-card/16"
            aria-hidden="true"
          />

        <div
          className="relative z-[1] mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/10 bg-white/85 text-primary shadow-sm sm:h-14 sm:w-14"
          aria-hidden="true"
        >
          <Icon className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={1.5} />
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
          <span className="btn-primary-sm mt-4 self-start">See prices</span>
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
        <Link
          to="/menu"
          className="book-now-cta inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium"
        >
          <span className="relative z-[1]">View full price list</span>
          <ArrowRight className="relative z-[1] h-4 w-4 book-now-arrow-nudge" aria-hidden />
        </Link>
      </Reveal>
    </div>
  );
}

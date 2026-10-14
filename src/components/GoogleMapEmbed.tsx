import { useEffect, useRef, useState } from "react";
import { business, fullAddress } from "@/lib/business";
import { cn } from "@/lib/utils";

const MAP_SRC = `https://www.google.com/maps?q=${business.lat},${business.lng}&z=17&hl=en&output=embed`;

const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  `${business.name}, ${fullAddress}`,
)}`;

type GoogleMapEmbedProps = {
  className?: string;
};

export function GoogleMapEmbed({ className }: GoogleMapEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setShowMap(true);
        observer.disconnect();
      },
      { rootMargin: "120px 0px", threshold: 0.01 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "flex min-h-[360px] flex-col overflow-hidden border border-border bg-secondary/40 sm:min-h-[420px]",
        className,
      )}
    >
      <div className="relative min-h-0 flex-1">
        {showMap ? (
          <iframe
            title={`Map showing ${business.name}, ${fullAddress}`}
            src={MAP_SRC}
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        ) : (
          <div
            className="flex h-full min-h-[280px] items-center justify-center text-sm text-muted-foreground sm:min-h-[320px]"
            aria-hidden
          />
        )}
      </div>

      <div className="relative z-[1] flex flex-wrap items-center justify-between gap-4 bg-primary px-4 py-3.5 text-primary-foreground sm:px-5 sm:py-4">
        <address className="not-italic text-sm leading-relaxed sm:text-[0.9375rem]">
          {business.street}
          <br />
          {business.town}, {business.county}
          <br />
          {business.postcode}
        </address>
        <a
          href={directionsHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center justify-center rounded-full border border-primary-foreground/35 bg-primary-foreground/10 px-4 py-2 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/20 sm:text-sm"
        >
          Get directions
        </a>
      </div>
    </div>
  );
}

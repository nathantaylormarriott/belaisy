import { useEffect, useRef, useState } from "react";
import { business, fullAddress } from "@/lib/business";
import { cn } from "@/lib/utils";

const MAP_SRC = `https://www.google.com/maps?q=${business.lat},${business.lng}&z=17&hl=en&output=embed`;

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
      className={cn("overflow-hidden border border-border bg-secondary/40", className)}
    >
      {showMap ? (
        <iframe
          title={`Map showing ${business.name}, ${fullAddress}`}
          src={MAP_SRC}
          className="h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <div
          className="flex h-full min-h-[420px] items-center justify-center text-sm text-muted-foreground"
          aria-hidden
        />
      )}
    </div>
  );
}

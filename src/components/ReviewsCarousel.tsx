import { useReducedMotion } from "framer-motion";
import type { GoogleReview } from "@/lib/google-reviews.functions";
import { useMarqueeMotion } from "@/hooks/useMarqueeMotion";
import { cn } from "@/lib/utils";

type ReviewsCarouselProps = {
  reviews: GoogleReview[];
};

type ReviewTone = "primaryDeep" | "primary" | "rose" | "mauve" | "dustRose" | "blushDeep";

const lightText = {
  quote: "text-primary-foreground",
  divider: "border-primary-foreground/20",
  author: "text-primary-foreground",
  meta: "text-primary-foreground/80",
} as const;

const darkText = {
  quote: "text-foreground",
  divider: "border-foreground/12",
  author: "text-foreground",
  meta: "text-muted-foreground",
} as const;

const reviewToneStyles: Record<
  ReviewTone,
  { card: string; quote: string; divider: string; author: string; meta: string }
> = {
  primaryDeep: {
    card: "bg-[oklch(0.44_0.085_350)] text-primary-foreground",
    ...lightText,
  },
  primary: {
    card: "bg-primary text-primary-foreground",
    ...lightText,
  },
  rose: {
    card: "bg-[oklch(0.54_0.088_350)] text-primary-foreground",
    ...lightText,
  },
  mauve: {
    card: "bg-[oklch(0.64_0.075_350)] text-primary-foreground",
    ...lightText,
  },
  dustRose: {
    card: "bg-[oklch(0.86_0.042_350)] text-foreground",
    ...darkText,
  },
  blushDeep: {
    card: "bg-[oklch(0.9_0.034_350)] text-foreground",
    ...darkText,
  },
};

const rowToneSets: ReviewTone[][] = [
  ["primaryDeep", "dustRose", "primary", "mauve", "rose", "blushDeep"],
  ["mauve", "blushDeep", "primaryDeep", "rose", "dustRose", "primary"],
];

function StarRating({ count = 5, className }: { count?: number; className?: string }) {
  return (
    <div className={cn("flex gap-0.5", className)} role="img" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, index) => (
        <svg
          key={index}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="text-[#F4B400]"
          aria-hidden
        >
          <path d="m12 2 2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.3 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({ review, tone }: { review: GoogleReview; tone: ReviewTone }) {
  const styles = reviewToneStyles[tone];

  return (
    <article
      className={cn(
        "review-marquee-card flex h-full w-full flex-col justify-between rounded-3xl p-6 md:p-7",
        styles.card,
      )}
    >
      <blockquote className={cn("text-base leading-relaxed line-clamp-5 font-normal", styles.quote)}>
        &ldquo;{review.quote}&rdquo;
      </blockquote>
      <div className={cn("mt-6 border-t pt-4", styles.divider)}>
        <StarRating count={review.rating ?? 5} />
        <p className={cn("mt-2 font-semibold", styles.author)}>{review.author}</p>
        <p className={cn("mt-0.5 text-sm", styles.meta)}>{review.source}</p>
      </div>
    </article>
  );
}

function ReviewMarqueeRow({
  reviews,
  tones,
  direction,
  mobileDurationMs,
  desktopDurationMs,
  className,
}: {
  reviews: GoogleReview[];
  tones: ReviewTone[];
  direction: "left" | "right";
  mobileDurationMs: number;
  desktopDurationMs: number;
  className?: string;
}) {
  const loop = [...reviews, ...reviews];
  const mobileMarquee = useMarqueeMotion({ durationMs: mobileDurationMs, direction });
  const desktopMarquee = useMarqueeMotion({ durationMs: desktopDurationMs, direction });

  if (reviews.length === 0) return null;

  return (
    <>
      <div
        ref={mobileMarquee.viewportRef}
        className={cn("marquee-viewport px-4 sm:px-6 md:hidden", className)}
        aria-hidden={false}
      >
        <div ref={mobileMarquee.trackRef} className="marquee-motion-track flex w-max items-stretch gap-4">
          {loop.map((review, index) => (
            <div
              key={`m-${review.author}-${index}`}
              className="marquee-slot flex w-[min(78vw,20rem)] shrink-0"
            >
              <ReviewCard review={review} tone={tones[index % tones.length]!} />
            </div>
          ))}
        </div>
      </div>

      <div
        ref={desktopMarquee.viewportRef}
        className={cn("marquee-viewport hidden px-6 md:block lg:px-8", className)}
      >
        <div ref={desktopMarquee.trackRef} className="marquee-motion-track flex w-max items-stretch gap-4">
          {loop.map((review, index) => (
            <div
              key={`d-${review.author}-${index}`}
              className="marquee-slot flex w-[22rem] shrink-0 lg:w-[26rem]"
            >
              <ReviewCard review={review} tone={tones[index % tones.length]!} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function splitReviews(reviews: GoogleReview[]): [GoogleReview[], GoogleReview[]] {
  if (reviews.length <= 1) {
    return [reviews, reviews];
  }
  const mid = Math.ceil(reviews.length / 2);
  const rowA = reviews.slice(0, mid);
  const rowB = reviews.slice(mid);
  return rowB.length > 0 ? [rowA, rowB] : [rowA, rowA];
}

export function ReviewsCarousel({ reviews }: ReviewsCarouselProps) {
  const reduceMotion = useReducedMotion();
  const [rowA, rowB] = splitReviews(reviews);

  const canAnimate = !reduceMotion && reviews.length > 1;

  if (!canAnimate) {
    return (
      <div className="relative mt-10 overflow-x-auto px-4 pb-2 sm:px-6" aria-label="Guest reviews">
        <div className="flex w-max items-start gap-4 snap-x snap-mandatory">
          {reviews.map((review, index) => (
            <div key={`${review.author}-${index}`} className="snap-center">
              <div className="w-[min(380px,calc(100vw-3rem))] sm:w-[380px]">
                <ReviewCard review={review} tone={rowToneSets[0]![index % rowToneSets[0]!.length]!} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const durationScale = Math.max(reviews.length, 4);

  return (
    <div className="reviews-marquee-wrap relative mt-10" aria-label="Guest reviews">
      <ReviewMarqueeRow
        reviews={rowA}
        tones={rowToneSets[0]!}
        direction="right"
        mobileDurationMs={durationScale * 6_500}
        desktopDurationMs={durationScale * 9_600}
      />
      <ReviewMarqueeRow
        reviews={rowB}
        tones={rowToneSets[1]!}
        direction="left"
        mobileDurationMs={durationScale * 7_000}
        desktopDurationMs={durationScale * 10_000}
        className="mt-2 md:mt-4"
      />
    </div>
  );
}

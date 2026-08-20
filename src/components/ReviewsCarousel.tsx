import { useReducedMotion } from "framer-motion";
import type { GoogleReview } from "@/lib/google-reviews.functions";

type ReviewsCarouselProps = {
  reviews: GoogleReview[];
};

function ReviewCard({ review }: { review: GoogleReview }) {
  return (
    <figure className="flex w-[min(420px,calc(100vw-3rem))] shrink-0 flex-col rounded-[var(--radius-lg)] border border-border/60 bg-card p-8 text-left shadow-[var(--shadow-soft)] sm:w-[420px] sm:p-10">
      <div className="mb-4 flex gap-1 text-brass" aria-hidden="true">
        {Array.from({ length: review.rating ?? 5 }).map((_, starIndex) => (
          <svg key={starIndex} width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="m12 2 2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.3 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8z" />
          </svg>
        ))}
      </div>
      <blockquote className="font-display text-xl italic leading-relaxed text-foreground">
        &ldquo;{review.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-5 text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
        {review.author} · {review.source}
      </figcaption>
    </figure>
  );
}

export function ReviewsCarousel({ reviews }: ReviewsCarouselProps) {
  const reduceMotion = useReducedMotion();
  const canAnimate = !reduceMotion && reviews.length > 1;
  const loop = canAnimate ? [...reviews, ...reviews] : reviews;

  if (canAnimate) {
    return (
      <div
        className="relative mt-12 overflow-x-hidden py-3"
        aria-label="Guest reviews"
        aria-live="off"
      >
        <div
          className="marquee-reviews flex w-max items-start gap-5"
          style={{ animationDuration: `${Math.max(reviews.length * 18, 48)}s` }}
        >
          {loop.map((review, index) => (
            <ReviewCard key={`${review.author}-${index}`} review={review} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative mt-12 overflow-x-auto px-6 pb-2 sm:px-8" aria-label="Guest reviews">
      <div className="flex w-max items-start gap-5 snap-x snap-mandatory">
        {loop.map((review, index) => (
          <div key={`${review.author}-${index}`} className="snap-center">
            <ReviewCard review={review} />
          </div>
        ))}
      </div>
    </div>
  );
}

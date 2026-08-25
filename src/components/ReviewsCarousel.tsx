import { useReducedMotion } from "framer-motion";
import type { GoogleReview } from "@/lib/google-reviews.functions";

type ReviewsCarouselProps = {
  reviews: GoogleReview[];
};

function ReviewCard({ review }: { review: GoogleReview }) {
  return (
    <figure className="card-soft flex w-[min(380px,calc(100vw-3rem))] shrink-0 flex-col p-7 sm:w-[380px] sm:p-8">
      <div className="mb-3 flex gap-0.5 text-accent" aria-hidden="true">
        {Array.from({ length: review.rating ?? 5 }).map((_, starIndex) => (
          <svg key={starIndex} width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="m12 2 2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.3 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8z" />
          </svg>
        ))}
      </div>
      <blockquote className="font-[family-name:var(--font-sans)] text-base font-normal leading-relaxed text-foreground sm:text-lg">
        &ldquo;{review.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-4 text-sm text-muted-foreground">
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
      <div className="relative mt-10 overflow-x-hidden py-2" aria-label="Guest reviews" aria-live="off">
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
    <div className="relative mt-10 overflow-x-auto px-2 pb-2" aria-label="Guest reviews">
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

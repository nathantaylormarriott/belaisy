import { createServerFn } from "@tanstack/react-start";
import staticReviews from "@/data/google-reviews.json";

export type GoogleReview = {
  quote: string;
  author: string;
  source: "Google";
  rating: number;
  publishedAt?: string;
};

const PLACE_QUERY = "Belaisy Hair, 41-43 Long Street, Atherstone CV9 1AY";

async function fetchFromPlacesApi(): Promise<GoogleReview[]> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) return [];

  const searchRes = await fetch("https://places.googleapis.com/v1/places:searchText", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": "places.id",
    },
    body: JSON.stringify({ textQuery: PLACE_QUERY }),
  });

  if (!searchRes.ok) return [];

  const searchData = (await searchRes.json()) as {
    places?: { id?: string }[];
  };
  const placeId = searchData.places?.[0]?.id;
  if (!placeId) return [];

  const detailsRes = await fetch(`https://places.googleapis.com/v1/${placeId}`, {
    headers: {
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": "reviews.rating,reviews.text,reviews.publishTime,reviews.authorAttribution",
    },
  });

  if (!detailsRes.ok) return [];

  const details = (await detailsRes.json()) as {
    reviews?: {
      rating?: number;
      text?: { text?: string };
      publishTime?: string;
      authorAttribution?: { displayName?: string };
    }[];
  };

  return (details.reviews ?? [])
    .filter((review) => review.text?.text?.trim() && (review.rating ?? 5) === 5)
    .map((review) => ({
      quote: review.text!.text!.trim(),
      author: review.authorAttribution?.displayName?.trim() || "Google reviewer",
      source: "Google" as const,
      rating: review.rating ?? 5,
      publishedAt: review.publishTime,
    }));
}

export const fetchGoogleReviews = createServerFn({ method: "GET" }).handler(
  async (): Promise<GoogleReview[]> => {
    const fiveStarStatic = (staticReviews as GoogleReview[]).filter((review) => review.rating === 5);
    if (fiveStarStatic.length > 0) return fiveStarStatic;

    try {
      const live = await fetchFromPlacesApi();
      if (live.length > 0) return live;
    } catch {
      /* fall through */
    }

    return [];
  },
);

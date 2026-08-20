#!/usr/bin/env node
/**
 * Sync Google reviews into src/data/google-reviews.json
 * Requires GOOGLE_PLACES_API_KEY in the environment (Places API New enabled).
 */
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const PLACE_QUERY = "The Cosy Chapter, 45-47 Long Street, Atherstone CV9 1AZ";
const apiKey = process.env.GOOGLE_PLACES_API_KEY;

if (!apiKey) {
  console.error("Set GOOGLE_PLACES_API_KEY before running this script.");
  process.exit(1);
}

const searchRes = await fetch("https://places.googleapis.com/v1/places:searchText", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": apiKey,
    "X-Goog-FieldMask": "places.id",
  },
  body: JSON.stringify({ textQuery: PLACE_QUERY }),
});

if (!searchRes.ok) {
  console.error("Place search failed:", await searchRes.text());
  process.exit(1);
}

const searchData = await searchRes.json();
const placeId = searchData.places?.[0]?.id;
if (!placeId) {
  console.error("No place found for query:", PLACE_QUERY);
  process.exit(1);
}

const detailsRes = await fetch(`https://places.googleapis.com/v1/${placeId}`, {
  headers: {
    "X-Goog-Api-Key": apiKey,
    "X-Goog-FieldMask": "reviews.rating,reviews.text,reviews.publishTime,reviews.authorAttribution",
  },
});

if (!detailsRes.ok) {
  console.error("Place details failed:", await detailsRes.text());
  process.exit(1);
}

const details = await detailsRes.json();
const reviews = (details.reviews ?? [])
  .filter((review) => review.text?.text?.trim())
  .map((review) => ({
    quote: review.text.text.trim(),
    author: review.authorAttribution?.displayName?.trim() || "Google reviewer",
    source: "Google",
    rating: review.rating ?? 5,
    publishedAt: review.publishTime,
  }));

const outPath = path.join(path.dirname(fileURLToPath(import.meta.url)), "../src/data/google-reviews.json");
writeFileSync(outPath, `${JSON.stringify(reviews, null, 2)}\n`);
console.log(`Wrote ${reviews.length} reviews to ${outPath}`);

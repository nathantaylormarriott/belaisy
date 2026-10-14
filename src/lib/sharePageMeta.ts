export const SITE_NAME = "Belaisy Hair";

export const SITE_DESCRIPTION =
  "Belaisy Hair and Beauty Lounge on Long Street, Atherstone. Cuts, colour, treatments, nails and more in a relaxed salon setting.";

export const OG_IMAGE_PATH = "/og-image.png";

export const OG_IMAGE_ALT = "Belaisy Hair and Beauty Lounge on Long Street, Atherstone";

export const SHARE_PAGE_DESCRIPTION = SITE_DESCRIPTION;

export const SHARE_PAGE_META = {
  title: "Belaisy Hair | Links",
  ogTitle: "Belaisy Hair and Beauty Lounge",
  description: SITE_DESCRIPTION,
  ogUrl: "/share",
} as const;

export function socialMeta({
  title,
  description,
  path,
  origin,
}: {
  title: string;
  description: string;
  path: string;
  origin?: string;
}) {
  const base = origin?.replace(/\/$/, "") ?? "";
  const url = base ? `${base}${path}` : path;
  const image = base ? `${base}${OG_IMAGE_PATH}` : OG_IMAGE_PATH;

  return [
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:url", content: url },
    { property: "og:image", content: image },
    { property: "og:image:alt", content: OG_IMAGE_ALT },
    { property: "og:locale", content: "en_GB" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
  ];
}

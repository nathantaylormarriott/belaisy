import { toProxiedPlayUrl } from "./tiktok-media";

export type TikTokVideo = {
  id: string;
  url: string;
  title: string;
  thumbnail?: string;
  playUrl?: string;
  publishedAt?: string;
};

export const TIKTOK_USERNAME = "belaisy.hair.beau";
export const TIKTOK_PROFILE_URL = `https://www.tiktok.com/@${TIKTOK_USERNAME}`;

const TIKTOK_EMBED_URL = `https://www.tiktok.com/embed/@${TIKTOK_USERNAME}`;
const PROFILE_FETCH_URL = `${TIKTOK_PROFILE_URL}?lang=en-GB`;

const FETCH_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
  Accept: "text/html,application/xhtml+xml,application/rss+xml,application/xml;q=0.9,*/*;q=0.8",
  "Accept-Language": "en-GB,en;q=0.9",
};

const decodeJsonUrl = (value: string) =>
  value.replace(/\\u002F/g, "/").replace(/\\\//g, "/").replace(/\\"/g, '"');

const decodeHtml = (value: string) => value.replace(/&amp;/g, "&");

const isPlayableCdnUrl = (url: string) => url.includes("tiktokcdn") && !/\.(png|jpe?g|webp|gif)(\?|$)/i.test(url);

const pickEmbedString = (value: unknown): string | undefined =>
  typeof value === "string" && value.trim().length > 0 ? value : undefined;

const pickEmbedThumbnail = (item: Record<string, unknown>): string | undefined => {
  const imagePost = item.imagePost as { images?: Array<{ imageURL?: { urlList?: string[] } }> } | undefined;
  const firstCarouselImage = imagePost?.images?.[0]?.imageURL?.urlList?.[0];

  return (
    pickEmbedString(firstCarouselImage) ??
    pickEmbedString(item.coverUrl) ??
    pickEmbedString(item.originCoverUrl) ??
    pickEmbedString(item.dynamicCoverUrl) ??
    pickEmbedString(item.cover) ??
    pickEmbedString(item.dynamicCover) ??
    pickEmbedString(item.originCover)
  );
};

const parseEmbedFrontityState = (html: string): TikTokVideo[] => {
  const match = html.match(/id="__FRONTITY_CONNECT_STATE__"[^>]*>([\s\S]*?)<\/script>/);
  if (!match?.[1]) return [];

  try {
    const state = JSON.parse(match[1]) as {
      source?: { data?: Record<string, { videoList?: Array<Record<string, unknown>> }> };
    };
    const page = Object.values(state.source?.data ?? {}).find((entry) => Array.isArray(entry?.videoList));
    const videoList = page?.videoList ?? [];

    return videoList.flatMap((item) => {
      const id = String(item.id ?? "");
      if (!id) return [];

      const playAddrRaw = typeof item.playAddr === "string" ? decodeJsonUrl(item.playAddr) : "";
      const coverRaw = pickEmbedThumbnail(item);
      const desc = typeof item.desc === "string" ? decodeJsonUrl(item.desc) : "TikTok video";

      return [
        {
          id,
          url: `https://www.tiktok.com/@${TIKTOK_USERNAME}/video/${id}`,
          title: desc || "TikTok video",
          thumbnail: coverRaw ? decodeHtml(coverRaw) : undefined,
          playUrl: playAddrRaw && isPlayableCdnUrl(playAddrRaw) ? toProxiedPlayUrl(playAddrRaw) : undefined,
        },
      ];
    });
  } catch {
    return [];
  }
};

const tagContent = (chunk: string, tag: string) => {
  const match = chunk.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i"));
  return match?.[1]?.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/, "$1").trim();
};

const parseRssXml = (xml: string): TikTokVideo[] => {
  if (!xml.includes("<rss") && !xml.includes("<feed")) return [];

  const videos: TikTokVideo[] = [];
  for (const chunk of xml.split(/<item[\s>]/i).slice(1)) {
    const link = tagContent(chunk, "link") ?? tagContent(chunk, "guid");
    const title = tagContent(chunk, "title") ?? "TikTok video";
    const publishedAt = tagContent(chunk, "pubDate") ?? tagContent(chunk, "published");
    const thumbMatch =
      chunk.match(/<media:thumbnail[^>]+url="([^"]+)"/i) ?? chunk.match(/<enclosure[^>]+url="([^"]+)"/i);
    const idMatch = link?.match(/video\/(\d+)/);
    if (!link || !idMatch?.[1]) continue;

    videos.push({
      id: idMatch[1],
      url: link,
      title,
      thumbnail: thumbMatch?.[1],
      publishedAt,
    });
  }

  return videos.slice(0, 12);
};

const fetchFromCreatorEmbed = async (): Promise<TikTokVideo[]> => {
  const response = await fetch(TIKTOK_EMBED_URL, { headers: FETCH_HEADERS });
  if (!response.ok) return [];

  const html = await response.text();
  const fromState = parseEmbedFrontityState(html);
  if (fromState.length > 0) return fromState.slice(0, 12);

  const ids = [...new Set([...html.matchAll(/video\/(\d{19})/g)].map((match) => match[1]))].slice(0, 12);
  return ids.map((id) => {
    const marker = `video/${id}`;
    const start = html.indexOf(marker);
    const chunk = start === -1 ? "" : html.slice(start, start + 4500);
    const poster = chunk.match(/poster="([^"]+)"/)?.[1];
    const coverUrl = chunk.match(/"coverUrl":"([^"]+)"/)?.[1];
    const playAddr = chunk.match(/"playAddr":"([^"]+)"/)?.[1];
    const playAddrRaw = playAddr ? decodeJsonUrl(playAddr) : "";
    const thumbnailRaw = coverUrl ? decodeJsonUrl(coverUrl) : poster ? decodeHtml(poster) : undefined;

    return {
      id,
      url: `https://www.tiktok.com/@${TIKTOK_USERNAME}/video/${id}`,
      title: "TikTok video",
      thumbnail: thumbnailRaw ? decodeHtml(thumbnailRaw) : undefined,
      playUrl: playAddrRaw && isPlayableCdnUrl(playAddrRaw) ? toProxiedPlayUrl(playAddrRaw) : undefined,
    };
  });
};

const scrapeProfileVideos = async (): Promise<TikTokVideo[]> => {
  const response = await fetch(PROFILE_FETCH_URL, { headers: FETCH_HEADERS });
  if (!response.ok) return [];

  const html = await response.text();
  const videos: TikTokVideo[] = [];
  const seen = new Set<string>();
  const richBlock = /"id":"(\d{19})"[\s\S]{0,1200}?"desc":"([^"]*)"[\s\S]{0,400}?"cover":"([^"]+)"/g;

  for (const match of html.matchAll(richBlock)) {
    const id = match[1];
    if (!id || seen.has(id)) continue;
    seen.add(id);
    videos.push({
      id,
      url: `https://www.tiktok.com/@${TIKTOK_USERNAME}/video/${id}`,
      title: decodeJsonUrl(match[2] ?? "") || "Latest from the lounge",
      thumbnail: decodeJsonUrl(match[3] ?? ""),
    });
  }

  if (videos.length > 0) return videos.slice(0, 12);

  for (const match of html.matchAll(/"id":"(\d{19})"/g)) {
    const id = match[1];
    if (!id || seen.has(id)) continue;
    seen.add(id);
    videos.push({
      id,
      url: `https://www.tiktok.com/@${TIKTOK_USERNAME}/video/${id}`,
      title: "Watch on TikTok",
    });
  }

  return videos.slice(0, 12);
};

export async function getTikTokVideos(): Promise<TikTokVideo[]> {
  const fromEmbed = await fetchFromCreatorEmbed();
  if (fromEmbed.length > 0) return fromEmbed.slice(0, 12);

  const rss = await fetch(`https://www.tiktok.com/@${TIKTOK_USERNAME}/rss`, { headers: FETCH_HEADERS });
  if (rss.ok) {
    const text = await rss.text();
    if (!text.trim().startsWith("<!DOCTYPE") && !text.trim().startsWith("<html")) {
      const fromRss = parseRssXml(text);
      if (fromRss.length > 0) return fromRss;
    }
  }

  return (await scrapeProfileVideos()).slice(0, 12);
}

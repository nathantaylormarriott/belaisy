const TIKTOK_REFERER = "https://www.tiktok.com/";

const ALLOWED_VIDEO_HOST = /^https:\/\/v\d+\.tiktokcdn(?:-[a-z0-9]+)?\.com\/.+/i;

export const isAllowedTikTokVideoUrl = (url: string): boolean => ALLOWED_VIDEO_HOST.test(url);

export const toProxiedPlayUrl = (playAddr: string): string =>
  `/api/tiktok-media?url=${encodeURIComponent(playAddr)}`;

export const proxyTikTokVideo = async (targetUrl: string): Promise<Response> => {
  if (!isAllowedTikTokVideoUrl(targetUrl)) {
    return new Response("Invalid video URL", { status: 400 });
  }

  const upstream = await fetch(targetUrl, {
    headers: {
      Referer: TIKTOK_REFERER,
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    },
  });

  if (!upstream.ok || !upstream.body) {
    return new Response("Video unavailable", { status: upstream.status || 502 });
  }

  const headers = new Headers();
  const contentType = upstream.headers.get("content-type");
  if (contentType) headers.set("Content-Type", contentType);
  headers.set("Cache-Control", "public, max-age=3600, stale-while-revalidate=86400");

  return new Response(upstream.body, { status: 200, headers });
};

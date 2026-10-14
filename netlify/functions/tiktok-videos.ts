import { getTikTokVideos, TIKTOK_PROFILE_URL } from "../../src/lib/tiktok-feed";

export default async () => {
  try {
    const videos = await getTikTokVideos();
    return Response.json(
      { videos, profileUrl: TIKTOK_PROFILE_URL },
      { headers: { "Cache-Control": "public, max-age=300, stale-while-revalidate=3600" } },
    );
  } catch (error) {
    console.error(error);
    return Response.json({ videos: [], profileUrl: TIKTOK_PROFILE_URL });
  }
};

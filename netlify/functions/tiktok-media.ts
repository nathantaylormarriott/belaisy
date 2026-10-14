import { proxyTikTokVideo } from "../../src/lib/tiktok-media";

export default async (req: Request) => {
  const target = new URL(req.url).searchParams.get("url") ?? "";
  return proxyTikTokVideo(target);
};

import { useEffect, useRef, useState } from "react";
import { Facebook, Instagram } from "lucide-react";
import { useMarqueeMotion } from "@/hooks/useMarqueeMotion";
import { Reveal } from "@/components/Reveal";
import { business } from "@/lib/business";
import { TIKTOK_PROFILE_URL, type TikTokVideo } from "@/lib/tiktok-feed";

const socialButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 sm:px-6";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

function TikTokAutoplayVideo({ src, poster }: { src: string; poster?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const lockMute = () => {
      video.defaultMuted = true;
      if (!video.muted) video.muted = true;
      if (video.volume !== 0) video.volume = 0;
    };

    lockMute();

    const playMuted = () => {
      lockMute();
      void video.play().catch(() => undefined);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.some((entry) => entry.isIntersecting && entry.intersectionRatio > 0.12);
        if (visible) playMuted();
        else video.pause();
      },
      { threshold: [0, 0.12, 0.4] },
    );
    observer.observe(video);
    video.addEventListener("canplay", playMuted);
    video.addEventListener("play", lockMute);
    video.addEventListener("volumechange", lockMute);

    return () => {
      observer.disconnect();
      video.removeEventListener("canplay", playMuted);
      video.removeEventListener("play", lockMute);
      video.removeEventListener("volumechange", lockMute);
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      loop
      muted
      playsInline
      disablePictureInPicture
      controls={false}
      preload="metadata"
      className="pointer-events-none h-full w-full object-cover"
    />
  );
}

function TikTokCard({ video }: { video: TikTokVideo }) {
  return (
    <a
      href={video.url}
      target="_blank"
      rel="noreferrer"
      aria-label={video.title || "Open TikTok video"}
      className="relative block aspect-[9/16] overflow-hidden rounded-3xl border border-[oklch(0.88_0.022_350)] bg-[oklch(0.44_0.085_350)] shadow-[var(--shadow-card)]"
    >
      {video.playUrl ? (
        <TikTokAutoplayVideo src={video.playUrl} poster={video.thumbnail} />
      ) : video.thumbnail ? (
        <img
          src={video.thumbnail}
          alt=""
          className="h-full w-full object-cover"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
      ) : (
        <span className="flex h-full items-end p-4 text-sm text-primary-foreground">@belaisy.hair.beau</span>
      )}
    </a>
  );
}

export function TikTokFeed() {
  const [videos, setVideos] = useState<TikTokVideo[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "empty">("loading");
  const marquee = useMarqueeMotion({ durationMs: 42_000, direction: "left" });

  useEffect(() => {
    let cancelled = false;

    fetch("/api/tiktok-videos")
      .then(async (response) => {
        if (!response.ok) return [];
        const data = (await response.json()) as { videos?: TikTokVideo[] };
        return (data.videos ?? []).slice(0, 12);
      })
      .then((next) => {
        if (cancelled) return;
        setVideos(next);
        setStatus(next.length > 0 ? "ready" : "empty");
      })
      .catch(() => {
        if (!cancelled) setStatus("empty");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const loop = [...videos, ...videos];

  return (
    <section id="tiktok" className="tiktok-feed py-20 sm:py-28">
      <Reveal className="container-tight mb-12 text-center sm:mb-16">
        <h2 className="text-4xl sm:text-5xl">From the lounge</h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Colour, cuts and life at Belaisy Hair and Beauty Lounge.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <a href={TIKTOK_PROFILE_URL} target="_blank" rel="noopener noreferrer" className={socialButtonClass}>
            <TikTokIcon className="h-[1.125rem] w-[1.125rem] shrink-0" />
            TikTok
          </a>
          <a href={business.instagram} target="_blank" rel="noopener noreferrer" className={socialButtonClass}>
            <Instagram className="h-[1.125rem] w-[1.125rem] shrink-0" strokeWidth={2} />
            Instagram
          </a>
          <a href={business.facebook} target="_blank" rel="noopener noreferrer" className={socialButtonClass}>
            <Facebook className="h-[1.125rem] w-[1.125rem] shrink-0" strokeWidth={2} />
            Facebook
          </a>
        </div>
      </Reveal>

      {status === "loading" ? (
        <div className="flex gap-4 overflow-hidden px-4 sm:px-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="aspect-[9/16] w-[11rem] shrink-0 animate-pulse rounded-3xl bg-primary/10 md:w-[14rem]"
            />
          ))}
        </div>
      ) : null}

      {status === "ready" ? (
        <div ref={marquee.viewportRef} className="marquee-viewport px-4 sm:px-6 lg:px-8">
          <div ref={marquee.trackRef} className="marquee-motion-track flex w-max items-stretch gap-4">
            {loop.map((video, index) => (
              <div key={`${video.id}-${index}`} className="w-[11.5rem] shrink-0 md:w-[13.5rem] lg:w-[15rem]">
                <TikTokCard video={video} />
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {status === "empty" ? (
        <div className="container-tight">
          <div className="rounded-3xl border border-border bg-card px-6 py-10 text-muted-foreground">
            <p>Clips are taking a moment to load.</p>
            <a
              href={TIKTOK_PROFILE_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex font-medium text-primary underline-offset-4 hover:underline"
            >
              Watch on TikTok
            </a>
          </div>
        </div>
      ) : null}
    </section>
  );
}

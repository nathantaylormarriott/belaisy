import { useCallback, useEffect, useState } from "react";

type Direction = "left" | "right";

type Options = {
  durationMs: number;
  direction: Direction;
  enterDelayMs?: number;
  leaveDelayMs?: number;
  easeMs?: number;
};

export function useMarqueeMotion({
  durationMs,
  direction,
  enterDelayMs = 160,
  leaveDelayMs = 60,
  easeMs = 70,
}: Options) {
  const [viewport, setViewport] = useState<HTMLDivElement | null>(null);
  const [track, setTrack] = useState<HTMLDivElement | null>(null);

  const viewportRef = useCallback((node: HTMLDivElement | null) => {
    setViewport(node);
  }, []);

  const trackRef = useCallback((node: HTMLDivElement | null) => {
    setTrack(node);
  }, []);

  useEffect(() => {
    if (!viewport || !track) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      track.style.transform = "none";
      return;
    }

    let frame = 0;
    let last = performance.now();
    let offset = 0;
    let loop = 0;
    let primed = false;
    let speed = 1;
    let target = 1;
    let enterTimer: number | undefined;
    let leaveTimer: number | undefined;

    const measure = () => {
      const next = track.scrollWidth / 2;
      if (!(next > 1)) return;

      if (!primed) {
        offset = direction === "right" ? -next : 0;
        primed = true;
      } else if (loop > 1 && Math.abs(next - loop) > 0.5) {
        offset = (offset / loop) * next;
      }

      loop = next;
    };

    const clearEnter = () => {
      if (enterTimer === undefined) return;
      window.clearTimeout(enterTimer);
      enterTimer = undefined;
    };

    const clearLeave = () => {
      if (leaveTimer === undefined) return;
      window.clearTimeout(leaveTimer);
      leaveTimer = undefined;
    };

    const onEnter = () => {
      clearLeave();
      if (enterTimer !== undefined || target === 0) return;
      enterTimer = window.setTimeout(() => {
        enterTimer = undefined;
        target = 0;
      }, enterDelayMs);
    };

    const onLeave = () => {
      clearEnter();
      if (leaveTimer !== undefined || target === 1) return;
      leaveTimer = window.setTimeout(() => {
        leaveTimer = undefined;
        target = 1;
      }, leaveDelayMs);
    };

    viewport.addEventListener("mouseenter", onEnter);
    viewport.addEventListener("mouseleave", onLeave);

    const observer = new ResizeObserver(measure);
    observer.observe(track);
    measure();

    const tick = (now: number) => {
      const dt = Math.min(40, now - last);
      last = now;

      if (loop <= 1) measure();

      const visible = viewport.getClientRects().length > 0;
      if (visible && loop > 1) {
        const blend = 1 - Math.exp(-dt / easeMs);
        speed += (target - speed) * blend;
        if (target === 0 && speed < 0.02) speed = 0;
        if (target === 1 && speed > 0.98) speed = 1;

        const delta = (loop * speed * dt) / durationMs;
        if (direction === "left") {
          offset -= delta;
          while (offset <= -loop) offset += loop;
        } else {
          offset += delta;
          while (offset >= 0) offset -= loop;
        }

        track.style.transform = `translate3d(${offset.toFixed(2)}px, 0, 0)`;
      }

      frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      viewport.removeEventListener("mouseenter", onEnter);
      viewport.removeEventListener("mouseleave", onLeave);
      clearEnter();
      clearLeave();
      track.style.transform = "";
    };
  }, [direction, durationMs, easeMs, enterDelayMs, leaveDelayMs, track, viewport]);

  return { viewportRef, trackRef };
}

import { useEffect } from "react";
import { bindLenisScroll, registerLenis } from "@/lib/lenis-scroll";

/** Soft Lenis smooth scrolling, disabled for reduced-motion users. */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let lenis: { destroy: () => void } | null = null;
    let unsubscribeScroll: (() => void) | undefined;
    let cancelled = false;

    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;

      const instance = new Lenis({
        autoRaf: true,
        duration: 1.25,
        lerp: 0.09,
        wheelMultiplier: 0.9,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });

      lenis = instance;
      registerLenis(instance);
      unsubscribeScroll = bindLenisScroll(instance);
    });

    return () => {
      cancelled = true;
      unsubscribeScroll?.();
      registerLenis(null);
      lenis?.destroy();
    };
  }, []);

  return null;
}

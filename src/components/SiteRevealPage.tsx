import { useEffect, useRef, useState, type ReactNode } from "react";
import { SiteFooter } from "@/components/SiteFooter";
import { subscribeLenisScroll } from "@/lib/lenis-scroll";

type SiteRevealPageProps = {
  children: ReactNode;
};

/**
 * Fixed footer behind content. A trailing spacer adds scroll room; in that final
 * stretch the content layer lifts by exactly the footer height — no overshoot.
 */
export function SiteRevealPage({ children }: SiteRevealPageProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const [footerHeight, setFooterHeight] = useState(0);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const measure = () => setFooterHeight(footer.offsetHeight);
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (footerHeight <= 0) return;

    const content = contentRef.current;
    const footer = footerRef.current;
    if (!content || !footer) return;

    const update = (scrollY = window.scrollY) => {
      const height = footer.offsetHeight;
      if (!height) return;

      const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      const revealStart = Math.max(0, maxScroll - height);
      const progress = Math.min(1, Math.max(0, (scrollY - revealStart) / height));
      const lift = progress * height;

      content.style.transform = lift > 0 ? `translate3d(0, -${lift}px, 0)` : "";
      content.style.willChange = lift > 0 && progress < 1 ? "transform" : "";
    };

    update();
    const unsubscribe = subscribeLenisScroll(update);
    const onResize = () => update();
    window.addEventListener("resize", onResize);

    return () => {
      unsubscribe();
      window.removeEventListener("resize", onResize);
      content.style.transform = "";
      content.style.willChange = "";
    };
  }, [footerHeight]);

  return (
    <div className="site-reveal-page">
      <div ref={contentRef} className="site-reveal-content">
        {children}
      </div>
      <SiteFooter ref={footerRef} />
      {footerHeight > 0 ? (
        <div className="site-reveal-spacer" style={{ height: footerHeight }} aria-hidden="true" />
      ) : null}
    </div>
  );
}

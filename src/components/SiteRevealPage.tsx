import { useEffect, useRef, useState, type ReactNode } from "react";
import { SiteFooter } from "@/components/SiteFooter";

type SiteRevealPageProps = {
  children: ReactNode;
};

/**
 * Footer stays fixed behind the page. A spacer the same height as the footer
 * lets the last screen of content scroll clear of it, so the footer is revealed
 * once without an extra gap.
 */
export function SiteRevealPage({ children }: SiteRevealPageProps) {
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

  return (
    <div className="site-reveal-page">
      <div className="site-reveal-content">{children}</div>
      <SiteFooter ref={footerRef} />
      {footerHeight > 0 ? (
        <div className="site-reveal-spacer" style={{ height: footerHeight }} aria-hidden="true" />
      ) : null}
    </div>
  );
}

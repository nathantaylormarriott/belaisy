import { forwardRef, useEffect, useRef, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteLogo } from "@/components/SiteLogo";
import { business } from "@/lib/business";

const builderWhatsAppHref = `https://api.whatsapp.com/send?phone=447831798112&text=${encodeURIComponent(
  "Hey I was on the Belaisy Hair website and was interested in getting a website of my own...",
)}`;

const footerLinks = [
  { label: "About", href: "/#story" },
  { label: "Services", href: "/#services" },
  { label: "Team", href: "/#team" },
  { label: "Treatments", href: "/menu", route: true as const },
  { label: "Policies", href: "/policies", route: true as const },
  { label: "Visit", href: "/#visit" },
  { label: "Contact", href: "/#contact" },
] as const;

function FooterFitWordmark({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;
    if (!container || !text) return;

    const fit = () => {
      const width = container.clientWidth;
      if (!width) return;

      const root = parseFloat(getComputedStyle(document.documentElement).fontSize);
      const min = root * 3.5;
      const max = root * 17.5;

      text.style.fontSize = `${max}px`;
      const scale = width / text.scrollWidth;
      const size = Math.min(max, Math.max(min, max * scale));
      text.style.fontSize = `${size}px`;
    };

    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(container);
    void document.fonts?.ready.then(fit);

    return () => observer.disconnect();
  }, [children]);

  return (
    <span ref={containerRef} className="footer-wordmark-fit">
      <span ref={textRef} className="footer-wordmark font-display">
        {children}
      </span>
    </span>
  );
}

export const SiteFooter = forwardRef<HTMLElement>(function SiteFooter(_props, ref) {
  return (
    <footer ref={ref} className="site-reveal-footer">
      <div className="container-tight py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr_1fr] lg:gap-16">
          <div>
            <Link to="/" hash="top" className="inline-block">
              <SiteLogo />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {business.tagline} — a relaxed salon and beauty lounge on Long Street, Atherstone.
            </p>
            <address className="mt-5 text-sm not-italic leading-relaxed text-muted-foreground">
              {business.street}
              <br />
              {business.town}, {business.postcode}
            </address>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground">Explore</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  {"route" in link && link.route ? (
                    <Link to={link.href} className="transition-colors hover:text-primary">
                      {link.label}
                    </Link>
                  ) : (
                    <a href={link.href} className="transition-colors hover:text-primary">
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground">Connect</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              <li>
                <a href={business.phoneHref} className="transition-colors hover:text-primary">
                  {business.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={business.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-primary"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={business.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-primary"
                >
                  Facebook
                </a>
              </li>
            </ul>

            <div className="mt-8 rounded-2xl border border-foreground/10 bg-white/40 p-4">
              <p className="text-xs font-medium text-foreground">Website by Taylor-Marriott</p>
              <a
                href={builderWhatsAppHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-primary transition-colors hover:text-primary/80"
              >
                Claim yours
                <ArrowRight className="h-3 w-3 animate-arrow-nudge" aria-hidden />
              </a>
            </div>
          </div>
        </div>

        <p className="mt-12 text-center text-xs text-muted-foreground sm:text-left">
          © {new Date().getFullYear()} {business.name}. All rights reserved.
        </p>
      </div>

      <div className="footer-wordmark-wrap border-t border-foreground/8">
        <Link
          to="/"
          hash="top"
          className="footer-wordmark-link"
          aria-label={`${business.name} home`}
        >
          <FooterFitWordmark>{business.shortName}</FooterFitWordmark>
        </Link>
      </div>
    </footer>
  );
});

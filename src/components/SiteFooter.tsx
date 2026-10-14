import { forwardRef } from "react";
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
  { label: "Admin", href: "/admin", route: true as const },
  { label: "Visit", href: "/#visit" },
  { label: "Contact", href: "/#contact" },
] as const;

const footerHeading =
  "font-sans text-sm font-semibold tracking-normal text-foreground md:text-base";
  "font-sans text-sm font-semibold tracking-normal text-foreground md:text-base";

export const SiteFooter = forwardRef<HTMLElement>(function SiteFooter(_props, ref) {
  return (
    <footer ref={ref} className="site-reveal-footer">
      <div className="container-tight pt-14 pb-12 sm:pt-16 sm:pb-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:ml-auto lg:w-[88%] lg:grid-cols-4 lg:items-start lg:gap-12">
          <div>
            <Link to="/" hash="top" className="inline-block">
              <SiteLogo />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {business.tagline} - a relaxed salon and beauty lounge on Long Street, Atherstone.
            </p>
            <address className="mt-5 text-sm not-italic leading-relaxed text-muted-foreground">
              {business.street}
              <br />
              {business.town}, {business.postcode}
            </address>
          </div>

          <div>
            <h4 className={footerHeading}>Explore</h4>
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
            <h4 className={footerHeading}>Connect</h4>
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
          </div>

          <div>
            <h4 className={footerHeading}>Website by:</h4>
              <a
                href="https://www.taylor-marriott.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 block transition-opacity hover:opacity-80"
              >
                <img
                  src="/taylor-marriott-logo.png"
                  alt="Taylor-Marriott"
                  className="block h-9 w-auto grayscale brightness-[0.55] md:h-14"
                />
              </a>
              <a
                href={builderWhatsAppHref}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-cta mt-2 inline-flex max-w-full items-center justify-center gap-1.5 rounded-full border border-foreground/20 bg-foreground/[0.04] px-2.5 py-1.5 text-[10px] font-semibold leading-tight text-foreground transition-colors hover:bg-foreground/[0.08] md:mt-4 md:gap-2 md:px-4 md:py-2 md:text-xs"
              >
                Let&apos;s build yours
                <ArrowRight className="relative z-[1] h-3.5 w-3.5 animate-arrow-nudge" aria-hidden />
              </a>
          </div>
        </div>
      </div>
    </footer>
  );
});

import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SiteLogo } from "@/components/SiteLogo";
import { business } from "@/lib/business";

const builderWhatsAppHref = `https://api.whatsapp.com/send?phone=447831798112&text=${encodeURIComponent(
  "Hey I was on The Cosy Chapter website and was interested in getting a website of my own...",
)}`;

const footerLinks = [
  { label: "The Shop", href: "/#story" },
  { label: "Books", href: "/#books" },
  { label: "Menu", href: "/menu", route: true as const },
  { label: "Visit", href: "/#visit" },
  { label: "Contact", href: "/#contact" },
] as const;

export function SiteFooter() {
  return (
    <footer className="sticky bottom-0 z-0 overflow-hidden bg-primary py-16 text-primary-foreground sm:py-20">
      <div className="container-tight overflow-hidden pb-0 pt-2">
        <div className="mb-10 flex flex-col gap-10 md:mb-14 lg:flex-row lg:items-start lg:gap-32 xl:gap-40">
          <ScrollReveal className="lg:max-w-sm lg:shrink-0">
            <Link to="/" hash="top" className="inline-block">
              <SiteLogo variant="onDark" className="h-14 sm:h-16" />
            </Link>
            <p className="eyebrow mt-4">{business.tagline}</p>
            <address className="mt-4 text-sm font-light not-italic leading-relaxed text-primary-foreground/75">
              {business.street}
              <br />
              {business.town}, {business.county}
              <br />
              {business.postcode}
            </address>
            <p className="mt-6 text-[0.65rem] uppercase tracking-[0.2em] text-primary-foreground/50">
              © {new Date().getFullYear()} {business.name} · {business.town}, Warwickshire
            </p>
          </ScrollReveal>

          <div className="flex min-w-0 flex-1 sm:justify-end">
            <div className="flex w-full flex-col gap-10 sm:w-[85%] sm:flex-row sm:items-start sm:justify-between sm:gap-0">
              <ScrollReveal delay={0.1} className="w-max max-w-full shrink-0">
                <h4 className="text-sm font-semibold tracking-wide text-primary-foreground">Explore</h4>
                <ul className="mt-4 w-max space-y-2 text-sm text-primary-foreground/75">
                  {footerLinks.map((link) => (
                    <li key={link.href}>
                      {"route" in link && link.route ? (
                        <Link to={link.href} className="transition-colors hover:text-brass">
                          {link.label}
                        </Link>
                      ) : (
                        <a href={link.href} className="transition-colors hover:text-brass">
                          {link.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </ScrollReveal>

              <ScrollReveal delay={0.2} className="w-max max-w-full shrink-0">
                <h4 className="text-sm font-semibold tracking-wide text-primary-foreground">Contact</h4>
                <ul className="mt-4 w-max space-y-2 text-sm text-primary-foreground/75">
                  <li>
                    <a href={business.phoneHref} className="transition-colors hover:text-brass">
                      {business.phoneDisplay}
                    </a>
                  </li>
                  <li>
                    <a
                      href={business.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-brass"
                    >
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a
                      href={business.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-brass"
                    >
                      Facebook
                    </a>
                  </li>
                </ul>
              </ScrollReveal>

              <ScrollReveal delay={0.4} className="w-max max-w-full shrink-0">
                <h4 className="text-sm font-semibold text-primary-foreground">Website by:</h4>
                <a
                  href="https://www.taylor-marriott.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 block transition-opacity hover:opacity-80"
                >
                  <img
                    src="/taylor-marriott-logo.png"
                    alt="Taylor-Marriott"
                    className="block h-12 w-auto bg-transparent md:h-14"
                  />
                </a>
                <a
                  href={builderWhatsAppHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center justify-center gap-2 rounded-full border border-primary-foreground/35 bg-primary-foreground/10 px-4 py-2 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/20"
                >
                  Claim Yours
                  <ArrowRight className="h-3.5 w-3.5 animate-arrow-nudge" aria-hidden />
                </a>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

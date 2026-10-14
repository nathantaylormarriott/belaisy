import { Link } from "@tanstack/react-router";
import { ArrowRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { SiteLogo } from "@/components/SiteLogo";
import { business } from "@/lib/business";
import { cn } from "@/lib/utils";

const links = [
  { label: "About", href: "/#story" },
  { label: "Services", href: "/#services" },
  { label: "Team", href: "/#team" },
  { label: "Treatments", href: "/menu", route: true as const },
  { label: "Policies", href: "/policies", route: true as const },
  { label: "Visit", href: "/#visit" },
] as const;

function NavLink({
  link,
  className,
  onNavigate,
}: {
  link: (typeof links)[number];
  className: string;
  onNavigate?: () => void;
}) {
  if ("route" in link && link.route) {
    return (
      <Link to={link.href} className={className} onClick={onNavigate}>
        {link.label}
      </Link>
    );
  }

  return (
    <a href={link.href} className={className} onClick={onNavigate}>
      {link.label}
    </a>
  );
}

export function SiteNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const linkClass =
    "text-[0.9375rem] font-medium text-[oklch(0.4_0.04_325)] transition-colors hover:text-primary";

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
        <div
          className={cn(
            "container-tight nav-glass flex items-center justify-between gap-4 rounded-full px-5 py-3 transition-shadow duration-300 sm:px-6",
            scrolled && "shadow-[var(--shadow-card)]",
          )}
        >
          <a href="/#top" onClick={closeMenu}>
            <SiteLogo showTagline={false} className="nav-mauve-logo scale-90 sm:scale-100" />
          </a>

          <nav className="hidden items-center gap-7 lg:flex">
            {links.map((link) => (
              <NavLink key={link.href} link={link} className={linkClass} />
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <a
              href={business.phoneHref}
              className="book-now-cta inline-flex items-center justify-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-medium sm:gap-2 sm:px-5 sm:py-2.5 sm:text-sm"
              aria-label="Book now"
            >
              <span className="relative z-[1]">Book now</span>
              <ArrowRight
                className="relative z-[1] h-3.5 w-3.5 book-now-arrow-nudge sm:h-4 sm:w-4"
                aria-hidden
              />
            </a>

            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-foreground transition-colors hover:border-primary/30 hover:text-primary lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-site-nav"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X className="h-4 w-4" aria-hidden /> : <Menu className="h-4 w-4" aria-hidden />}
            </button>
          </div>
        </div>
      </header>

      {menuOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-foreground/10 backdrop-blur-sm lg:hidden"
          aria-label="Close menu"
          onClick={closeMenu}
        />
      ) : null}

      <div
        id="mobile-site-nav"
        className={cn(
          "fixed inset-x-4 top-[5.5rem] z-50 overflow-hidden rounded-3xl border border-border bg-white shadow-[var(--shadow-soft)] transition-all duration-300 lg:hidden",
          menuOpen ? "visible opacity-100" : "pointer-events-none invisible opacity-0",
        )}
        aria-hidden={!menuOpen}
      >
        <nav className="flex flex-col p-2">
          {links.map((link) => (
            <NavLink
              key={link.href}
              link={link}
              className="rounded-2xl px-4 py-3.5 text-base font-medium text-[oklch(0.4_0.04_325)] transition-colors hover:bg-blush"
              onNavigate={closeMenu}
            />
          ))}
        </nav>
      </div>
    </>
  );
}

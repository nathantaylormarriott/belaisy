import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { SiteLogo } from "@/components/SiteLogo";
import { NightToggle } from "@/components/NightToggle";
import { business } from "@/lib/business";
import { cn } from "@/lib/utils";

const links = [
  { label: "The Shop", href: "/#story" },
  { label: "Books", href: "/#books" },
  { label: "Menu", href: "/menu", route: true as const },
  { label: "Visit", href: "/#visit" },
] as const;

const navLinkClass =
  "relative text-xs uppercase tracking-[0.22em] text-primary-foreground/80 transition-colors hover:text-brass after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-brass after:transition-transform after:duration-500 hover:after:origin-left hover:after:scale-x-100";

const mobileNavLinkClass =
  "block border-b border-primary-foreground/10 py-4 text-sm uppercase tracking-[0.22em] text-primary-foreground transition-colors hover:text-brass";

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

function ShareIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4" />
    </svg>
  );
}

export function SiteNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-primary py-4 shadow-[var(--shadow-soft)]">
      <div className="container-tight grid grid-cols-[auto_1fr_auto] items-center gap-3 sm:gap-4 lg:grid-cols-[1fr_auto_1fr] lg:gap-6">
        <a href="/#top" className="group shrink-0 justify-self-start" onClick={closeMenu}>
          <SiteLogo variant="onDark" />
        </a>

        <nav className="hidden min-w-0 items-center justify-center gap-9 justify-self-center lg:flex">
          {links.map((link) => (
            <NavLink key={link.href} link={link} className={navLinkClass} />
          ))}
        </nav>

        <div className="flex shrink-0 items-center justify-self-end gap-2 sm:gap-3">
          <a
            href={business.phoneHref}
            className="btn-classic border border-brass/70 px-4 py-2.5 text-brass transition-colors duration-500 hover:bg-brass hover:text-primary sm:px-5"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            Call
          </a>

          <Link
            to="/share"
            className="btn-classic hidden bg-brass px-4 py-2.5 text-primary-foreground transition-colors duration-500 hover:bg-primary-foreground hover:text-primary sm:px-5 lg:inline-flex"
          >
            <ShareIcon />
            <span className="hidden sm:inline">Share</span>
          </Link>

          <NightToggle className="inline-flex" />

          <button
            type="button"
            className="btn-classic border border-brass/70 px-4 py-2.5 text-brass transition-colors duration-500 hover:bg-brass hover:text-primary sm:px-5 lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-site-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X className="h-3.5 w-3.5" aria-hidden /> : <Menu className="h-3.5 w-3.5" aria-hidden />}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <button
          type="button"
          className="fixed inset-0 top-[4.75rem] z-40 bg-ink/40 lg:hidden"
          aria-label="Close menu"
          onClick={closeMenu}
        />
      ) : null}

      <div
        id="mobile-site-nav"
        className={cn(
          "fixed inset-x-0 top-[4.75rem] z-50 border-t border-primary-foreground/10 bg-primary shadow-[var(--shadow-soft)] transition-all duration-300 lg:hidden",
          menuOpen ? "visible opacity-100" : "pointer-events-none invisible opacity-0",
        )}
        aria-hidden={!menuOpen}
      >
        <nav className="container-tight flex max-h-[calc(100dvh-4.75rem)] flex-col py-2">
          <div className="flex-1 overflow-y-auto">
            {links.map((link) => (
              <NavLink
                key={link.href}
                link={link}
                className={mobileNavLinkClass}
                onNavigate={closeMenu}
              />
            ))}
          </div>

          <div className="space-y-3 border-t border-primary-foreground/10 py-4">
            <Link
              to="/share"
              className="btn-classic flex w-full justify-center gap-2 bg-brass py-3 text-primary-foreground transition-colors duration-500 hover:bg-primary-foreground hover:text-primary"
              onClick={closeMenu}
            >
              <ShareIcon />
              Share
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

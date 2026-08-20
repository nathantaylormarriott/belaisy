import { Link } from "@tanstack/react-router";
import { SiteLogo } from "@/components/SiteLogo";
import { business } from "@/lib/business";

const links = [
  { label: "The Shop", href: "/#story" },
  { label: "Books", href: "/#books" },
  { label: "Menu", href: "/menu", route: true as const },
  { label: "Visit", href: "/#visit" },
];

export function SiteNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-primary py-4 shadow-[var(--shadow-soft)]">
      <div className="container-tight grid grid-cols-[1fr_auto_1fr] items-center gap-4 sm:gap-6">
        <a href="/#top" className="group shrink-0 justify-self-start">
          <SiteLogo variant="onDark" />
        </a>

        <nav className="hidden items-center justify-center gap-9 lg:flex">
          {links.map((l) =>
            "route" in l && l.route ? (
              <Link
                key={l.href}
                to={l.href}
                className="relative text-xs uppercase tracking-[0.22em] text-primary-foreground/80 transition-colors hover:text-brass after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-brass after:transition-transform after:duration-500 hover:after:origin-left hover:after:scale-x-100"
              >
                {l.label}
              </Link>
            ) : (
              <a
                key={l.href}
                href={l.href}
                className="relative text-xs uppercase tracking-[0.22em] text-primary-foreground/80 transition-colors hover:text-brass after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-brass after:transition-transform after:duration-500 hover:after:origin-left hover:after:scale-x-100"
              >
                {l.label}
              </a>
            ),
          )}
        </nav>

        <div className="flex items-center justify-self-end gap-2 sm:gap-3">
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
            className="btn-classic bg-brass px-4 py-2.5 text-primary-foreground transition-colors duration-500 hover:bg-primary-foreground hover:text-primary sm:px-5"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4" />
            </svg>
            <span className="hidden sm:inline">Share</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

import { useEffect, useState } from "react";
import { business } from "@/lib/business";

const links = [
  { label: "The Shop", href: "#story" },
  { label: "Books", href: "#books" },
  { label: "Kitchen & Bar", href: "#kitchen" },
  { label: "Visit", href: "#visit" },
];

export function SiteNav() {
  const [solid, setSolid] = useState(false);
  const [shared, setShared] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onShare = async () => {
    const data = {
      title: business.name,
      text: `${business.name} — ${business.tagline}, ${business.town}`,
      url: typeof window !== "undefined" ? window.location.href : "",
    };
    try {
      if (navigator.share) await navigator.share(data);
      else {
        await navigator.clipboard.writeText(data.url);
        setShared(true);
        setTimeout(() => setShared(false), 2200);
      }
    } catch {
      /* dismissed */
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
        solid
          ? "bg-primary/95 backdrop-blur-md py-3 shadow-[var(--shadow-soft)]"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container-tight flex items-center justify-between gap-6">
        <a href="#top" className="group flex flex-col leading-none">
          <span className="font-display text-xl text-primary-foreground sm:text-2xl">
            The Cosy Chapter
          </span>
          <span className="eyebrow mt-1 hidden sm:block">Vol. 1 · Atherstone</span>
        </a>

        <nav className="hidden items-center gap-9 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative text-xs uppercase tracking-[0.22em] text-primary-foreground/80 transition-colors hover:text-brass after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-brass after:transition-transform after:duration-500 hover:after:origin-left hover:after:scale-x-100"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={onShare}
          className="inline-flex items-center gap-2 border border-brass/70 px-5 py-2.5 text-[0.7rem] uppercase tracking-[0.22em] text-brass transition-colors duration-500 hover:bg-brass hover:text-primary"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4" />
          </svg>
          {shared ? "Link copied" : "Share"}
        </button>
      </div>
    </header>
  );
}

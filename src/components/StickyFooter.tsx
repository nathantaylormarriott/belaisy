import { useEffect, useState } from "react";

export function StickyFooter() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const nearEnd =
        window.scrollY + window.innerHeight > document.body.scrollHeight - 260;
      setShown(nearEnd && window.scrollY > 400);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 transition-all duration-700 ${
        shown ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
    >
      <div className="border-t border-brass/25 bg-primary/95 backdrop-blur-md">
        <div className="container-tight flex flex-wrap items-center justify-between gap-3 py-3.5">
          <p className="text-[0.7rem] uppercase tracking-[0.22em] text-primary-foreground/75">
            Website by: <span className="text-brass">Taylor-Marriott</span>
          </p>
          <a
            href="https://wa.me/447831798112?text=Hi%20Taylor-Marriott%2C%20I%27d%20like%20a%20website%20like%20The%20Cosy%20Chapter."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-brass/60 px-4 py-2 text-[0.65rem] uppercase tracking-[0.2em] text-brass transition-colors duration-500 hover:bg-brass hover:text-primary"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.5 14.4c-.3-.2-1.7-.9-2-1s-.5-.1-.7.2-.8 1-.9 1.1-.4.2-.7 0a8.2 8.2 0 0 1-2.4-1.5 9 9 0 0 1-1.7-2.1c-.2-.3 0-.5.1-.6l.5-.6.3-.5v-.5l-.9-2.2c-.3-.6-.5-.5-.7-.5h-.6a1.2 1.2 0 0 0-.8.4A3.4 3.4 0 0 0 6 9c0 1.5 1.1 3 1.2 3.2a12 12 0 0 0 4.7 4.1 12 12 0 0 0 1.6.6 3.8 3.8 0 0 0 1.7.1 2.8 2.8 0 0 0 1.9-1.3 2.3 2.3 0 0 0 .2-1.3zM12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2m0 1.8a8.2 8.2 0 0 1 6.6 13 8.2 8.2 0 0 1-10.8 1.9l-.4-.2-3 .8.8-3-.2-.4A8.2 8.2 0 0 1 12 3.8" />
            </svg>
            Get yours today · +44 7831 798112
          </a>
        </div>
      </div>
    </div>
  );
}

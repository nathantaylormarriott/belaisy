import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type ComponentType, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  ChevronDown,
  Globe,
  Mail,
  MapPin,
  Phone,
  Send,
  Star,
} from "lucide-react";
import { mobileHero } from "@/assets";
import { SiteLogo } from "@/components/SiteLogo";
import { business, fullAddress } from "@/lib/business";
import {
  NETLIFY_FORM_ENDPOINT,
  NETLIFY_FORM_NAME,
  submitNetlifyForm,
} from "@/lib/netlify-form";
import { getRequestOrigin } from "@/lib/origin.functions";
import { SHARE_PAGE_META } from "@/lib/sharePageMeta";
import { cn } from "@/lib/utils";

const SHARE_CARD_CLASS = "relative isolate overflow-hidden text-primary-foreground";

const SHARE_CARD_OVERLAY =
  "linear-gradient(to bottom, oklch(0.18 0.05 231 / 0.34) 0%, oklch(0.17 0.05 231 / 0.22) 42%, oklch(0.16 0.05 231 / 0.5) 100%)";

const SHARE_TAB_CLASS =
  "group flex w-full min-h-[3.25rem] items-center rounded-xl border border-paper/35 bg-paper/95 px-5 py-3 text-base font-medium text-ink shadow-[0_2px_10px_rgba(0,0,0,0.16)] transition-colors hover:bg-[oklch(0.975_0.012_84)] focus:outline-none focus-visible:ring-2 focus-visible:ring-brass/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent active:scale-[0.99]";

const SHARE_TAB_ICON_CLASS = "h-5 w-5 shrink-0 text-primary";

const SHARE_FIELD_CLASS =
  "h-11 w-full rounded-xl border border-ink/10 bg-[oklch(0.975_0.012_84)]/75 px-4 text-base text-ink placeholder:text-ink/45 transition-colors focus:border-primary/30 focus:outline-none focus:ring-2 focus:ring-brass/40";

const SHARE_INSET_PANEL_CLASS =
  "overflow-hidden rounded-xl border border-paper/35 bg-paper/95 shadow-[0_2px_10px_rgba(0,0,0,0.16)]";

const morphTransition = { duration: 0.38, ease: [0.25, 0.1, 0.25, 1] as const };

const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${business.name}, ${fullAddress}`)}`;

function ShareTabAnimatedArrow() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <ArrowRight className="h-5 w-5 shrink-0 text-primary/75" strokeWidth={2.5} aria-hidden />;
  }

  return (
    <motion.span
      aria-hidden
      className="flex shrink-0 items-center"
      animate={{ x: [0, 5, 0] }}
      transition={{ duration: 1.15, repeat: Infinity, ease: "easeInOut" }}
    >
      <ArrowRight className="h-5 w-5 shrink-0 text-primary/75" strokeWidth={2.5} />
    </motion.span>
  );
}

function ShareTabContent({
  label,
  icon: Icon,
  trailing,
}: {
  label: string;
  icon?: ComponentType<{ className?: string; strokeWidth?: number }>;
  trailing?: ReactNode;
}) {
  return (
    <div className="relative flex w-full items-center self-stretch">
      <span className="relative z-10 flex shrink-0 items-center">
        {Icon ? (
          <Icon className={SHARE_TAB_ICON_CLASS} strokeWidth={2.5} aria-hidden />
        ) : (
          <span className={SHARE_TAB_ICON_CLASS} aria-hidden />
        )}
      </span>
      <span className="pointer-events-none absolute inset-0 flex items-center justify-center px-10 text-center font-sans leading-snug tabular-nums">
        {label}
      </span>
      <span className="relative z-10 ml-auto flex shrink-0 items-center">
        {trailing ?? <span className="h-5 w-5 shrink-0" aria-hidden />}
      </span>
    </div>
  );
}

type ShareLink = {
  label: string;
  href: string;
  external?: boolean;
  animatedArrow?: boolean;
  icon?: ComponentType<{ className?: string; strokeWidth?: number }>;
};

function ShareMorphPanel({ panelKey, children }: { panelKey: string; children: ReactNode }) {
  return (
    <motion.div
      key={panelKey}
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={morphTransition}
      className="overflow-hidden"
    >
      <div>{children}</div>
    </motion.div>
  );
}

function ShareLinkButton({ label, href, external, animatedArrow, icon: Icon }: ShareLink) {
  const trailing = animatedArrow ? <ShareTabAnimatedArrow /> : undefined;
  const content = <ShareTabContent label={label} icon={Icon} trailing={trailing} />;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={SHARE_TAB_CLASS}>
        {content}
      </a>
    );
  }

  if (href.startsWith("/")) {
    return (
      <Link to={href} className={SHARE_TAB_CLASS}>
        {content}
      </Link>
    );
  }

  return (
    <a href={href} className={SHARE_TAB_CLASS}>
      {content}
    </a>
  );
}

function ShareExpandButton({
  label,
  icon: Icon,
  expanded,
  onClick,
}: {
  label: string;
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
  expanded: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-expanded={expanded}
      onClick={onClick}
      className={cn(
        SHARE_TAB_CLASS,
        "rounded-none border-0 bg-transparent shadow-none hover:bg-[oklch(0.975_0.012_84)]/55",
      )}
    >
      <ShareTabContent
        label={label}
        icon={Icon}
        trailing={
          <ChevronDown
            className={cn(SHARE_TAB_ICON_CLASS, "transition-transform duration-300", expanded && "rotate-180")}
            strokeWidth={2.5}
            aria-hidden
          />
        }
      />
    </button>
  );
}

function ShareContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");
    try {
      await submitNetlifyForm(form);
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="border-t border-ink/10 px-5 py-4 text-center" role="status" aria-live="polite">
        <p className="text-sm font-medium text-ink">Thank you — we&apos;ll be in touch shortly.</p>
      </div>
    );
  }

  return (
    <form
      name={NETLIFY_FORM_NAME}
      action={NETLIFY_FORM_ENDPOINT}
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={onSubmit}
      className="space-y-2.5 border-t border-ink/10 px-5 pb-3 pt-2.5"
    >
      <input type="hidden" name="form-name" value={NETLIFY_FORM_NAME} />
      <input type="hidden" name="subject" value="Share page enquiry" />
      <p className="hidden" aria-hidden>
        <label>
          Leave this empty: <input name="bot-field" />
        </label>
      </p>

      <input
        name="name"
        type="text"
        autoComplete="name"
        placeholder="Your name"
        className={SHARE_FIELD_CLASS}
      />
      <input
        name="email"
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        required
        className={SHARE_FIELD_CLASS}
      />
      <textarea
        name="message"
        rows={3}
        placeholder="Tell us what you have in mind…"
        required
        className={cn(SHARE_FIELD_CLASS, "h-auto min-h-[5.5rem] resize-none py-3")}
      />

      {status === "error" && (
        <p className="text-sm text-oxblood">Something went wrong — please call {business.phoneDisplay}.</p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className={cn(SHARE_TAB_CLASS, "min-h-[2.75rem] w-full justify-center gap-2 px-5")}
      >
        <span>{status === "sending" ? "Sending…" : "Send message"}</span>
        <Send className="h-4 w-4 shrink-0 text-primary" strokeWidth={2} aria-hidden />
      </button>
    </form>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.3 2.2.4.6.2 1 .5 1.4.9s.7.8.9 1.4c.1.4.3 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.8-.4 2.2-.2.6-.5 1-.9 1.4s-.8.7-1.4.9c-.4.1-1 .3-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.3-2.2-.4-.6-.2-1-.5-1.4-.9s-.7-.8-.9-1.4c-.1-.4-.3-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.3-1.8.4-2.2.2-.6.5-1 .9-1.4s.8-.7 1.4-.9c.4-.1 1-.3 2.2-.4 1.3-.1 1.7-.1 4.8-.1m0 5.3a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9m0 7.4a2.9 2.9 0 1 1 0-5.8 2.9 2.9 0 0 1 0 5.8m5.7-7.6a1.1 1.1 0 1 1-2.1 0 1.1 1.1 0 0 1 2.1 0" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.7-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  { label: "Instagram", href: business.instagram, Icon: InstagramIcon },
  { label: "Facebook", href: business.facebook, Icon: FacebookIcon },
] as const;

export const Route = createFileRoute("/share")({
  loader: async () => ({ origin: await getRequestOrigin() }),
  head: ({ loaderData }) => {
    const ogImage = `${loaderData?.origin ?? ""}${mobileHero}`;
    return {
      meta: [
        { title: SHARE_PAGE_META.title },
        { name: "description", content: SHARE_PAGE_META.description },
        { property: "og:title", content: SHARE_PAGE_META.ogTitle },
        { property: "og:description", content: SHARE_PAGE_META.description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: SHARE_PAGE_META.ogUrl },
        { property: "og:image", content: ogImage },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: SHARE_PAGE_META.ogTitle },
        { name: "twitter:description", content: SHARE_PAGE_META.description },
        { name: "twitter:image", content: ogImage },
      ],
      links: [{ rel: "canonical", href: "/share" }],
    };
  },
  component: SharePage,
});

function SharePage() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div className="relative min-h-[100dvh] overflow-x-hidden bg-background font-sans antialiased">
      <main
        className={cn(
          "relative z-10 flex min-h-[100dvh] w-full flex-col",
          "md:mx-auto md:max-w-md md:px-6",
          "md:pb-[max(2rem,env(safe-area-inset-bottom))] md:pt-[max(1.5rem,env(safe-area-inset-top))]",
        )}
      >
        <div
          className={cn(
            SHARE_CARD_CLASS,
            "flex min-h-[100dvh] w-full flex-1 flex-col p-0",
            "md:min-h-0 md:rounded-3xl md:border md:border-primary-foreground/10 md:px-8 md:py-10",
            "md:shadow-[0_8px_32px_-12px_rgba(0,0,0,0.45)]",
          )}
        >
          <div className="pointer-events-none absolute inset-0 isolate" aria-hidden>
            <img src={mobileHero} alt="" className="h-full w-full object-cover object-center" />
            <div className="absolute inset-0" style={{ background: SHARE_CARD_OVERLAY }} />
          </div>

          <header className="relative z-10 flex flex-col items-center px-5 pt-[max(4.5rem,env(safe-area-inset-top))] text-center md:px-0 md:pt-10">
            <SiteLogo variant="onDark" className="h-16 sm:h-[4.5rem]" />
            <p className="mt-5 max-w-[20rem] text-sm font-medium leading-snug text-white sm:max-w-xs sm:text-[15px] sm:leading-relaxed">
              {business.heroTagline}
            </p>
            <nav className="mt-5 flex items-center justify-center gap-2" aria-label="Social links">
              {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full p-2 text-primary-foreground transition-colors hover:bg-primary-foreground/10 hover:text-brass"
                  aria-label={label}
                >
                  <Icon className="h-6 w-6" />
                </a>
              ))}
            </nav>
          </header>

          <nav
            className="relative z-10 mt-8 flex w-full flex-1 flex-col gap-2.5 px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:mt-10 sm:gap-3 md:px-0 md:pb-0"
            aria-label="Quick links"
          >
            <ShareLinkButton label="Visit the book bar" href="/" icon={Globe} animatedArrow />
            <ShareLinkButton label="View the menu" href="/menu" icon={BookOpen} />
            <ShareLinkButton label={`Call ${business.phoneDisplay}`} href={business.phoneHref} icon={Phone} />
            <ShareLinkButton label="Get directions" href={directionsUrl} external icon={MapPin} />
            <ShareLinkButton label="Browse the shelves" href="/#books" icon={BookOpen} />
            <ShareLinkButton label="Google reviews · 5.0" href={business.google} external icon={Star} />

            <div className={SHARE_INSET_PANEL_CLASS}>
              <ShareExpandButton
                label="Send a message"
                icon={Mail}
                expanded={contactOpen}
                onClick={() => setContactOpen((open) => !open)}
              />
              <AnimatePresence initial={false}>
                {contactOpen ? (
                  <ShareMorphPanel panelKey="contact">
                    <ShareContactForm />
                  </ShareMorphPanel>
                ) : null}
              </AnimatePresence>
            </div>
          </nav>
        </div>
      </main>
    </div>
  );
}

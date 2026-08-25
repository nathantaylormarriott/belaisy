import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type ComponentType, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  Globe,
  Mail,
  MapPin,
  Phone,
  Scissors,
  Send,
  Star,
  Users,
} from "lucide-react";
import { MeshBackdrop } from "@/components/MeshBackdrop";
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

const SHARE_TAB_CLASS =
  "group flex w-full min-h-[3.25rem] items-center rounded-2xl border border-border bg-white px-5 py-3.5 text-sm font-medium text-foreground shadow-[var(--shadow-card)] transition-all hover:border-primary/20 hover:shadow-[var(--shadow-soft)] active:scale-[0.99]";

const SHARE_FIELD_CLASS =
  "h-11 w-full rounded-xl border border-border bg-white px-4 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/10";

const morphTransition = { duration: 0.38, ease: [0.25, 0.1, 0.25, 1] as const };

const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${business.name}, ${fullAddress}`)}`;

function ShareTabAnimatedArrow() {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) {
    return <ArrowRight className="h-4 w-4 shrink-0 text-primary" strokeWidth={2.5} aria-hidden />;
  }
  return (
    <motion.span aria-hidden className="flex shrink-0 items-center" animate={{ x: [0, 4, 0] }} transition={{ duration: 1.15, repeat: Infinity, ease: "easeInOut" }}>
      <ArrowRight className="h-4 w-4 shrink-0 text-primary" strokeWidth={2.5} />
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
      <span className="relative z-10 flex shrink-0 items-center text-primary">
        {Icon ? <Icon className="h-4 w-4" strokeWidth={2.5} aria-hidden /> : null}
      </span>
      <span className="pointer-events-none absolute inset-0 flex items-center justify-center px-10 text-center leading-snug">
        {label}
      </span>
      <span className="relative z-10 ml-auto flex shrink-0 items-center">
        {trailing ?? <span className="h-4 w-4 shrink-0" aria-hidden />}
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

function ShareLinkButton({ label, href, external, animatedArrow, icon: Icon }: ShareLink) {
  const content = <ShareTabContent label={label} icon={Icon} trailing={animatedArrow ? <ShareTabAnimatedArrow /> : undefined} />;

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
      <div className="border-t border-border px-5 py-4 text-center" role="status" aria-live="polite">
        <p className="text-sm font-medium text-primary">Thank you — we&apos;ll be in touch shortly.</p>
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
      className="space-y-2.5 border-t border-border px-4 pb-4 pt-3"
    >
      <input type="hidden" name="form-name" value={NETLIFY_FORM_NAME} />
      <input type="hidden" name="subject" value="Share page enquiry" />
      <p className="hidden" aria-hidden>
        <label>Leave this empty: <input name="bot-field" /></label>
      </p>
      <input name="name" type="text" autoComplete="name" placeholder="Your name" className={SHARE_FIELD_CLASS} />
      <input name="email" type="email" autoComplete="email" placeholder="you@example.com" required className={SHARE_FIELD_CLASS} />
      <textarea name="message" rows={3} placeholder="Your message…" required className={cn(SHARE_FIELD_CLASS, "h-auto min-h-[5.5rem] resize-none py-3")} />
      {status === "error" && <p className="text-sm text-destructive">Something went wrong — please call {business.phoneDisplay}.</p>}
      <button type="submit" disabled={status === "sending"} className={cn(SHARE_TAB_CLASS, "min-h-[2.75rem] w-full justify-center gap-2 bg-primary text-primary-foreground hover:text-primary-foreground")}>
        <span>{status === "sending" ? "Sending…" : "Send message"}</span>
        <Send className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
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
    <div className="relative min-h-[100dvh] overflow-x-hidden font-sans antialiased">
      <MeshBackdrop />
      <main className="relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-md flex-col px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(1.5rem,env(safe-area-inset-top))] sm:px-6 md:py-8">
        <div className="card-soft flex flex-1 flex-col overflow-hidden p-6 sm:p-8">
          <header className="text-center">
            <SiteLogo className="mx-auto items-center" />
            <p className="mx-auto mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {business.tagline} — On Long Street, Atherstone
            </p>
            <nav className="mt-5 flex items-center justify-center gap-1" aria-label="Social links">
              {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full p-2.5 text-muted-foreground transition-colors hover:bg-blush hover:text-primary"
                  aria-label={label}
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </nav>
          </header>

          <nav className="mt-8 flex flex-1 flex-col gap-2.5" aria-label="Quick links">
            <ShareLinkButton label="Visit the salon" href="/" icon={Globe} animatedArrow />
            <ShareLinkButton label="View treatments" href="/menu" icon={Scissors} />
            <ShareLinkButton label={`Call ${business.phoneDisplay}`} href={business.phoneHref} icon={Phone} />
            <ShareLinkButton label="Get directions" href={directionsUrl} external icon={MapPin} />
            <ShareLinkButton label="Meet the team" href="/#team" icon={Users} />
            <ShareLinkButton label="Salon policies" href="/policies" icon={Scissors} />
            <ShareLinkButton label="Google reviews" href={business.google} external icon={Star} />

            <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-[var(--shadow-card)]">
              <button
                type="button"
                aria-expanded={contactOpen}
                onClick={() => setContactOpen((open) => !open)}
                className={cn(SHARE_TAB_CLASS, "rounded-none border-0 shadow-none")}
              >
                <ShareTabContent
                  label="Send a message"
                  icon={Mail}
                  trailing={
                    <ChevronDown className={cn("h-4 w-4 text-primary transition-transform", contactOpen && "rotate-180")} strokeWidth={2.5} aria-hidden />
                  }
                />
              </button>
              <AnimatePresence initial={false}>
                {contactOpen ? (
                  <motion.div
                    key="contact"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={morphTransition}
                    className="overflow-hidden"
                  >
                    <ShareContactForm />
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </nav>
        </div>
      </main>
    </div>
  );
}

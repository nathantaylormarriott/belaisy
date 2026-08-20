import { createFileRoute } from "@tanstack/react-router";
import { SmoothScroll } from "@/components/SmoothScroll";
import { SiteNav } from "@/components/SiteNav";
import { Hero } from "@/components/Hero";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/ContactForm";
import { StickyFooter } from "@/components/StickyFooter";
import { getRequestOrigin } from "@/lib/origin.functions";
import { business, fullAddress, reviews } from "@/lib/business";
import heroAsset from "@/assets/hero-shopfront.webp.asset.json";
import bookshelvesAsset from "@/assets/bookshelves.jpg.asset.json";
import wineTastingAsset from "@/assets/wine-tasting.jpg.asset.json";
import breakfastAsset from "@/assets/breakfast.jpg.asset.json";
import boardAsset from "@/assets/sharing-board.jpg.asset.json";
import martiniAsset from "@/assets/espresso-martini.jpg.asset.json";

const title = "The Cosy Chapter | Book Bar, Coffee & Wine in Atherstone";
const description =
  "A boutique book, coffee and wine bar on Long Street, Atherstone. Cosy reading corners, curated sharing boards, espresso martinis and shelves worth losing an afternoon in.";

export const Route = createFileRoute("/")({
  loader: async () => ({ origin: await getRequestOrigin() }),
  head: ({ loaderData }) => {
    const ogImage = `${loaderData?.origin ?? ""}${heroAsset.url}`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "business.business" },
        { property: "og:url", content: "/" },
        { property: "og:image", content: ogImage },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: ogImage },
      ],
      links: [{ rel: "canonical", href: "/" }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["CafeOrCoffeeShop", "BarOrPub", "BookStore"],
            name: business.name,
            description,
            image: ogImage,
            telephone: `+44 ${business.phoneDisplay.slice(1)}`,
            url: "/",
            address: {
              "@type": "PostalAddress",
              streetAddress: business.street,
              addressLocality: business.town,
              addressRegion: business.county,
              postalCode: business.postcode,
              addressCountry: business.country,
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: business.lat,
              longitude: business.lng,
            },
            servesCuisine: ["Coffee", "Wine", "Small plates"],
            priceRange: "££",
            sameAs: [business.facebook, business.instagram],
            areaServed: ["Atherstone", "Nuneaton", "Tamworth", "North Warwickshire"],
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "5",
              reviewCount: "4",
            },
            openingHoursSpecification: business.hours.map((h) => ({
              "@type": "OpeningHoursSpecification",
              dayOfWeek: h.schema[0],
              opens: h.schema[1],
              closes: h.schema[2],
            })),
          }),
        },
      ],
    };
  },
  component: Home,
});

const chapters = [
  {
    no: "I",
    title: "The Shelves",
    copy: "Wall-to-wall fiction, crime, romance and the odd coffee-table beauty — browse with a flat white in hand and leave with your next favourite.",
    image: bookshelvesAsset.url,
    alt: "Floor-to-ceiling bookshelves filled with fiction inside The Cosy Chapter",
  },
  {
    no: "II",
    title: "The Kitchen",
    copy: "Little breakfasts, warm pastries and generous sharing boards of charcuterie, cheese, hummus and chutney — made to linger over.",
    image: boardAsset.url,
    alt: "Sharing board with charcuterie, cheeses, olives, hummus and toasted bread by candlelight",
  },
  {
    no: "III",
    title: "The Bar",
    copy: "Small-producer wines by the glass, espresso martinis after dark and tasting evenings that turn strangers into a table of friends.",
    image: martiniAsset.url,
    alt: "Espresso martini on a dark wooden table with scattered coffee beans",
  },
];

function Home() {
  return (
    <div className="bg-background">
      <SmoothScroll />
      <SiteNav />
      <main>
        <Hero />

        {/* Marquee */}
        <section className="overflow-hidden border-y border-border bg-primary py-4">
          <div className="marquee-track flex w-max gap-12 whitespace-nowrap">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="flex gap-12">
                {["Books", "Coffee", "Wine", "Sharing boards", "Book club", "Tasting nights", "Cosy corners"].map(
                  (word) => (
                    <span
                      key={word}
                      className="text-[0.7rem] uppercase tracking-[0.34em] text-primary-foreground/70"
                    >
                      {word} <span className="text-brass">·</span>
                    </span>
                  ),
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Story */}
        <section id="story" className="py-24 sm:py-32">
          <div className="container-tight grid gap-14 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <p className="eyebrow">Chapter one</p>
              <h2 className="mt-5 text-4xl leading-tight sm:text-5xl">
                A bookshop that pours,
                <span className="block italic text-primary/70">a wine bar that reads.</span>
              </h2>
            </Reveal>
            <Reveal className="lg:col-span-6 lg:col-start-7" delay={120}>
              <p className="text-lg font-light leading-relaxed text-muted-foreground">
                Behind the deep teal shopfront on Long Street you'll find something Atherstone
                hasn't had before: a proper boutique book bar. Wing-back chairs and low lamps for
                the morning readers, copper-topped tables and candles for the evening crowd, and
                shelves that quietly invite you to stay one chapter longer.
              </p>
              <p className="mt-6 text-lg font-light leading-relaxed text-muted-foreground">
                Coffee is served from eight. Wine follows in the afternoon. In between there are
                pastries, boards, book clubs and tasting evenings — all under the same roof, all
                unhurried.
              </p>
              <div className="mt-10 grid grid-cols-3 gap-6 border-t border-border pt-8">
                {[
                  ["5.0", "Google rating"],
                  ["8am", "Coffee from"],
                  ["Vol. 1", "Long Street"],
                ].map(([big, small]) => (
                  <div key={small}>
                    <p className="font-display text-3xl text-primary">{big}</p>
                    <p className="mt-1 text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                      {small}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Chapters — sticky scroll cards */}
        <section id="books" className="bg-primary py-24 text-primary-foreground sm:py-32">
          <div className="container-tight">
            <Reveal className="max-w-2xl">
              <p className="eyebrow">What's inside</p>
              <h2 className="mt-5 text-4xl leading-tight sm:text-5xl">Three chapters, one room</h2>
            </Reveal>

            <div className="mt-16 space-y-8">
              {chapters.map((c, i) => (
                <Reveal
                  key={c.no}
                  className="sticky top-24 overflow-hidden border border-brass/20 bg-primary"
                  delay={i * 80}
                >
                  <div className="grid gap-0 md:grid-cols-2">
                    <div className="relative aspect-4/3 overflow-hidden md:aspect-auto md:min-h-[420px]">
                      <img
                        src={c.image}
                        alt={c.alt}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-[1600ms] hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-col justify-center gap-5 p-8 sm:p-12">
                      <span className="font-display text-5xl text-brass/60">{c.no}</span>
                      <h3 className="text-3xl sm:text-4xl">{c.title}</h3>
                      <div className="rule-brass w-24" />
                      <p className="text-base font-light leading-relaxed text-primary-foreground/75">
                        {c.copy}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Kitchen & bar gallery */}
        <section id="kitchen" className="py-24 sm:py-32">
          <div className="container-tight">
            <Reveal className="flex flex-wrap items-end justify-between gap-6">
              <div className="max-w-xl">
                <p className="eyebrow">Kitchen &amp; bar</p>
                <h2 className="mt-5 text-4xl leading-tight sm:text-5xl">
                  Little breakfasts, long evenings
                </h2>
              </div>
              <p className="max-w-sm text-sm font-light leading-relaxed text-muted-foreground">
                Everything is made for sharing — pastries and toast at the copper tables in the
                morning sun, boards and bottles once the lamps come on.
              </p>
            </Reveal>

            <div className="mt-14 grid gap-4 md:grid-cols-3">
              {[
                { src: breakfastAsset.url, alt: "Little breakfast of toast, pastries and coffee on a copper café table", span: "md:col-span-2 aspect-16/10" },
                { src: martiniAsset.url, alt: "Espresso martini served at the bar", span: "aspect-4/5" },
                { src: wineTastingAsset.url, alt: "Guests at a wine tasting evening in the bookshop's back room", span: "aspect-4/5" },
                { src: boardAsset.url, alt: "Charcuterie and cheese sharing board", span: "md:col-span-2 aspect-16/10" },
              ].map((img, i) => (
                <Reveal key={img.src} delay={i * 90} className={`overflow-hidden ${img.span}`}>
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1600ms] hover:scale-105"
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section className="border-y border-border bg-secondary py-24 sm:py-28">
          <div className="container-tight text-center">
            <Reveal>
              <p className="eyebrow">Guest book</p>
              <div className="mt-5 flex items-center justify-center gap-1.5 text-brass" aria-label="Rated 5.0 out of 5 on Google">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="m12 2 2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.3 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8z" />
                  </svg>
                ))}
              </div>
              <h2 className="mt-6 text-4xl leading-tight sm:text-5xl">
                Rated 5.0 by our readers
              </h2>
            </Reveal>

            {reviews.length > 0 ? (
              <Reveal delay={120}>
                <div className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4">
                  {reviews.map((r) => (
                    <figure
                      key={r.author}
                      className="min-w-[85%] snap-center border border-border bg-card p-8 text-left sm:min-w-[420px]"
                    >
                      <blockquote className="font-display text-xl italic leading-relaxed text-foreground">
                        “{r.quote}”
                      </blockquote>
                      <figcaption className="mt-5 text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                        {r.author} · {r.source}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </Reveal>
            ) : (
              <Reveal delay={120}>
                <p className="mx-auto mt-6 max-w-lg text-base font-light leading-relaxed text-muted-foreground">
                  Every review left on our Google Business Profile so far is a five-star one.
                  Read them for yourself — or add your own after your visit.
                </p>
              </Reveal>
            )}

            <Reveal delay={200}>
              <a
                href={business.google}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 inline-flex items-center gap-3 border border-primary/30 px-7 py-3.5 text-[0.7rem] uppercase tracking-[0.24em] text-primary transition-colors duration-500 hover:bg-primary hover:text-primary-foreground"
              >
                Read our Google reviews
              </a>
            </Reveal>
          </div>
        </section>

        {/* Visit — NAP, hours, map */}
        <section id="visit" className="py-24 sm:py-32">
          <div className="container-tight grid gap-14 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <p className="eyebrow">Find us</p>
              <h2 className="mt-5 text-4xl leading-tight sm:text-5xl">Visit The Cosy Chapter</h2>

              <address className="mt-10 not-italic">
                <p className="font-display text-2xl text-primary">{business.name}</p>
                <p className="mt-2 text-base font-light text-muted-foreground">
                  {business.street}
                  <br />
                  {business.town}, {business.county}
                  <br />
                  {business.postcode}
                  <br />
                  United Kingdom
                </p>
                <p className="mt-4 text-base font-light">
                  <a
                    href={business.phoneHref}
                    className="underline decoration-brass underline-offset-4 transition-colors hover:text-brass"
                  >
                    {business.phoneDisplay}
                  </a>
                </p>
              </address>

              <dl className="mt-10 border-t border-border">
                {business.hours.map((h) => (
                  <div
                    key={h.day}
                    className="flex items-baseline justify-between border-b border-border py-3 text-sm font-light"
                  >
                    <dt className="uppercase tracking-[0.16em] text-muted-foreground text-[0.7rem]">
                      {h.day}
                    </dt>
                    <dd>
                      {h.open} – {h.close}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href={business.google}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-primary px-6 py-3 text-[0.7rem] uppercase tracking-[0.22em] text-primary-foreground transition-colors duration-500 hover:bg-brass hover:text-primary"
                >
                  Google Business Profile
                </a>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${business.name}, ${fullAddress}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-primary/30 px-6 py-3 text-[0.7rem] uppercase tracking-[0.22em] text-primary transition-colors duration-500 hover:bg-primary hover:text-primary-foreground"
                >
                  Get directions
                </a>
              </div>
            </Reveal>

            <Reveal className="lg:col-span-7" delay={140}>
              <div className="h-[420px] w-full overflow-hidden border border-border lg:h-full lg:min-h-[560px]">
                <iframe
                  title={`Map showing ${business.name}, ${fullAddress}`}
                  src={`https://www.google.com/maps?q=${encodeURIComponent(`${business.name}, ${fullAddress}`)}&output=embed`}
                  className="h-full w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="border-t border-border bg-secondary py-24 sm:py-32">
          <div className="container-tight grid gap-14 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <p className="eyebrow">Say hello</p>
              <h2 className="mt-5 text-4xl leading-tight sm:text-5xl">
                Book a table, or a whole chapter
              </h2>
              <p className="mt-6 text-base font-light leading-relaxed text-muted-foreground">
                Group bookings, private hire, book clubs and wine tasting evenings — tell us what
                you're planning and we'll make room for it.
              </p>
              <div className="mt-10 flex gap-3">
                <SocialLink href={business.instagram} label="Instagram">
                  <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.3 2.2.4.6.2 1 .5 1.4.9s.7.8.9 1.4c.1.4.3 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.8-.4 2.2-.2.6-.5 1-.9 1.4s-.8.7-1.4.9c-.4.1-1 .3-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.3-2.2-.4-.6-.2-1-.5-1.4-.9s-.7-.8-.9-1.4c-.1-.4-.3-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.3-1.8.4-2.2.2-.6.5-1 .9-1.4s.8-.7 1.4-.9c.4-.1 1-.3 2.2-.4 1.3-.1 1.7-.1 4.8-.1m0 5.3a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9m0 7.4a2.9 2.9 0 1 1 0-5.8 2.9 2.9 0 0 1 0 5.8m5.7-7.6a1.1 1.1 0 1 1-2.1 0 1.1 1.1 0 0 1 2.1 0" />
                </SocialLink>
                <SocialLink href={business.facebook} label="Facebook">
                  <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.7-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12" />
                </SocialLink>
              </div>
            </Reveal>
            <Reveal className="lg:col-span-6 lg:col-start-7" delay={140}>
              <ContactForm />
            </Reveal>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-primary py-16 text-primary-foreground">
          <div className="container-tight">
            <div className="flex flex-wrap items-start justify-between gap-10">
              <div>
                <p className="font-display text-2xl">{business.name}</p>
                <p className="eyebrow mt-2">{business.tagline}</p>
              </div>
              <div className="text-sm font-light leading-relaxed text-primary-foreground/75">
                {business.street}, {business.town},<br />
                {business.county} {business.postcode}
                <br />
                <a href={business.phoneHref} className="hover:text-brass">
                  {business.phoneDisplay}
                </a>
              </div>
              <div className="flex gap-3">
                <SocialLink href={business.instagram} label="Instagram" light>
                  <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.3 2.2.4.6.2 1 .5 1.4.9s.7.8.9 1.4c.1.4.3 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.8-.4 2.2-.2.6-.5 1-.9 1.4s-.8.7-1.4.9c-.4.1-1 .3-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.3-2.2-.4-.6-.2-1-.5-1.4-.9s-.7-.8-.9-1.4c-.1-.4-.3-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.3-1.8.4-2.2.2-.6.5-1 .9-1.4s.8-.7 1.4-.9c.4-.1 1-.3 2.2-.4 1.3-.1 1.7-.1 4.8-.1m0 5.3a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9m0 7.4a2.9 2.9 0 1 1 0-5.8 2.9 2.9 0 0 1 0 5.8m5.7-7.6a1.1 1.1 0 1 1-2.1 0 1.1 1.1 0 0 1 2.1 0" />
                </SocialLink>
                <SocialLink href={business.facebook} label="Facebook" light>
                  <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.7-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12" />
                </SocialLink>
              </div>
            </div>
            <div className="rule-brass mt-12 opacity-40" />
            <p className="mt-6 text-[0.65rem] uppercase tracking-[0.2em] text-primary-foreground/50">
              © {new Date().getFullYear()} {business.name} · {business.town}, Warwickshire
            </p>
          </div>
        </footer>
      </main>
      <StickyFooter />
    </div>
  );
}

function SocialLink({
  href,
  label,
  children,
  light = false,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`inline-flex h-11 w-11 items-center justify-center border transition-colors duration-500 ${
        light
          ? "border-brass/40 text-brass hover:bg-brass hover:text-primary"
          : "border-primary/25 text-primary hover:bg-primary hover:text-primary-foreground"
      }`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        {children}
      </svg>
    </a>
  );
}

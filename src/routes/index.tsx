import { createFileRoute, Link } from "@tanstack/react-router";
import { SmoothScroll } from "@/components/SmoothScroll";
import { SiteNav } from "@/components/SiteNav";
import { Hero } from "@/components/Hero";
import { MeshBackdrop } from "@/components/MeshBackdrop";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/ContactForm";
import { ReviewsCarousel } from "@/components/ReviewsCarousel";
import { GoogleMapEmbed } from "@/components/GoogleMapEmbed";
import { SiteRevealPage } from "@/components/SiteRevealPage";
import { ServicesBentoGrid } from "@/components/ServicesBentoGrid";
import { TeamScrollRail } from "@/components/TeamScrollRail";
import { getRequestOrigin } from "@/lib/origin.functions";
import { fetchGoogleReviews } from "@/lib/google-reviews.functions";
import { business, fullAddress } from "@/lib/business";
import {
  heroShopfront,
  salonInterior,
  beautyTreatment,
  hairColour,
} from "@/assets";
import { teamMembers } from "@/data/team";
import { homeTreatmentPreview } from "@/data/treatments";

const title = "Belaisy Hair | Hair and Beauty Lounge in Atherstone";
const description =
  "Belaisy Hair and Beauty Lounge on Long Street, Atherstone. Expert cuts, colour, treatments, nails and more in a relaxed salon setting.";

export const Route = createFileRoute("/")({
  loader: async () => {
    const [origin, reviews] = await Promise.all([getRequestOrigin(), fetchGoogleReviews()]);
    return { origin, reviews };
  },
  head: ({ loaderData }) => {
    const ogImage = `${loaderData?.origin ?? ""}${heroShopfront}`;
    const reviews = loaderData?.reviews ?? [];
    const reviewCount = reviews.length > 0 ? String(reviews.length) : undefined;
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
            "@type": ["HairSalon", "BeautySalon"],
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
            priceRange: "££",
            sameAs: [business.facebook, business.instagram],
            areaServed: ["Atherstone", "Nuneaton", "Tamworth", "North Warwickshire"],
            ...(reviewCount
              ? {
                  aggregateRating: {
                    "@type": "AggregateRating",
                    ratingValue: "5",
                    reviewCount,
                  },
                }
              : {}),
            ...(reviews.length > 0
              ? {
                  review: reviews.map((r) => ({
                    "@type": "Review",
                    reviewRating: {
                      "@type": "Rating",
                      ratingValue: String(r.rating),
                      bestRating: "5",
                    },
                    author: { "@type": "Person", name: r.author },
                    reviewBody: r.quote,
                  })),
                }
              : {}),
            openingHoursSpecification: business.hours
              .filter((h) => h.open !== "Closed")
              .map((h) => ({
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

function Home() {
  const { reviews } = Route.useLoaderData();

  return (
    <div>
      <SmoothScroll />
      <SiteNav />
      <SiteRevealPage>
        <Hero />

        <div className="relative">
          <MeshBackdrop />
          <main className="relative">

        <section id="story" className="py-20 sm:py-28">
          <div className="container-tight grid gap-14 lg:grid-cols-2 lg:items-start lg:gap-20">
            <div>
              <Reveal>
                <h2 className="text-4xl sm:text-5xl">
                  A lighter way to feel looked after
                </h2>
              </Reveal>
              <Reveal delay={100}>
                <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
                  <p>
                    Belaisy Hair and Beauty Lounge is a welcoming salon on Long Street,
                    Atherstone — somewhere to switch off, feel cared for, and leave
                    feeling like the best version of yourself.
                  </p>
                  <p>
                    From precision cuts and colour to nails, aesthetics and wellness,
                    our team of talented stylists and independent professionals make
                    every visit feel unhurried and personal.
                  </p>
                </div>
              </Reveal>
            </div>

            <Reveal delay={120}>
              <div id="contact">
                <p className="section-label">Get in touch</p>
                <h3 className="mt-4 font-display text-2xl sm:text-3xl">Book your appointment</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Call, message or DM us on Instagram — we&apos;ll find a time that works.
                </p>
                <div className="mt-6">
                  <ContactForm />
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="services" className="py-20 sm:py-28">
          <div className="container-tight">
            <Reveal className="mx-auto max-w-2xl text-center">
              <p className="section-label justify-center">What we offer</p>
              <h2 className="mt-5 text-4xl sm:text-5xl">Hair, beauty and beyond</h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Salon cuts and colour, Leah&apos;s extensions, Amber&apos;s nails, permanent jewellery,
                massage and medical aesthetics — tap a tile to view prices.
              </p>
            </Reveal>

            <ServicesBentoGrid items={homeTreatmentPreview} />
          </div>
        </section>

        <section id="team" className="pb-8 pt-12 sm:pb-10 sm:pt-16">
          <TeamScrollRail members={teamMembers} />
        </section>

        <section id="gallery" className="py-20 sm:py-28">
          <div className="container-tight">
            <Reveal className="flex flex-wrap items-end justify-between gap-6">
              <div className="max-w-lg">
                <h2 className="text-4xl sm:text-5xl">Step inside, bright calm and welcoming</h2>
              </div>
            <Link to="/menu" className="btn-ghost">
              View treatments
            </Link>
            </Reveal>

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-12">
              <Reveal className="content-image lg:col-span-7 lg:row-span-2">
                <img
                  src={salonInterior}
                  alt="Bright, welcoming salon interior at Belaisy Hair"
                  loading="lazy"
                  className="aspect-[4/3] h-full w-full object-cover lg:aspect-auto lg:min-h-full"
                />
              </Reveal>
              <Reveal delay={60} className="content-image lg:col-span-5">
                <img src={hairColour} alt="Hair colour being applied" loading="lazy" className="aspect-[4/3] h-full w-full object-cover" />
              </Reveal>
              <Reveal delay={120} className="content-image lg:col-span-5">
                <img src={beautyTreatment} alt="Beauty treatment in a relaxed setting" loading="lazy" className="aspect-[4/3] h-full w-full object-cover" />
              </Reveal>
            </div>
          </div>
        </section>

        <section className="overflow-hidden py-20 sm:py-24">
          <div className="container-tight text-center">
            <Reveal>
              {reviews.length > 0 ? (
                <>
                  <div className="mt-4 flex items-center justify-center gap-1 text-accent" aria-label="Rated 5 out of 5 on Google">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="m12 2 2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.3 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8z" />
                      </svg>
                    ))}
                  </div>
                  <h2 className="mt-5 text-4xl sm:text-5xl">What our clients say</h2>
                </>
              ) : (
                <>
                  <h2 className="mt-5 text-4xl sm:text-5xl">Loved by our clients</h2>
                  <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
                    Follow{" "}
                    <a href={business.instagram} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      @belaisylounge
                    </a>{" "}
                    for the latest work, or leave us a Google review after your visit.
                  </p>
                </>
              )}
            </Reveal>
          </div>
          {reviews.length > 0 ? <ReviewsCarousel reviews={reviews} /> : null}
        </section>

        <section id="visit" className="py-20 sm:py-28">
          <div className="container-tight">
            <Reveal>
              <p className="section-label">Find us</p>
              <h2 className="mt-5 text-4xl sm:text-5xl">Visit Belaisy</h2>
            </Reveal>

            <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:items-stretch lg:gap-10 [&>*]:h-full">
              <Reveal className="h-full min-h-[360px] sm:min-h-[420px]">
                <div className="card-soft h-full p-6 sm:p-8">
                <p className="font-display text-xl text-foreground">{business.name}</p>
                <address className="mt-3 not-italic text-sm leading-relaxed text-muted-foreground">
                  {business.street}
                  <br />
                  {business.town}, {business.county}
                  <br />
                  {business.postcode}
                </address>

                <dl className="mt-6 space-y-2">
                  {business.hours.map((h) => (
                    <div key={h.day} className="flex justify-between gap-4 text-sm">
                      <dt className="text-muted-foreground">{h.day}</dt>
                      <dd className="font-medium text-foreground">
                        {h.open === "Closed" ? "Closed" : `${h.open} – ${h.close}`}
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${business.name}, ${fullAddress}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost"
                  >
                    Get directions
                  </a>
                  <a href={business.phoneHref} className="btn-primary">
                    Call to book
                  </a>
                </div>
                </div>
              </Reveal>

              <Reveal delay={100} className="h-full min-h-[360px] sm:min-h-[420px]">
                <div className="card-soft h-full overflow-hidden p-0">
                  <GoogleMapEmbed className="h-full min-h-[360px] w-full rounded-none border-0 sm:min-h-[420px]" />
                </div>
              </Reveal>
            </div>
          </div>
        </section>
          </main>
        </div>
      </SiteRevealPage>
    </div>
  );
}

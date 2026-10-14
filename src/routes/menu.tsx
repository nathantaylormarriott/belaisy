import { createFileRoute, Link } from "@tanstack/react-router";
import { SmoothScroll } from "@/components/SmoothScroll";
import { SiteNav } from "@/components/SiteNav";
import { MeshBackdrop } from "@/components/MeshBackdrop";
import { Reveal } from "@/components/Reveal";
import { SiteRevealPage } from "@/components/SiteRevealPage";
import { business } from "@/lib/business";
import {
  treatmentChapters,
  treatmentOverview,
  treatmentServiceNotes,
  type TreatmentItem,
} from "@/data/treatments";

const title = "Treatments and Price List | Belaisy Hair - Atherstone";
const description =
  "Full price list for hair, colour, nails, permanent jewellery, massage and aesthetics at Belaisy Hair and Beauty Lounge, Long Street, Atherstone.";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/menu" },
    ],
    links: [{ rel: "canonical", href: "/menu" }],
  }),
  component: TreatmentsPage,
});

function TreatmentsPage() {
  return (
    <div className="relative min-h-screen">
      <SmoothScroll />
      <SiteNav />
      <SiteRevealPage>
        <MeshBackdrop />
        <main className="relative pt-28 sm:pt-32">
        {/* Header */}
        <section className="pb-10 sm:pb-14">
          <div className="container-tight max-w-3xl text-center">
            <Reveal>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl">Price list</h1>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
                Belaisy Lounge brings together independent hair, beauty and wellness
                professionals under one roof. Use the guide below to find your therapist,
                then scroll to their full price list.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <a href={business.phoneHref} className="btn-primary">
                  Call to book
                </a>
                <Link to="/" hash="contact" className="btn-ghost">
                  Enquire online
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* At-a-glance overview */}
        <section className="border-y border-border/60 bg-white/50 py-10 backdrop-blur-sm sm:py-12">
          <div className="container-tight">
            <Reveal>
              <h2 className="text-center font-display text-2xl sm:text-3xl">Find your treatment</h2>
              <p className="mx-auto mt-3 max-w-xl text-center text-sm text-muted-foreground">
                Tap a category to jump straight to that price list.
              </p>
            </Reveal>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {treatmentOverview.map((item, i) => (
                <Reveal key={item.href} delay={i * 40}>
                  <a
                    href={item.href}
                    className="card-soft group flex flex-col gap-1 p-4 transition-colors hover:border-primary/25"
                  >
                    <span className="font-medium text-foreground group-hover:text-primary">{item.label}</span>
                    <span className="text-xs text-muted-foreground">{item.description}</span>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Sticky jump nav */}
        <nav
          className="sticky top-[5.5rem] z-40 border-b border-border/80 bg-white/85 backdrop-blur-md"
          aria-label="Treatment sections"
        >
          <div className="container-tight flex gap-2 overflow-x-auto py-3">
            {treatmentChapters.map((chapter) => (
              <a
                key={chapter.id}
                href={`#${chapter.id}`}
                className="shrink-0 rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary"
              >
                {chapter.label}
              </a>
            ))}
          </div>
        </nav>

        {/* Chapters */}
        {treatmentChapters.map((chapter, chapterIndex) => (
          <section
            key={chapter.id}
            id={chapter.id}
            className={`scroll-mt-36 py-14 sm:py-18 ${chapterIndex % 2 === 1 ? "bg-white/40" : ""}`}
          >
            <div className="container-tight">
              <Reveal className="max-w-3xl">
                <div className="inline-flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-blush px-3 py-1 text-xs font-medium text-primary">
                    {chapter.provider}
                  </span>
                  {chapter.providerRole ? (
                    <span className="text-xs text-muted-foreground">{chapter.providerRole}</span>
                  ) : null}
                </div>
                <h2 className="mt-4 text-3xl sm:text-4xl">{chapter.title}</h2>
                {chapter.intro ? (
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{chapter.intro}</p>
                ) : null}
                {chapter.availability ? (
                  <p className="mt-2 text-sm font-medium text-primary">{chapter.availability}</p>
                ) : null}
                {chapter.contact ? (
                  <p className="mt-2 text-sm text-muted-foreground">
                    Book direct:{" "}
                    <a
                      href={chapter.contactHref ?? `tel:${chapter.contact.replace(/\s/g, "")}`}
                      className="font-medium text-primary hover:underline"
                    >
                      {chapter.contact}
                    </a>
                  </p>
                ) : null}
              </Reveal>

              <div className="mt-10 grid items-start gap-5 lg:grid-cols-2">
                {chapter.sections.map((section, sectionIndex) => (
                  <Reveal key={section.id} delay={sectionIndex * 50}>
                    <div className="card-soft h-full p-6 sm:p-7">
                      <h3 className="font-display text-xl text-foreground sm:text-2xl">{section.title}</h3>
                      {section.subtitle ? (
                        <p className="mt-1 text-xs text-muted-foreground">{section.subtitle}</p>
                      ) : null}
                      {section.note ? (
                        <p className="mt-2 text-xs font-medium text-primary">{section.note}</p>
                      ) : null}
                      <ul className="mt-4 divide-y divide-border">
                        {section.items.map((item) => (
                          <TreatmentRow key={`${section.id}-${item.name}`} item={item} />
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                ))}
              </div>

              {chapter.footnotes && chapter.footnotes.length > 0 ? (
                <Reveal delay={120} className="mt-8 max-w-3xl">
                  <ul className="space-y-2 rounded-2xl border border-border/80 bg-white/60 px-5 py-4 text-xs leading-relaxed text-muted-foreground">
                    {chapter.footnotes.map((note) => (
                      <li key={note} className="flex gap-2">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
                        {note}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ) : null}
            </div>
          </section>
        ))}

        {/* Global notes */}
        <section className="border-t border-border/60 py-14 sm:py-18">
          <div className="container-tight max-w-2xl">
            <Reveal>
              <p className="section-label">Before you book</p>
              <ul className="mt-6 space-y-3 text-sm leading-relaxed text-muted-foreground">
                {treatmentServiceNotes.map((note) => (
                  <li key={note} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                    {note}
                  </li>
                ))}
              </ul>
              <p className="mt-8 font-display text-2xl text-primary">{business.tagline}</p>
              <p className="mt-4 text-sm text-muted-foreground">
                Please also read our{" "}
                <Link to="/policies" className="text-primary hover:underline">
                  salon policies
                </Link>{" "}
                for patch testing and cancellation information.
              </p>
              <p className="mt-4 text-sm text-muted-foreground">
                {business.street}, {business.town} {business.postcode} ·{" "}
                <a href={business.phoneHref} className="text-primary hover:underline">
                  {business.phoneDisplay}
                </a>
              </p>
            </Reveal>
          </div>
        </section>
        </main>
      </SiteRevealPage>
    </div>
  );
}

function TreatmentRow({ item }: { item: TreatmentItem }) {
  return (
    <li className="py-3.5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            <p className="text-sm font-medium text-foreground">{item.name}</p>
            {item.duration ? (
              <span className="text-[0.65rem] font-medium uppercase tracking-wide text-muted-foreground">
                {item.duration}
              </span>
            ) : null}
          </div>
          {item.description ? (
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{item.description}</p>
          ) : null}
          {item.note && !item.price ? (
            <p className="mt-1 text-xs text-muted-foreground">{item.note}</p>
          ) : null}
        </div>
        {item.price ? (
          <p className="font-numeric shrink-0 text-sm font-medium text-primary">{item.price}</p>
        ) : null}
      </div>
      {item.note && item.price ? (
        <p className="mt-1 text-xs text-muted-foreground">{item.note}</p>
      ) : null}
    </li>
  );
}

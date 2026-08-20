import { createFileRoute, Link } from "@tanstack/react-router";
import { SmoothScroll } from "@/components/SmoothScroll";
import { SiteNav } from "@/components/SiteNav";
import { Reveal } from "@/components/Reveal";
import { SiteFooter } from "@/components/SiteFooter";
import { business } from "@/lib/business";
import { menuChapters, menuServiceNotes, type MenuItem } from "@/data/menu";

const title = "Menu | The Cosy Chapter — Book Bar, Coffee & Wine";
const description =
  "Breakfast until 11:30am, toasties, focaccia, stone-baked pizza, small plates, salads and sharing boards at The Cosy Chapter on Long Street, Atherstone.";

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
  component: MenuPage,
});

function MenuPage() {
  return (
    <div className="bg-background">
      <SmoothScroll />
      <SiteNav />
      <main className="relative z-10 bg-background pt-24 sm:pt-28">
        <section className="border-b border-border pb-14 sm:pb-16">
          <div className="container-tight max-w-3xl text-center">
            <Reveal>
              <p className="eyebrow">Kitchen &amp; bar</p>
              <h1 className="mt-5 text-4xl leading-tight sm:text-5xl lg:text-6xl">
                The menu
              </h1>
              <p className="mx-auto mt-6 max-w-xl text-lg font-light leading-relaxed text-muted-foreground">
                Good books, good drinks, good times — from bacon muffins and mini pastries in
                the morning to sharing boards and small plates once the lamps come on.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <a href={business.phoneHref} className="btn-classic bg-primary text-primary-foreground transition-colors duration-500 hover:bg-brass hover:text-primary">
                  Call to book
                </a>
                <Link
                  to="/"
                  hash="contact"
                  className="btn-classic border border-primary/30 text-primary transition-colors duration-500 hover:bg-primary hover:text-primary-foreground"
                >
                  Enquire online
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        <nav
          className="sticky top-[4.75rem] z-40 border-b border-border bg-background/95 backdrop-blur-sm"
          aria-label="Menu sections"
        >
          <div className="container-tight flex gap-2 overflow-x-auto py-4">
            {menuChapters.map((chapter) => (
              <a
                key={chapter.id}
                href={`#${chapter.id}`}
                className="shrink-0 rounded-full border border-border px-4 py-2 text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:border-brass/50 hover:text-primary"
              >
                {chapter.label}
              </a>
            ))}
          </div>
        </nav>

        {menuChapters.map((chapter, chapterIndex) => (
          <section
            key={chapter.id}
            id={chapter.id}
            className={`py-16 sm:py-20 ${chapterIndex % 2 === 1 ? "bg-secondary" : ""}`}
          >
            <div className="container-tight">
              <Reveal className="text-center">
                <p className="eyebrow">{chapter.label}</p>
                <h2 className="mt-4 text-3xl sm:text-4xl">{chapter.title}</h2>
                {chapter.intro ? (
                  <p className="mx-auto mt-3 max-w-2xl text-sm font-light leading-relaxed text-muted-foreground">
                    {chapter.intro}
                  </p>
                ) : null}
              </Reveal>

              <div className="mt-12 grid items-start gap-6 sm:gap-8 lg:grid-cols-2">
                {chapter.sections.map((section, sectionIndex) => (
                  <Reveal key={section.id} delay={sectionIndex * 60}>
                    <div className="rounded-[var(--radius-lg)] border border-border/60 bg-card p-8 shadow-[var(--shadow-soft)] sm:p-10">
                      <h3 className="text-center font-display text-2xl text-primary">{section.title}</h3>
                      {section.subtitle ? (
                        <p className="mt-2 text-center text-sm font-light text-muted-foreground">
                          {section.subtitle}
                        </p>
                      ) : null}
                      {section.note ? (
                        <p className="mt-2 text-center text-[0.65rem] uppercase tracking-[0.18em] text-brass">
                          {section.note}
                        </p>
                      ) : null}
                      <ul className="mt-6 space-y-0 border-t border-border">
                        {section.items.map((item) => (
                          <MenuRow key={`${section.id}-${item.name}`} item={item} />
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        ))}

        <section className="border-t border-border bg-primary py-16 text-primary-foreground sm:py-20">
          <div className="container-tight max-w-3xl">
            <Reveal>
              <p className="eyebrow text-brass">Before you order</p>
              <ul className="mt-6 space-y-4 text-base font-light leading-relaxed text-primary-foreground/85">
                {menuServiceNotes.map((note) => (
                  <li key={note} className="flex gap-3">
                    <span className="mt-2 h-px w-6 shrink-0 bg-brass/60" aria-hidden="true" />
                    {note}
                  </li>
                ))}
              </ul>
              <p className="mt-10 font-display text-2xl italic text-brass">
                Good books · Good drinks · Good times
              </p>
            </Reveal>
          </div>
        </section>

      </main>
      <SiteFooter />
    </div>
  );
}

function MenuRow({ item }: { item: MenuItem }) {
  return (
    <li className="border-b border-border py-4">
      <div className="flex items-start justify-between gap-6">
        <div className="min-w-0 flex-1">
          <p className="text-base text-foreground">
            {item.name}
            {item.vegetarian ? (
              <span className="ml-2 text-[0.6rem] uppercase tracking-[0.16em] text-brass">V</span>
            ) : null}
          </p>
          {item.description ? (
            <p className="mt-1 text-sm font-light leading-relaxed text-muted-foreground">
              {item.description}
            </p>
          ) : null}
          {item.note && !item.price ? (
            <p className="mt-1 text-sm font-light text-muted-foreground">{item.note}</p>
          ) : null}
        </div>
        {item.price ? (
          <p className="font-numeric shrink-0 text-sm text-primary">{item.price}</p>
        ) : item.note && item.price === undefined ? null : null}
      </div>
      {item.note && item.price ? (
        <p className="mt-1 text-xs font-light text-muted-foreground">{item.note}</p>
      ) : null}
    </li>
  );
}

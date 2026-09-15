import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, Ban, Clock, Ear, Phone } from "lucide-react";
import { SmoothScroll } from "@/components/SmoothScroll";
import { SiteNav } from "@/components/SiteNav";
import { MeshBackdrop } from "@/components/MeshBackdrop";
import { Reveal } from "@/components/Reveal";
import { SiteRevealPage } from "@/components/SiteRevealPage";
import { business } from "@/lib/business";
import { salonPolicies, type PolicyPoint } from "@/data/policies";

const title = "Salon Policies | Belaisy Hair — Atherstone";
const description =
  "Patch test and cancellation policies at Belaisy Hair and Beauty Lounge on Long Street, Atherstone.";

export const Route = createFileRoute("/policies")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/policies" },
    ],
    links: [{ rel: "canonical", href: "/policies" }],
  }),
  component: PoliciesPage,
});

function PolicyIcon({ type }: { type: PolicyPoint["icon"] }) {
  const className = "h-5 w-5 text-primary";
  switch (type) {
    case "application":
      return <Ear className={className} aria-hidden />;
    case "duration":
    case "notice":
      return <Clock className={className} aria-hidden />;
    case "reaction":
    case "late":
      return <AlertTriangle className={className} aria-hidden />;
    case "noshow":
      return <Ban className={className} aria-hidden />;
  }
}

function PoliciesPage() {
  return (
    <div className="relative min-h-screen">
      <SmoothScroll />
      <SiteNav />
      <SiteRevealPage>
        <MeshBackdrop />
        <main className="relative pt-28 sm:pt-32">
        <section className="pb-10 sm:pb-14">
          <div className="container-tight max-w-2xl text-center">
            <Reveal>
              <h1 className="text-4xl sm:text-5xl">Before you visit</h1>
              <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
                A few important policies to keep every visit safe and running smoothly —
                for you and for our team.
              </p>
            </Reveal>
          </div>
        </section>

        <div className="container-tight space-y-10 pb-16 sm:space-y-14 sm:pb-20">
          {salonPolicies.map((policy, policyIndex) => (
            <Reveal key={policy.id} delay={policyIndex * 80}>
              <article id={policy.id} className="card-soft scroll-mt-36 p-6 sm:p-10">
                {policy.subtitle ? (
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-primary">
                    {policy.subtitle}
                  </p>
                ) : null}
                <h2 className="mt-2 font-display text-3xl sm:text-4xl">{policy.title}</h2>

                {policy.intro ? (
                  <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {policy.intro}
                  </p>
                ) : null}

                <ul className="mt-8 space-y-4">
                  {policy.points.map((point) => (
                    <li
                      key={point.title}
                      className="flex gap-4 rounded-2xl border border-border/80 bg-blush/30 p-4 sm:p-5"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-[var(--shadow-card)]">
                        <PolicyIcon type={point.icon} />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-foreground">{point.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{point.body}</p>
                      </div>
                    </li>
                  ))}
                </ul>

                {policy.closing && policy.closing.length > 0 ? (
                  <div className="mt-8 space-y-3 border-t border-border pt-6">
                    {policy.closing.map((paragraph) => (
                      <p key={paragraph} className="text-sm leading-relaxed text-muted-foreground">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                ) : null}
              </article>
            </Reveal>
          ))}

          <Reveal delay={160}>
            <div className="card-soft flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <div>
                <p className="font-display text-xl text-foreground">Questions about our policies?</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Call us, send a message, or get in touch on Instagram.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a href={business.phoneHref} className="btn-primary">
                  <Phone className="h-4 w-4" aria-hidden />
                  {business.phoneDisplay}
                </a>
                <Link to="/" hash="contact" className="btn-ghost">
                  Enquire online
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </main>
      </SiteRevealPage>
    </div>
  );
}

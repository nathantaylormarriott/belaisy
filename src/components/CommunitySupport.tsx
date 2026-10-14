import { Reveal } from "@/components/Reveal";
import veteransContactPoint from "@/assets/partners/veterans-contact-point.png";
import bladesHairDesign from "@/assets/partners/blades-hair-design.png";

const partners = [
  {
    name: "Veterans Contact Point",
    place: "Nuneaton",
    href: "https://veteranscontactpoint.org.uk/",
    logo: veteransContactPoint,
    logoAlt: "Veterans Contact Point",
    text: "We are proud to support Veterans Contact Point, a Nuneaton charity run by veterans, for veterans.",
  },
  {
    name: "Blades Hair Design",
    place: "Nuneaton",
    href: "https://bladeshd.getslick.com/",
    logo: bladesHairDesign,
    logoAlt: "Blades Hair Design",
    text: "In collaboration with Blades Hair Design, we are supporting Veterans Contact Point together.",
  },
] as const;

export function CommunitySupport() {
  return (
    <section id="community" className="pb-8 pt-16 sm:pb-10 sm:pt-20">
      <div className="container-tight">
        <Reveal className="text-center">
          <h2 className="text-4xl sm:text-5xl">In the community</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Belaisy and Blades Hair Design are proud to support Veterans Contact Point in Nuneaton.
          </p>
        </Reveal>

        <div className="mt-10 grid items-stretch gap-6 lg:grid-cols-2">
          {partners.map((partner, index) => (
            <Reveal key={partner.name} delay={index * 80} className="h-full">
              <a
                href={partner.href}
                target="_blank"
                rel="noreferrer"
                className="card-soft flex h-full min-h-[22rem] flex-col items-center px-6 py-8 text-center transition-transform duration-300 hover:-translate-y-0.5 sm:px-10 sm:py-10"
              >
                <span className="flex h-36 w-full items-center justify-center sm:h-40">
                  <img
                    src={partner.logo}
                    alt={partner.logoAlt}
                    className="max-h-full max-w-[17rem] object-contain sm:max-w-[20rem]"
                  />
                </span>
                <p className="mt-6 text-sm tracking-wide text-muted-foreground">{partner.place}</p>
                <p className="mt-3 max-w-sm flex-1 text-base leading-relaxed text-muted-foreground">
                  {partner.text}
                </p>
                <span className="mt-8 text-sm font-medium text-foreground">Visit {partner.name}</span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

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
    logoClass: "h-28 w-auto sm:h-32",
    text: "We are proud to support Veterans Contact Point, a Nuneaton charity run by veterans, for veterans.",
  },
  {
    name: "Blades Hair Design",
    place: "Nuneaton",
    href: "https://bladeshd.getslick.com/",
    logo: bladesHairDesign,
    logoAlt: "Blades Hair Design",
    logoClass: "h-16 w-auto sm:h-[4.5rem]",
    text: "In collaboration with Blades Hair Design, we are supporting Veterans Contact Point together.",
  },
] as const;

export function CommunitySupport() {
  return (
    <section id="community" className="pb-8 pt-16 sm:pb-10 sm:pt-20">
      <div className="container-tight">
        <Reveal>
          <h2 className="text-4xl sm:text-5xl">In the community</h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Belaisy and Blades Hair Design are proud to support Veterans Contact Point in Nuneaton.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {partners.map((partner, index) => (
            <Reveal key={partner.name} delay={index * 80}>
              <a
                href={partner.href}
                target="_blank"
                rel="noreferrer"
                className="card-soft flex h-full flex-col p-6 transition-transform duration-300 hover:-translate-y-0.5 sm:p-8"
              >
                <img
                  src={partner.logo}
                  alt={partner.logoAlt}
                  className={`${partner.logoClass} object-contain object-left`}
                />
                <p className="mt-6 font-display text-2xl text-foreground">{partner.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{partner.place}</p>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">{partner.text}</p>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import type { TeamMember } from "@/data/team";
import { subscribeLenisScroll } from "@/lib/lenis-scroll";

type TeamScrollRailProps = {
  members: TeamMember[];
};

function TeamHeader() {
  return (
    <div className="container-tight mx-auto max-w-2xl pb-8 pt-2 text-center sm:pb-10">
      <h2 className="text-4xl sm:text-5xl">The faces behind the lounge</h2>
      <p className="mt-4 text-base leading-relaxed text-muted-foreground">
        Stylists, beauty professionals and wellness specialists — all under one roof.
      </p>
    </div>
  );
}

function TeamCard({ member }: { member: TeamMember }) {
  return (
    <article className="card-soft flex w-[min(85vw,19rem)] shrink-0 snap-center flex-col p-5 sm:w-80 sm:p-6">
      <div className="mx-auto aspect-square w-full max-w-[200px] overflow-hidden rounded-full ring-2 ring-border/60 ring-offset-2 ring-offset-card">
        <img
          src={member.image}
          alt={`Portrait of ${member.name}, ${member.role}`}
          loading="lazy"
          width={600}
          height={600}
          className="h-full w-full object-cover"
        />
      </div>
      <h3 className="mt-5 text-center font-display text-2xl">{member.name}</h3>
      <p className="mt-1 text-center text-xs font-medium text-primary">{member.role}</p>
      <p className="mt-4 text-center text-sm leading-relaxed text-muted-foreground">{member.bio}</p>
    </article>
  );
}

export function TeamScrollRail({ members }: TeamScrollRailProps) {
  const reduceMotion = useReducedMotion();
  const runwayRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [runwayHeight, setRunwayHeight] = useState<number | null>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;

    const measure = () => {
      const track = trackRef.current;
      const sticky = runwayRef.current?.querySelector<HTMLElement>("[data-team-sticky]");
      if (!track) return;
      const maxOffset = Math.max(0, track.scrollWidth - window.innerWidth);
      const stickyHeight = sticky?.offsetHeight ?? 0;
      setRunwayHeight(stickyHeight + maxOffset + 80);
    };

    const update = () => {
      const runway = runwayRef.current;
      const track = trackRef.current;
      if (!runway || !track) return;

      const rect = runway.getBoundingClientRect();
      const range = Math.max(1, runway.offsetHeight - window.innerHeight);
      const scrolled = Math.min(range, Math.max(0, -rect.top));
      const nextProgress = scrolled / range;
      const maxOffset = Math.max(0, track.scrollWidth - window.innerWidth);

      setOffset(nextProgress * maxOffset);
    };

    measure();

    const track = trackRef.current;
    const sticky = runwayRef.current?.querySelector<HTMLElement>("[data-team-sticky]");
    const resizeObserver = new ResizeObserver(() => {
      measure();
      update();
    });
    if (track) resizeObserver.observe(track);
    if (sticky) resizeObserver.observe(sticky);

    update();
    const unsubscribe = subscribeLenisScroll(update);
    const onResize = () => {
      measure();
      update();
    };
    window.addEventListener("resize", onResize);

    return () => {
      unsubscribe();
      resizeObserver.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [reduceMotion, members.length]);

  if (reduceMotion) {
    return (
      <div>
        <TeamHeader />
        <div className="mt-2 -mx-4 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6">
          <div className="flex w-max gap-5 snap-x snap-mandatory">
            {members.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={runwayRef} className="relative" style={{ height: runwayHeight ?? "70vh" }}>
      <div data-team-sticky className="sticky top-20 sm:top-24">
        <TeamHeader />

        <div className="overflow-hidden pb-2 sm:pb-4">
          <div
            ref={trackRef}
            className="flex w-max items-stretch gap-5 px-[max(1.25rem,4vw)] will-change-transform"
            style={{ transform: `translate3d(-${offset}px, 0, 0)` }}
          >
            {members.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
            <div className="w-[max(1.25rem,4vw)] shrink-0 sm:w-[calc(50vw-10rem)]" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  /** When true, fades back out if the element leaves the viewport again. */
  out?: boolean;
  /** When true (default), only animates in once - avoids Lenis/IO flicker. */
  once?: boolean;
};

export function Reveal({
  children,
  as: Tag = "div",
  className = "",
  delay = 0,
  out = false,
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [state, setState] = useState<"idle" | "in" | "out">("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;

        if (entry.isIntersecting) {
          setState("in");
          if (once) observer.disconnect();
          return;
        }

        if (out) {
          setState((prev) => (prev === "in" ? "out" : prev));
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -4% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [out, once]);

  const stateClass = state === "in" ? "is-in" : state === "out" ? "is-out" : "";
  const fillsParent = className.includes("h-full") || className.includes("h-[");

  return (
    <Tag ref={ref as never} className={className}>
      <div
        className={cn("reveal", fillsParent && "h-full min-h-0", stateClass)}
        style={{ transitionDelay: `${delay}ms` }}
      >
        {children}
      </div>
    </Tag>
  );
}

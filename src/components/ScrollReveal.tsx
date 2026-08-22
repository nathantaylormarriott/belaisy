import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const SITE_REVEAL_EASE = [0.22, 1, 0.36, 1] as const;

const defaultVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
  amount?: number | "some" | "all";
};

export function ScrollReveal({
  children,
  className,
  delay = 0,
  once = true,
  amount = 0.25,
}: ScrollRevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount, margin: "0px 0px -6% 0px" }}
      transition={{ duration: 0.75, ease: SITE_REVEAL_EASE, delay }}
      variants={defaultVariants}
    >
      {children}
    </motion.div>
  );
}

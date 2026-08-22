type LenisLike = {
  animatedScroll: number;
  on: (event: "scroll", callback: (instance: LenisLike) => void) => () => void;
};

let lenis: LenisLike | null = null;
const listeners = new Set<(scroll: number) => void>();

export function registerLenis(instance: LenisLike | null) {
  lenis = instance;
  if (instance) {
    notify(instance.animatedScroll);
  }
}

export function subscribeLenisScroll(listener: (scroll: number) => void) {
  listeners.add(listener);
  if (lenis) listener(lenis.animatedScroll);
  return () => listeners.delete(listener);
}

function notify(scroll: number) {
  for (const listener of listeners) {
    listener(scroll);
  }
}

export function bindLenisScroll(instance: LenisLike) {
  return instance.on("scroll", (current) => {
    notify(current.animatedScroll);
  });
}

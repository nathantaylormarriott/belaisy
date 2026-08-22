import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { business } from "@/lib/business";
import { isNightAtLocation, msUntilNextDayNightChange } from "@/lib/solar-time";

const STORAGE_KEY = "cosy-chapter-hero-mode";

type HeroMode = "auto" | "day" | "night";

type HeroTimeContextValue = {
  isNight: boolean;
  isAuto: boolean;
  toggleNight: () => void;
};

const HeroTimeContext = createContext<HeroTimeContextValue | null>(null);

function readStoredMode(): HeroMode {
  if (typeof window === "undefined") return "auto";
  const value = window.localStorage.getItem(STORAGE_KEY);
  if (value === "day" || value === "night") return value;
  return "auto";
}

function computeSolarNight() {
  return isNightAtLocation(new Date(), business.lat, business.lng);
}

export function HeroTimeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<HeroMode>("auto");
  const [solarNight, setSolarNight] = useState(false);

  useEffect(() => {
    setMode(readStoredMode());
  }, []);

  useEffect(() => {
    const syncSolar = () => setSolarNight(computeSolarNight());

    syncSolar();

    let timeoutId = 0;
    const schedule = () => {
      timeoutId = window.setTimeout(() => {
        syncSolar();
        schedule();
      }, msUntilNextDayNightChange(new Date(), business.lat, business.lng));
    };

    schedule();
    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (mode === "auto") {
      window.localStorage.removeItem(STORAGE_KEY);
      return;
    }
    window.localStorage.setItem(STORAGE_KEY, mode);
  }, [mode]);

  const isNight = mode === "auto" ? solarNight : mode === "night";
  const isAuto = mode === "auto";

  const toggleNight = useCallback(() => {
    setMode((current) => {
      if (current !== "auto") return "auto";
      return solarNight ? "day" : "night";
    });
  }, [solarNight]);

  const value = useMemo(
    () => ({
      isNight,
      isAuto,
      toggleNight,
    }),
    [isAuto, isNight, toggleNight],
  );

  return <HeroTimeContext.Provider value={value}>{children}</HeroTimeContext.Provider>;
}

export function useHeroTime() {
  const context = useContext(HeroTimeContext);
  if (!context) {
    throw new Error("useHeroTime must be used within HeroTimeProvider");
  }
  return context;
}

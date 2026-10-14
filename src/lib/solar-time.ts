import { getTimes } from "suncalc";

export type SunTimes = {
  sunrise: Date;
  sunset: Date;
};

export function getSunTimes(date: Date, lat: number, lng: number): SunTimes {
  const times = getTimes(date, lat, lng);

  if (!times.sunrise || !times.sunset) {
    // Polar edge case - not relevant for Atherstone, but keeps types sound.
    const fallback = new Date(date);
    fallback.setHours(6, 0, 0, 0);
    const sunrise = new Date(fallback);
    fallback.setHours(20, 0, 0, 0);
    const sunset = new Date(fallback);
    return { sunrise, sunset };
  }

  return { sunrise: times.sunrise, sunset: times.sunset };
}

export function isNightAtLocation(now: Date, lat: number, lng: number) {
  const { sunrise, sunset } = getSunTimes(now, lat, lng);
  return now < sunrise || now >= sunset;
}

const DAY_MS = 86_400_000;

export function msUntilNextDayNightChange(now: Date, lat: number, lng: number) {
  const night = isNightAtLocation(now, lat, lng);
  const { sunrise, sunset } = getSunTimes(now, lat, lng);

  const next = night
    ? now < sunrise
      ? sunrise
      : getSunTimes(new Date(now.getTime() + DAY_MS), lat, lng).sunrise
    : sunset;

  return Math.max(next.getTime() - now.getTime() + 1_000, 1_000);
}

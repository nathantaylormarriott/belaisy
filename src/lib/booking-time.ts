const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/** Next occurrence of a weekday and a 12-hour label such as "9:00 am". */
export function nextSlotIso(dayName: string, timeLabel: string): string | null {
  const day = DAY_NAMES.indexOf(dayName);
  const match = timeLabel.trim().toLowerCase().match(/^(\d{1,2}):(\d{2})\s*(am|pm)$/);
  if (day < 0 || !match) return null;

  let hours = Number(match[1]) % 12;
  if (match[3] === "pm") hours += 12;
  const minutes = Number(match[2]);
  const result = new Date();
  result.setSeconds(0, 0);
  result.setHours(hours, minutes, 0, 0);
  const delta = (day - result.getDay() + 7) % 7;
  result.setDate(result.getDate() + delta);
  if (result.getTime() < Date.now() - 60_000) result.setDate(result.getDate() + 7);
  return result.toISOString();
}

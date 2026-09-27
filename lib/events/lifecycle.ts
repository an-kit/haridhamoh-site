import type { Event } from "@/lib/content/schema";

const timezone = "America/New_York";

function dateInNewYork(now: Date): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const part = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((item) => item.type === type)?.value ?? "";

  return `${part("year")}-${part("month")}-${part("day")}`;
}

export function isUpcomingEvent(event: Event, now = new Date()): boolean {
  const localDate = dateInNewYork(now);
  return (event.endDate ?? event.date) >= localDate;
}

export function getNextUpcomingEvents(events: Event[], now = new Date()): Event[] {
  return events
    .filter((event) => isUpcomingEvent(event, now))
    .sort((left, right) => left.date.localeCompare(right.date));
}

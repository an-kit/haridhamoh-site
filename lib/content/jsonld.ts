import type { Event, SiteFacts } from "@/lib/content/schema";

const timezone = "America/New_York";

function formatOffset(minutes: number): string {
  const sign = minutes >= 0 ? "+" : "-";
  const absolute = Math.abs(minutes);
  return `${sign}${String(Math.floor(absolute / 60)).padStart(2, "0")}:${String(
    absolute % 60,
  ).padStart(2, "0")}`;
}

function isoInNewYork(date: string, time: string): string {
  const [year, month, day] = date.split("-").map(Number);
  const [hour, minute] = time.split(":").map(Number);
  const utcGuess = Date.UTC(year, month - 1, day, hour, minute);
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date(utcGuess));
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((part) => part.type === type)?.value ?? 0);
  const renderedAsUtc = Date.UTC(get("year"), get("month") - 1, get("day"), get("hour"), get("minute"));
  const offsetMinutes = (renderedAsUtc - utcGuess) / 60_000;

  return `${date}T${time}:00${formatOffset(offsetMinutes)}`;
}

export function placeOfWorshipJsonLd(siteFacts: SiteFacts) {
  const [streetAddress, addressLocality, addressRegionZip] = siteFacts.address.split(", ");
  const [addressRegion, postalCode] = addressRegionZip.split(" ");

  return {
    "@context": "https://schema.org",
    "@type": "PlaceOfWorship",
    name: "HSAPSS Ohio (Haridham Ohio)",
    telephone: siteFacts.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress,
      addressLocality,
      addressRegion,
      postalCode,
      addressCountry: "US",
    },
    openingHours: siteFacts.darshanHours,
  };
}

export function createEventJsonLd(event: Event) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    startDate: isoInNewYork(event.date, event.startTime),
    ...(event.endTimeNote
      ? {}
      : { endDate: isoInNewYork(event.endDate ?? event.date, event.endTime) }),
    location: {
      "@type": "Place",
      name: event.location,
    },
    image: event.image,
    description: event.description,
  };
}

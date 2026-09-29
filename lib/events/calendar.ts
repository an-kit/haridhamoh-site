import type { Event } from "@/lib/content/schema";
import { eventSlug } from "@/lib/events/slug";

function escapeIcsText(value: string): string {
  return value
    .replaceAll("\\", "\\\\")
    .replaceAll("\n", "\\n")
    .replaceAll(",", "\\,")
    .replaceAll(";", "\\;");
}

function formatIcsDateTime(date: string, time: string): string {
  return `${date.replaceAll("-", "")}T${time.replaceAll(":", "")}00`;
}

export function createEventCalendarDataUrl(event: Event): string {
  const slug = eventSlug(event.title);
  const calendar = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Haridham Ohio//Events//EN",
    "BEGIN:VEVENT",
    `UID:${slug}-${event.date}@haridhamoh.org`,
    `DTSTART;TZID=America/New_York:${formatIcsDateTime(event.date, event.startTime)}`,
    `SUMMARY:${escapeIcsText(event.title)}`,
    `LOCATION:${escapeIcsText(event.location)}`,
    `DESCRIPTION:${escapeIcsText(event.description)}`,
    "END:VEVENT",
    "END:VCALENDAR",
    "",
  ].join("\r\n");

  return `data:text/calendar;charset=utf-8,${encodeURIComponent(calendar)}`;
}

export function eventCalendarFilename(event: Event): string {
  return `${eventSlug(event.title)}.ics`;
}

import Image from "next/image";

import type { Event } from "@/lib/content/schema";
import { createEventJsonLd } from "@/lib/content/jsonld";
import { createEventCalendarDataUrl, eventCalendarFilename } from "@/lib/events/calendar";

function formatTime(value: string): string {
  const [hour, minute] = value.split(":").map(Number);
  const suffix = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${String(minute).padStart(2, "0")} ${suffix}`;
}

export function EventDetail({ event }: { event: Event }) {
  const jsonLd = JSON.stringify(createEventJsonLd(event)).replace(/</g, "\\u003c");
  const calendarDataUrl = createEventCalendarDataUrl(event);
  const calendarFilename = eventCalendarFilename(event);

  return (
    <article>
      <Image
        alt={`Event artwork for ${event.title}`}
        className="aspect-square w-full rounded-2xl object-cover"
        height={800}
        src={event.image}
        unoptimized
        width={800}
      />
      <time className="mt-6 block font-semibold text-saffron" dateTime={event.date}>{event.date}</time>
      <h1 className="mt-2 font-display text-5xl text-slate">{event.title}</h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-slate">{event.description}</p>
      <p className="mt-4 text-slate">Sabha starts at {formatTime(event.startTime)}</p>
      <div className="mt-6 flex flex-wrap gap-4">
        <a className="inline-flex font-semibold text-slate underline" download={calendarFilename} href={calendarDataUrl}>Add to Calendar</a>
        {event.zeffyUrl ? <a className="inline-flex font-semibold text-slate underline" href={event.zeffyUrl} rel="noreferrer" target="_blank">Event seva and tickets</a> : null}
      </div>
      <script dangerouslySetInnerHTML={{ __html: jsonLd }} type="application/ld+json" />
    </article>
  );
}

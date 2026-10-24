import Image from "next/image";

import type { Event } from "@/lib/content/schema";
import { createEventJsonLd } from "@/lib/content/jsonld";
import { createEventCalendarDataUrl, eventCalendarFilename } from "@/lib/events/calendar";
import { formatEventDate } from "@/lib/events/format";
import { isPastEvent, renderEventLifecycleScript } from "@/lib/events/lifecycle";

import { EventGallery } from "./event-gallery";

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
  const past = isPastEvent(event);

  return (
    <article
      data-event-detail
      data-event-end={event.endDate ?? event.date}
      data-event-start={event.date}
    >
      <Image
        alt={`Event artwork for ${event.title}`}
        className="w-full rounded-2xl object-cover"
        height={800}
        src={event.image}
        unoptimized
        width={800}
      />
      <time className="mt-6 block font-semibold text-saffron" dateTime={event.date}>
        {formatEventDate(event.date)}
      </time>
      <h1 className="mt-2 font-display text-5xl text-slate">{event.title}</h1>

      <div data-detail-upcoming hidden={past}>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-slate">{event.description}</p>
        <p className="mt-4 text-slate">Sabha starts at {formatTime(event.startTime)}</p>
        <div className="mt-6 flex flex-wrap gap-4">
          <a
            className="inline-flex font-semibold text-slate underline"
            download={calendarFilename}
            href={calendarDataUrl}
          >
            Add to Calendar
          </a>
          {event.zeffyUrl ? (
            <a
              className="inline-flex font-semibold text-slate underline"
              href={event.zeffyUrl}
              rel="noreferrer"
              target="_blank"
            >
              Event Seva
            </a>
          ) : null}
        </div>
      </div>

      <div data-detail-past hidden={!past}>
        <p className="mt-4 rounded-xl bg-cream px-5 py-4 text-lg font-medium text-slate">
          This event took place on {formatEventDate(event.endDate ?? event.date)}
        </p>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-slate">
          {event.recap ?? event.description}
        </p>
        <EventGallery media={event.media ?? []} title={event.title} />
      </div>

      <script dangerouslySetInnerHTML={{ __html: renderEventLifecycleScript() }} />
      <script dangerouslySetInnerHTML={{ __html: jsonLd }} type="application/ld+json" />
    </article>
  );
}

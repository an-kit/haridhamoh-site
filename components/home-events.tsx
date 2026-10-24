import Link from "next/link";

import type { Event } from "@/lib/content/schema";
import { isPastEvent, renderEventLifecycleScript } from "@/lib/events/lifecycle";

import { EventCard } from "./event-card";

export function HomeEvents({ events }: { events: Event[] }) {
  const now = new Date();
  const upcoming = [...events].sort((left, right) => left.date.localeCompare(right.date));
  const highlights = events
    .filter((event) => (event.media?.length ?? 0) > 0)
    .sort((left, right) =>
      (right.endDate ?? right.date).localeCompare(left.endDate ?? left.date),
    );
  const firstPastHighlight = highlights.findIndex((event) => isPastEvent(event, now));
  const hasUpcoming = upcoming.some((event) => !isPastEvent(event, now));
  const hasHighlights = highlights.length > 0;

  return (
    <section className="mt-12" data-home-events>
      <div data-home-upcoming hidden={!hasUpcoming}>
        <h2 className="font-display text-4xl text-slate">Upcoming events</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {upcoming.map((event, index) => (
            <EventCard
              event={event}
              hidden={isPastEvent(event, now) || index >= 3}
              key={`home-upcoming-${event.title}-${event.date}`}
              list="upcoming"
            />
          ))}
        </div>
      </div>

      <div data-home-highlights hidden={hasUpcoming}>
        <h2 className="font-display text-4xl text-slate">Recent highlights</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {highlights.map((event, index) => (
            <EventCard
              event={event}
              hidden={index !== firstPastHighlight}
              key={`home-highlight-${event.title}-${event.date}`}
              list="past"
            />
          ))}
        </div>
      </div>

      <div
        className="mt-5 rounded-2xl bg-white p-6 shadow-sm"
        data-home-highlights-empty
        hidden={hasUpcoming || hasHighlights}
      >
        <p className="text-lg text-slate">
          <Link className="font-semibold text-slate underline" href="/events/">
            See past events
          </Link>
        </p>
      </div>

      <script dangerouslySetInnerHTML={{ __html: renderEventLifecycleScript() }} />
    </section>
  );
}

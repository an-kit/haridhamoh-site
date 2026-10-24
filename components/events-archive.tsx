import type { Event } from "@/lib/content/schema";
import { loadActions } from "@/lib/content/schema";
import { isPastEvent, renderEventLifecycleScript } from "@/lib/events/lifecycle";

import { EventCard } from "./event-card";

export function EventsArchive({ events }: { events: Event[] }) {
  const actions = loadActions();
  const now = new Date();
  const hasUpcoming = events.some((event) => !isPastEvent(event, now));
  const hasPast = events.some((event) => isPastEvent(event, now));

  const upcoming = [...events].sort((left, right) => left.date.localeCompare(right.date));
  const past = [...events].sort((left, right) =>
    (right.endDate ?? right.date).localeCompare(left.endDate ?? left.date),
  );
  const years = [...new Set(past.map((event) => (event.endDate ?? event.date).slice(0, 4)))]
    .sort()
    .reverse();
  const grouping = past.filter((event) => isPastEvent(event, now)).length > 6 || years.length > 1;

  return (
    <div data-events-page>
      <a
        className="inline-flex font-semibold text-slate underline"
        data-past-jump
        hidden={!(hasUpcoming && hasPast)}
        href="#past-events"
      >
        See past events ↓
      </a>

      <section className="mt-8" data-event-section="upcoming">
        <h2 className="font-display text-4xl text-slate">Upcoming</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {upcoming.map((event) => (
            <EventCard
              event={event}
              hidden={isPastEvent(event, now)}
              key={`upcoming-${event.title}-${event.date}`}
              list="upcoming"
            />
          ))}
        </div>
        <div
          className="mt-5 rounded-2xl bg-white p-6 shadow-sm"
          data-event-empty="upcoming"
          hidden={hasUpcoming}
        >
          <p className="text-lg text-slate">
            No upcoming events right now. Join our WhatsApp community for announcements
          </p>
          <a
            className="mt-4 inline-flex items-center justify-center rounded-full bg-saffron px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-saffron-dark"
            href={actions.whatsappCommunityUrl}
            rel="noreferrer"
            target="_blank"
          >
            Join WhatsApp community
          </a>
        </div>
      </section>

      <section className="mt-12" data-event-section="past" hidden={!hasPast} id="past-events">
        <h2 className="font-display text-4xl text-slate">Past events</h2>
        {years.map((year) => (
          <div className="mt-6" data-event-year-group={year} key={year}>
            <h3
              className="mb-3 font-display text-2xl text-slate/80"
              data-year-heading={year}
              hidden={!grouping}
            >
              {year}
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {past
                .filter((event) => (event.endDate ?? event.date).startsWith(year))
                .map((event) => (
                  <EventCard
                    event={event}
                    hidden={!isPastEvent(event, now)}
                    key={`past-${event.title}-${event.date}`}
                    lazy={!isPastEvent(event, now)}
                    list="past"
                  />
                ))}
            </div>
          </div>
        ))}
      </section>

      <script dangerouslySetInnerHTML={{ __html: renderEventLifecycleScript() }} />
    </div>
  );
}

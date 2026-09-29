import Link from "next/link";

import type { Event } from "@/lib/content/schema";
import { eventSlug } from "@/lib/events/slug";

type EventCollectionProps = {
  events: Event[];
  homeLimit?: number;
};

const lifecycleScript = `(() => {
  const timeZone = "America/New_York";
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone, year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(new Date());
  const part = (type) => parts.find((item) => item.type === type)?.value ?? "";
  const today = part("year") + "-" + part("month") + "-" + part("day");
  document.querySelectorAll("[data-event-collection]").forEach((collection) => {
    const cards = Array.from(collection.querySelectorAll("[data-event-card]"));
    const upcoming = cards.filter((card) => {
      const visible = card.dataset.eventEnd >= today;
      card.hidden = !visible;
      return visible;
    }).sort((left, right) => left.dataset.eventStart.localeCompare(right.dataset.eventStart));
    const limit = Number(collection.dataset.homeLimit || 0);
    if (limit) upcoming.slice(limit).forEach((card) => { card.hidden = true; });
    if (!upcoming.length) collection.closest("[data-event-section]")?.setAttribute("hidden", "");
  });
})();`;

export function EventCollection({ events, homeLimit }: EventCollectionProps) {
  return (
    <div
      className="grid gap-4 sm:grid-cols-2"
      data-event-collection
      data-home-limit={homeLimit || undefined}
    >
      {events.map((event) => (
        <Link
          className="rounded-2xl bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
          data-event-card
          data-event-end={event.endDate ?? event.date}
          data-event-start={event.date}
          href={`/events/${eventSlug(event.title)}/`}
          key={`${event.title}-${event.date}`}
        >
          <article>
            <time className="text-sm font-semibold text-saffron" dateTime={event.date}>{event.date}</time>
            <h2 className="mt-2 font-display text-3xl text-slate">{event.title}</h2>
            <p className="mt-2 text-slate">{event.description}</p>
          </article>
        </Link>
      ))}
      <script dangerouslySetInnerHTML={{ __html: lifecycleScript }} />
    </div>
  );
}

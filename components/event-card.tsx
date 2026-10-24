import Link from "next/link";

import type { Event } from "@/lib/content/schema";
import { formatEventDate, formatMediaBadge } from "@/lib/events/format";
import { eventSlug } from "@/lib/events/slug";

type EventCardProps = {
  event: Event;
  list: "upcoming" | "past";
  hidden: boolean;
  lazy?: boolean;
};

export function EventCard({ event, list, hidden, lazy = false }: EventCardProps) {
  const photo = event.media?.find((item) => item.type === "photo");
  const cover = photo ? photo.thumb : event.image;
  const alt = photo ? photo.alt : `Event artwork for ${event.title}`;
  const badge = formatMediaBadge(event);
  const endDate = event.endDate ?? event.date;

  return (
    <Link
      className="group block overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-md"
      data-event-card
      data-event-end={endDate}
      data-event-list={list}
      data-event-start={event.date}
      data-event-year={endDate.slice(0, 4)}
      hidden={hidden}
      href={`/events/${eventSlug(event.title)}/`}
    >
      <img
        alt={alt}
        className="aspect-[3/2] w-full object-cover"
        height={400}
        loading={lazy ? "lazy" : undefined}
        src={cover}
        width={600}
      />
      <article className="p-5">
        <time className="text-sm font-semibold text-saffron" dateTime={event.date}>
          {formatEventDate(event.date)}
        </time>
        <h3 className="mt-2 font-display text-3xl text-slate">{event.title}</h3>
        {badge ? <p className="mt-2 text-sm font-medium text-slate/70">{badge}</p> : null}
      </article>
    </Link>
  );
}

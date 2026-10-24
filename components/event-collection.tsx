import type { Event } from "@/lib/content/schema";

import { HomeEvents } from "./home-events";

export function EventCollection({ events }: { events: Event[]; homeLimit?: number }) {
  return <HomeEvents events={events} />;
}

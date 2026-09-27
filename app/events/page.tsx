import { EventCollection } from "@/components/event-collection";
import { PageHeading, PageShell } from "@/components/page-shell";
import { loadEvents } from "@/lib/content/schema";

export const metadata = { title: "Events" };

export default function EventsPage() {
  const events = loadEvents();
  return (
    <PageShell>
      <PageHeading>Events</PageHeading>
      {events.length > 0 ? <div className="mt-8"><EventCollection events={events} /></div> : null}
    </PageShell>
  );
}

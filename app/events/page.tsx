import { EventsArchive } from "@/components/events-archive";
import { PageHeading, PageShell } from "@/components/page-shell";
import { loadEvents } from "@/lib/content/schema";

export const metadata = { title: "Events" };

export default function EventsPage() {
  const events = loadEvents();
  return (
    <PageShell>
      <PageHeading>Events</PageHeading>
      <div className="mt-8">
        <EventsArchive events={events} />
      </div>
    </PageShell>
  );
}

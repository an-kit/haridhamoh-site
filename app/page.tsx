import Link from "next/link";

import { EventCollection } from "@/components/event-collection";
import { PageShell } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { loadActions, loadEvents, loadSiteFacts } from "@/lib/content/schema";

export default function HomePage() {
  const siteFacts = loadSiteFacts();
  const actions = loadActions();
  const events = loadEvents();

  return (
    <PageShell>
      <section className="grid gap-8 rounded-3xl bg-white p-8 shadow-sm md:grid-cols-[1.5fr_1fr] md:p-12">
          <div>
            <p className="font-semibold uppercase tracking-[0.18em] text-saffron">HSAPSS Ohio</p>
            <h1 className="mt-3 font-display text-6xl text-slate sm:text-7xl">Haridham Ohio</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate">{siteFacts.address}</p>
            <p className="mt-2 text-slate">Darshan: {siteFacts.darshanHours}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild><Link href="/donate/">Donate through Zeffy</Link></Button>
              <Button asChild variant="outline"><a href={actions.whatsappCommunityUrl} target="_blank" rel="noreferrer">Join WhatsApp community</a></Button>
            </div>
          </div>
          <aside className="rounded-2xl bg-cream p-6 text-slate">
            <h2 className="font-display text-3xl">Darshan</h2>
            <p className="mt-3 text-lg">{siteFacts.darshanHours}</p>
            <p className="mt-6 text-sm">Phone: {siteFacts.phone}</p>
          </aside>
      </section>
      {events.length > 0 ? <section className="mt-12" data-event-section><h2 className="font-display text-4xl text-slate">Events</h2><div className="mt-5"><EventCollection events={events} homeLimit={3} /></div></section> : null}
    </PageShell>
  );
}

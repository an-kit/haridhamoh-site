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
      {/* Full-width hero banner */}
      <section className="overflow-hidden rounded-2xl bg-cream">
        <picture>
          <source media="(max-width: 640px)" srcSet="/assets/brand/haridham-ohio-darshan-hero-mobile.jpg" />
          <source media="(max-width: 960px)" srcSet="/assets/brand/haridham-ohio-darshan-hero-tablet.jpg" />
          <img
            alt="Haridham Ohio darshan and temple"
            className="h-auto w-full"
            decoding="async"
            fetchPriority="high"
            height={430}
            sizes="100vw"
            src="/assets/brand/haridham-ohio-darshan-hero-desktop.jpg"
            width={1280}
          />
        </picture>
      </section>

      {/* Content section */}
      <section className="mt-12 rounded-3xl bg-white p-8 shadow-sm md:p-12">
        <div>
          <p className="font-semibold uppercase tracking-[0.18em] text-saffron">HSAPSS Ohio</p>
          <h1 className="mt-3 font-display text-6xl text-slate sm:text-7xl">Haridham Ohio</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate">{siteFacts.address}</p>
          <div className="mt-8 space-y-4">
            <div>
              <h2 className="font-display text-3xl text-slate">Darshan</h2>
              <p className="mt-2 text-lg text-slate">{siteFacts.darshanHours}</p>
              <p className="mt-3 text-sm text-slate">Phone: {siteFacts.phone}</p>
            </div>
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild><Link href="/donate/">Donate through Zeffy</Link></Button>
            <Button asChild variant="outline"><a href={actions.whatsappCommunityUrl} target="_blank" rel="noreferrer">Join WhatsApp community</a></Button>
          </div>
        </div>
      </section>

      {events.length > 0 ? <section className="mt-12" data-event-section><h2 className="font-display text-4xl text-slate">Events</h2><div className="mt-5"><EventCollection events={events} homeLimit={3} /></div></section> : null}
    </PageShell>
  );
}

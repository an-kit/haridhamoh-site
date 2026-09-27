import { notFound } from "next/navigation";

import { EventDetail } from "@/components/event-detail";
import { PageShell } from "@/components/page-shell";
import { loadEvents } from "@/lib/content/schema";
import { eventSlug } from "@/lib/events/slug";

export const dynamicParams = false;

export function generateStaticParams() {
  return loadEvents().map((event) => ({ slug: eventSlug(event.title) }));
}

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = loadEvents().find((candidate) => eventSlug(candidate.title) === slug);
  if (!event) notFound();

  return <PageShell><EventDetail event={event} /></PageShell>;
}

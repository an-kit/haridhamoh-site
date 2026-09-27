import type { SiteFacts } from "@/lib/content/schema";

export function ContactMap({ siteFacts }: { siteFacts: SiteFacts }) {
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(siteFacts.address)}`;

  return (
    <section aria-label="Directions" className="grid gap-5 md:grid-cols-2">
      <img
        alt={`Static map overview for ${siteFacts.address}`}
        className="h-full min-h-64 w-full rounded-2xl border border-slate/15 object-cover"
        src="/map-static.svg"
      />
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="font-display text-3xl text-slate">Visit Haridham Ohio</h2>
        <p className="mt-3 text-slate">{siteFacts.address}</p>
        <a className="mt-5 inline-flex font-semibold text-slate underline" href={directionsUrl} target="_blank" rel="noreferrer">
          Get directions
        </a>
      </div>
    </section>
  );
}

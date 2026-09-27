import type { Center } from "@/lib/content/schema";

export function CentersList({ centers }: { centers: Center[] }) {
  return (
    <ul className="mt-8 grid gap-4 sm:grid-cols-2">
      {centers.map((center) => (
        <li className="rounded-2xl bg-white p-5 shadow-sm" key={center.name}>
          {center.url ? (
            <a
              className="inline-flex items-center gap-2 font-semibold text-slate underline decoration-gold decoration-2 underline-offset-4"
              href={center.url}
              rel="noreferrer"
              target="_blank"
            >
              {center.name}<span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span>
            </a>
          ) : (
            <span className="font-semibold text-slate">{center.name}</span>
          )}
        </li>
      ))}
    </ul>
  );
}

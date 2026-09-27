import Link from "next/link";

import { Button } from "@/components/ui/button";

const links = [
  ["About", "/about/"],
  ["Upasana", "/upasana/"],
  ["Events", "/events/"],
  ["Guru Parampara", "/guru-parampara/"],
  ["Centers", "/centers/"],
  ["Contact", "/contact/"],
] as const;

export function SiteHeader() {
  return (
    <header className="border-b border-slate/15 bg-cream">
      <nav aria-label="Primary" className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-5">
        <Link className="font-display text-2xl font-semibold text-slate" href="/">
          Haridham Ohio
        </Link>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium text-slate">
          {links.map(([label, href]) => (
            <Link key={href} href={href}>{label}</Link>
          ))}
          <Button asChild variant="saffron"><Link href="/donate/">Donate</Link></Button>
        </div>
      </nav>
    </header>
  );
}

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ZeffyDonateLink } from "@/components/zeffy-donate-link";

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
        <Link aria-label="Haridham Ohio" className="flex items-center" href="/">
          <img
            alt="Haridham Ohio logo"
            className="h-12 w-auto"
            height={271}
            src="/assets/brand/hsapss-logo-header-256.png"
            width={256}
          />
        </Link>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium text-slate">
          {links.map(([label, href]) => (
            <Link key={href} href={href}>{label}</Link>
          ))}
          <Button asChild variant="saffron"><ZeffyDonateLink>Donate</ZeffyDonateLink></Button>
        </div>
      </nav>
    </header>
  );
}

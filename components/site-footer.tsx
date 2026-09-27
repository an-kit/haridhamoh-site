import Link from "next/link";

import { loadActions, loadSiteFacts } from "@/lib/content/schema";

export function SiteFooter() {
  const siteFacts = loadSiteFacts();
  const actions = loadActions();

  return (
    <footer className="mt-16 border-t border-slate/15 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 text-sm text-slate md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-semibold">HSAPSS Ohio · Haridham Ohio</p>
          <p>{siteFacts.address}</p>
        </div>
        <div className="flex gap-4">
          <Link href="/contact/">Contact</Link>
          <a href={actions.whatsappCommunityUrl} rel="noreferrer" target="_blank">Join WhatsApp community</a>
        </div>
      </div>
    </footer>
  );
}

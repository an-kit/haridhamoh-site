import Link from "next/link";

import { loadActions, loadSiteFacts } from "@/lib/content/schema";

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/haridhamoh/",
    icon: (
      <svg aria-hidden="true" className="size-5" fill="none" viewBox="0 0 24 24">
        <rect height="16" rx="4" stroke="currentColor" strokeWidth="2" width="16" x="4" y="4" />
        <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="2" />
        <circle cx="17.25" cy="6.75" fill="currentColor" r="1.25" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/people/Haridham-OH-Hindu-Swaminarayan-Temple/61566728870040/",
    icon: (
      <svg aria-hidden="true" className="size-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M13.5 21v-8h2.75l.4-3H13.5V8.08c0-.87.24-1.46 1.5-1.46h1.8V3.94c-.31-.04-1.37-.14-2.61-.14-2.58 0-4.35 1.57-4.35 4.46V10H6.92v3h2.92v8h3.66Z" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "https://chat.whatsapp.com/IBQ4cujX1CqFmgvz05Su1c?mode=gi_t",
    icon: (
      <svg aria-hidden="true" className="size-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.52 3.48A11.79 11.79 0 0 0 12.14 0C5.65 0 .36 5.29.36 11.78c0 2.08.54 4.1 1.58 5.88L.25 23.82l6.3-1.65a11.74 11.74 0 0 0 5.59 1.42h.01c6.49 0 11.78-5.29 11.78-11.78 0-3.15-1.23-6.1-3.41-8.33Zm-8.38 18.1a9.76 9.76 0 0 1-4.98-1.36l-.36-.22-3.74.98 1-3.64-.24-.37a9.77 9.77 0 0 1-1.5-5.19c0-5.4 4.4-9.79 9.81-9.79 2.62 0 5.08 1.02 6.93 2.87a9.72 9.72 0 0 1 2.87 6.93c0 5.4-4.4 9.79-9.79 9.79Zm5.36-7.34c-.29-.14-1.7-.84-1.96-.94-.26-.1-.45-.14-.64.14-.19.29-.74.94-.91 1.13-.17.19-.33.22-.62.07-1.7-.85-2.82-1.52-3.94-3.45-.3-.52.3-.48.86-1.6.1-.2.05-.37-.02-.51-.07-.14-.64-1.55-.88-2.12-.23-.55-.47-.48-.64-.49h-.55c-.19 0-.5.07-.76.36-.26.29-1 1-1 2.44s1.03 2.84 1.18 3.03c.14.19 2.03 3.1 4.91 4.35.68.29 1.21.47 1.63.6.68.22 1.3.19 1.79.12.55-.08 1.7-.7 1.94-1.38.24-.67.24-1.25.17-1.37-.07-.12-.26-.19-.55-.33Z" />
      </svg>
    ),
  },
] as const;

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
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <Link href="/contact/">Contact</Link>
          <a href={actions.whatsappCommunityUrl} rel="noreferrer" target="_blank">Join WhatsApp community</a>
          <div aria-label="Social links" className="flex items-center gap-1" role="group">
            {socialLinks.map((socialLink) => (
              <a
                aria-label={socialLink.label}
                className="inline-flex size-10 items-center justify-center rounded-full text-slate transition-colors hover:bg-cream hover:text-saffron focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-saffron"
                href={socialLink.href}
                key={socialLink.label}
                rel="noreferrer"
                target="_blank"
              >
                {socialLink.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

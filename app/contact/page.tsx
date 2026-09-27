import { ContactMap } from "@/components/contact-map";
import { PageHeading, PageShell } from "@/components/page-shell";
import { loadSiteFacts } from "@/lib/content/schema";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  const siteFacts = loadSiteFacts();
  return (
    <PageShell>
      <PageHeading>Contact</PageHeading>
      <p className="mt-5 text-slate">Phone: {siteFacts.phone}</p>
      <p className="mt-2 text-slate">Darshan: {siteFacts.darshanHours}</p>
      <div className="mt-8"><ContactMap siteFacts={siteFacts} /></div>
    </PageShell>
  );
}

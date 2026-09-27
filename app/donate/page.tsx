import { PageHeading, PageShell } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { loadActions } from "@/lib/content/schema";

export const metadata = { title: "Donate" };

export default function DonatePage() {
  const actions = loadActions();
  return (
    <PageShell>
      <PageHeading>Donate</PageHeading>
      <p className="mt-5 max-w-2xl text-slate">Donations are handled through Zeffy.</p>
      <Button asChild className="mt-6"><a href={actions.zeffyDonationUrl} rel="noreferrer" target="_blank">Donate through Zeffy</a></Button>
    </PageShell>
  );
}

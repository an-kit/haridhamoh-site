import { PageHeading, PageShell } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { ZeffyDonateLink } from "@/components/zeffy-donate-link";

export const metadata = { title: "Donate" };

export default function DonatePage() {
  return (
    <PageShell>
      <PageHeading>Donate</PageHeading>
      <p className="mt-5 max-w-2xl text-slate">Donations are handled through Zeffy.</p>
      <Button asChild className="mt-6"><ZeffyDonateLink>Donate through Zeffy</ZeffyDonateLink></Button>
    </PageShell>
  );
}

import { CentersList } from "@/components/centers-list";
import { PageHeading, PageShell } from "@/components/page-shell";
import { loadCenters } from "@/lib/content/schema";

export const metadata = { title: "Centers" };

export default function CentersPage() {
  return (
    <PageShell>
      <PageHeading>Centers</PageHeading>
      <CentersList centers={loadCenters()} />
    </PageShell>
  );
}

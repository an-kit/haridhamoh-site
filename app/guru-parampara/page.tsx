import { PageHeading, PageShell } from "@/components/page-shell";

export const metadata = { title: "Guru Parampara" };

export default function GuruParamparaPage() {
  return (
    <PageShell>
      {/* Banner section */}
      <section className="overflow-hidden rounded-2xl bg-cream">
        <picture>
          <source media="(max-width: 640px)" srcSet="/assets/brand/haridham-ohio-home-hero-640.jpg" />
          <source media="(max-width: 960px)" srcSet="/assets/brand/haridham-ohio-home-hero-960.jpg" />
          <img
            alt="Haridham Ohio guru and temple banner"
            className="h-auto w-full"
            decoding="async"
            height={414}
            sizes="100vw"
            src="/assets/brand/haridham-ohio-home-hero-1280.jpg"
            width={1280}
          />
        </picture>
      </section>

      <PageHeading>Guru Parampara</PageHeading>

      {/* Guru portrait cards */}
      <section className="mt-12 grid gap-8 md:grid-cols-2">
        {/* Guru 1 */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
          <img
            alt="Guru portrait"
            className="h-auto w-full"
            decoding="async"
            src="/assets/brand/guru-parampara/guru-portrait-1.jpg"
          />
          <div className="p-6">
            <p className="font-semibold text-slate">
              {/* Name flagged: WordPress metadata lacks alt text or caption */}
              Guru Portrait (ID: 295)
            </p>
          </div>
        </div>

        {/* Guru 2 */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
          <img
            alt="Guru portrait"
            className="h-auto w-full"
            decoding="async"
            src="/assets/brand/guru-parampara/guru-portrait-2.jpg"
          />
          <div className="p-6">
            <p className="font-semibold text-slate">
              {/* Name flagged: WordPress metadata lacks alt text or caption */}
              Guru Portrait (ID: 296)
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

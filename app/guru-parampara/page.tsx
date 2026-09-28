import { PageHeading, PageShell } from "@/components/page-shell";

export const metadata = { title: "Guru Parampara" };

/**
 * Guru Parampara (Lineage) — 6-person chain of spiritual succession
 *
 * Portraits sourced from HSAPSS Canada Contentful CMS (approved 2026-09-28).
 * Optimized derivatives: 310×357 px JPG, direct asset delivery (no /_next/image transforms).
 * See public/assets/brand/README.md for full provenance record.
 */
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

      {/* Guru portrait cards — Lineage of Sahajanand Swami tradition */}
      <section className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* 1. Sahajanand Swami (Lord Swaminarayan) */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
          <img
            alt="Sahajanand Swami, founder of the Swaminarayan faith, in traditional saffron attire"
            className="h-auto w-full"
            decoding="async"
            src="/assets/brand/guru-parampara/sahajanand-swami.jpg"
          />
          <div className="p-6">
            <p className="font-semibold text-slate">
              Sahajanand Swami
            </p>
            <p className="mt-1 text-sm text-gray-600">
              Lord Swaminarayan, Founder
            </p>
          </div>
        </div>

        {/* 2. Gunatitanand Swami */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
          <img
            alt="Gunatitanand Swami, principal disciple and successor to Sahajanand Swami"
            className="h-auto w-full"
            decoding="async"
            src="/assets/brand/guru-parampara/gunatitanand-swami.jpg"
          />
          <div className="p-6">
            <p className="font-semibold text-slate">
              Gunatitanand Swami
            </p>
            <p className="mt-1 text-sm text-gray-600">
              Principal Disciple
            </p>
          </div>
        </div>

        {/* 3. Shastriji Maharaj */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
          <img
            alt="Shastriji Maharaj, spiritual leader who established Swaminarayan Aksharpith"
            className="h-auto w-full"
            decoding="async"
            src="/assets/brand/guru-parampara/shastriji-maharaj.jpg"
          />
          <div className="p-6">
            <p className="font-semibold text-slate">
              Shastriji Maharaj
            </p>
            <p className="mt-1 text-sm text-gray-600">
              Founder, Aksharpith
            </p>
          </div>
        </div>

        {/* 4. Yogiji Maharaj */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
          <img
            alt="Yogiji Maharaj, spiritual guide and advisor to the faithful"
            className="h-auto w-full"
            decoding="async"
            src="/assets/brand/guru-parampara/yogiji-maharaj.jpg"
          />
          <div className="p-6">
            <p className="font-semibold text-slate">
              Yogiji Maharaj
            </p>
            <p className="mt-1 text-sm text-gray-600">
              Spiritual Guide
            </p>
          </div>
        </div>

        {/* 5. H.H. Hariprasad Swamiji */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
          <img
            alt="H.H. Hariprasad Swamiji, founder of Haridham Sokhada and Yogi Divine Society"
            className="h-auto w-full"
            decoding="async"
            src="/assets/brand/guru-parampara/hariprasad-swamiji.jpg"
          />
          <div className="p-6">
            <p className="font-semibold text-slate">
              H.H. Hariprasad Swamiji
            </p>
            <p className="mt-1 text-sm text-gray-600">
              Founder, Haridham Sokhada / YDS
            </p>
          </div>
        </div>

        {/* 6. H.H. Premswaroop Swami Maharaj */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
          <img
            alt="H.H. Premswaroop Swami Maharaj, current spiritual leader and Guruhari"
            className="h-auto w-full"
            decoding="async"
            src="/assets/brand/guru-parampara/premswaroop-swami-maharaj.jpg"
          />
          <div className="p-6">
            <p className="font-semibold text-slate">
              H.H. Premswaroop Swami Maharaj
            </p>
            <p className="mt-1 text-sm text-gray-600">
              Current Guruhari
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

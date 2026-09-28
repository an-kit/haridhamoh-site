import { PageHeading, PageShell } from "@/components/page-shell";

export const metadata = { title: "Upasana" };

export default function UpasanaPage() {
  return (
    <PageShell>
      <PageHeading>Upasana</PageHeading>

      <section className="mt-12 rounded-2xl bg-white p-8 shadow-sm md:p-10">
        <div className="h-1 w-16 rounded-full bg-saffron" />
        <p className="mt-6 max-w-4xl text-lg leading-8 text-slate">
          Upasana means the mode and understanding of worship — not merely rituals,
          but the belief that shapes why and how we worship. At the heart of the
          Akshar Purushottam tradition is a single, central conviction: God
          (Purushottam) is always present on earth through the living Akshar — the
          perfect devotee and guru of the time.
        </p>
      </section>

      <section className="mt-8 rounded-2xl bg-white p-8 shadow-sm md:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">
          The Doctrine of Worship
        </p>
        <h2 className="mt-3 font-display text-4xl text-slate">
          Akshar Purushottam Siddhant
        </h2>
        <p className="mt-5 max-w-4xl leading-8 text-slate">
          This is the doctrine&apos;s full name: Purushottam is Bhagwan Swaminarayan
          himself, and Akshar is His ideal devotee, ever present in human form to
          guide seekers toward Him. Scripture and darshan (spiritual vision) are not
          enough on their own — true upasana means recognizing, honoring, and
          following the living Akshar of the time as the bridge to God.
        </p>
      </section>

      <section className="mt-8 rounded-2xl bg-white p-8 shadow-sm md:p-10">
        <h2 className="font-display text-4xl text-slate">The Living Guru</h2>
        <p className="mt-5 max-w-4xl leading-8 text-slate">
          This is why the Guru Parampara — the unbroken succession from Gunatitanand
          Swami to today&apos;s Guruhari, H.H. Premswaroop Swami Maharaj — matters so
          deeply to devotees. Each guru in this lineage has been recognized as the
          Akshar of his time.{" "}
          <a className="font-semibold text-saffron underline hover:text-saffron-dark" href="/guru-parampara/">
            See the full lineage
          </a>
          .
        </p>
      </section>

      <section className="mt-8 rounded-2xl bg-white p-8 shadow-sm md:p-10">
        <h2 className="font-display text-4xl text-slate">What This Means in Practice</h2>
        <p className="mt-5 max-w-4xl leading-8 text-slate">
          Upasana is lived, not just believed. It shapes daily aarti, the reverence
          shown to Thakorji in the mandir, and above all, the relationship a devotee
          builds with the living guru — seeking his guidance (agna) as the direct
          path to spiritual growth (Suhradbhav and Atmiyata flow from this same
          root: seeing the divine in the guru dissolves ego and distance).
        </p>
      </section>
    </PageShell>
  );
}

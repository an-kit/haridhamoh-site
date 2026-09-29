import { PageHeading, PageShell } from "@/components/page-shell";
import { ZeffyDonateLink } from "@/components/zeffy-donate-link";

export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <PageShell>
      <PageHeading>About Haridham Ohio</PageHeading>

      <div className="mt-10 space-y-10">
        <section className="rounded-2xl bg-white p-6 shadow-sm md:p-10">
          <h2 className="font-display text-4xl text-slate">Who We Are</h2>
          <p className="mt-5 max-w-4xl leading-8 text-slate">
            Haridham Ohio is the Hilliard-based chapter of HSAPSS USA (Haridham Sokhada Akshar Purushottam Swaminarayan Sanstha), part of the worldwide Yogi Divine Society – Haridham Sokhada, currently led by H.H. Pragat Guruhari Param Pujya Premswaroop Swami Maharaj. See our <a className="font-semibold text-saffron underline decoration-saffron/40 underline-offset-4" href="/guru-parampara/">Guru Parampara</a> page for the full lineage. We serve the Columbus/Hilliard satsang community with regular sabha, darshan, and community programming rooted in the Akshar-Purushottam Siddhant.
          </p>
        </section>

        <section className="rounded-2xl bg-cream p-6 md:p-10">
          <h2 className="font-display text-4xl text-slate">Mission, Vision &amp; Atmiyata</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <article className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="font-display text-3xl text-slate">Mission</h3>
              <p className="mt-4 leading-8 text-slate">To serve the individual, family, society and environment with a wide range of humanitarian and spiritual activities based on our deep-rooted faith in Lord Swaminarayan, to enable the highest quality of life.</p>
            </article>
            <article className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="font-display text-3xl text-slate">Vision</h3>
              <p className="mt-4 leading-8 text-slate">To serve society by providing spiritual services, cultural training, and other human services such as healthcare and educational activities, on a secular basis.</p>
            </article>
            <article className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="font-display text-3xl text-slate">Atmiyata</h3>
              <p className="mt-4 leading-8 text-slate">Our guiding philosophy — a form of spiritual harmony that transcends stubbornness, envy, and ego, uniting devotees as one spiritual family (Atmiya Pariwar).</p>
            </article>
          </div>
          <p className="mt-6 max-w-4xl leading-8 text-slate">These guiding values inform Haridham Ohio under the current spiritual guidance of H.D.H. Premswaroop Swamiji.</p>
        </section>

        <section className="rounded-2xl bg-white p-6 shadow-sm md:p-10">
          <h2 className="font-display text-4xl text-slate">Our Chapter</h2>
          <div className="mt-5 max-w-4xl space-y-5 leading-8 text-slate">
            <p>Our temple sits in the greater Columbus/Hilliard area, in a building with its own story: we purchased and converted a former Baptist church — already a place of worship — into our mandir. We chose to open its doors on July 26, 2024, the anniversary of our late guru H.D.H. Hariprasad Swamiji&apos;s Akshardham-gaman (his passing into Akshardham), carrying his presence into this new home.</p>
            <p>Haridham Ohio is guided today by H.D.H. Premswaroop Swamiji, whose message of Atmiyata shapes everything we do here, in service of the universal peace and harmony He envisions.</p>
            <p>Hariprasad Swamiji&apos;s own life motto was “Yuvako maru sarvasva chhe” — Youth is my life — and he often reminded us, “Yuvan dhare tevo thai shake”: a youth has the potential to become whatever he chooses. That spirit runs through how we build community here, with an emphasis on good company and helping the next generation grow.</p>
            <p>This site exists to give you a glimpse of that work and to keep our central Ohio satsang community informed on regular sabhas and upcoming events.</p>
          </div>
        </section>

        <section className="rounded-2xl bg-cream p-6 md:p-10">
          <h2 className="font-display text-4xl text-slate">Visit &amp; Get Involved</h2>
          <div className="mt-6 overflow-x-auto rounded-2xl bg-white shadow-sm">
            <table className="w-full min-w-[34rem] border-collapse text-left text-slate">
              <tbody>
                <tr className="border-b border-slate/10"><th className="w-40 px-6 py-4 font-semibold">Address</th><td className="px-6 py-4">4755 Jeannette Rd, Hilliard, OH 43026</td></tr>
                <tr className="border-b border-slate/10"><th className="px-6 py-4 font-semibold">Hours</th><td className="px-6 py-4">Daily 8AM–1PM, 4PM–9PM</td></tr>
                <tr className="border-b border-slate/10"><th className="px-6 py-4 font-semibold">Phone</th><td className="px-6 py-4">614.512.2761</td></tr>
                <tr className="border-b border-slate/10"><th className="px-6 py-4 font-semibold">Community</th><td className="px-6 py-4"><a className="font-semibold text-saffron underline decoration-saffron/40 underline-offset-4" href="https://chat.whatsapp.com/IBQ4cujX1CqFmgvz05Su1c?mode=gi_t" rel="noreferrer" target="_blank">Join our WhatsApp community</a></td></tr>
                <tr className="border-b border-slate/10"><th className="px-6 py-4 font-semibold">Instagram</th><td className="px-6 py-4"><a className="font-semibold text-saffron underline decoration-saffron/40 underline-offset-4" href="https://www.instagram.com/haridhamoh/" rel="noreferrer" target="_blank">@haridhamoh</a></td></tr>
                <tr className="border-b border-slate/10"><th className="px-6 py-4 font-semibold">Facebook</th><td className="px-6 py-4"><a className="font-semibold text-saffron underline decoration-saffron/40 underline-offset-4" href="https://www.facebook.com/people/Haridham-OH-Hindu-Swaminarayan-Temple/61566728870040/" rel="noreferrer" target="_blank">Haridham OH Hindu Swaminarayan Temple</a></td></tr>
                <tr><th className="px-6 py-4 font-semibold">Donate</th><td className="px-6 py-4"><ZeffyDonateLink className="font-semibold text-saffron underline decoration-saffron/40 underline-offset-4">Donate through Zeffy</ZeffyDonateLink></td></tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </PageShell>
  );
}

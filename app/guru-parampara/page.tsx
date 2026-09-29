import { PageHeading, PageShell } from "@/components/page-shell";

export const metadata = { title: "Guru Parampara" };

/**
 * Guru Parampara (Lineage) — approved expanded lineage content, 2026-09-28.
 * Portraits sourced from HSAPSS Canada Contentful CMS; optimized local JPG derivatives.
 */
const gurus = [
  {
    id: "sahajanand-swami",
    name: "Sahajanand Swami",
    title: "Lord Swaminarayan, Founder",
    imageStem: "sahajanand-swami",
    alt: "Sahajanand Swami, founder of the Swaminarayan faith, in traditional saffron attire",
    factLine: "1781–1830 · Born Ghanshyam Pande · Initiated name Sahajanand Swami · Born Chhapaiya, Uttar Pradesh",
    lifeWork: [
      "Founded the Swaminarayan Sampradaya, initiating hundreds of paramhansas (renunciant monks)",
      "Authored the Shikshapatri, a 212-verse code of conduct for followers",
      "Worked against social practices including sati and infanticide in the communities he taught in",
      "Established the Akshar-Purushottam philosophy that this lineage's later gurus carried forward",
    ],
    bio: "Sahajanand Swami is revered by followers as a manifestation of God (Purushottam) who came to reform religious and social practice in early 19th-century Gujarat. He left home at age 11 and traveled across India before settling in Gujarat, where he built a following that grew into the Swaminarayan Sampradaya. His teachings emphasized devotion (bhakti) paired with moral conduct (dharma), formalized in writings including the Shikshapatri. He established the practice of appointing a living spiritual successor (the Akshar) to guide the community after him — the principle this entire guru lineage is built on.",
  },
  {
    id: "gunatitanand-swami",
    name: "Gunatitanand Swami",
    title: "Principal Disciple",
    imageStem: "gunatitanand-swami",
    alt: "Gunatitanand Swami, principal disciple and successor to Sahajanand Swami",
    factLine: "1785–1867 · Born Mulji Sharma · Born Bhadra, Gujarat · Principal disciple of Sahajanand Swami",
    lifeWork: [
      "Identified by Sahajanand Swami as the first Akshar — the living ideal devotee/spiritual guide for the community",
      "Taught the Akshar-Purushottam Upasana (dual worship of the eternal abode Akshar together with Purushottam)",
      "Served as spiritual head of Junagadh and later Gondal mandirs",
      "Guided the community for over three decades after Sahajanand Swami's passing",
    ],
    bio: "Gunatitanand Swami is regarded as the first in the line of living Akshar gurus that this lineage traces. He served Sahajanand Swami directly and was recognized by him as the ideal devotee — a status this tradition holds each successive guru in this lineage carries. After Sahajanand Swami's passing in 1830, he continued teaching the Akshar-Purushottam philosophy for decades, shaping how it was understood and practiced by later generations of the Sampradaya.",
  },
  {
    id: "shastriji-maharaj",
    name: "Shastriji Maharaj",
    title: "Founder, Aksharpith",
    imageStem: "shastriji-maharaj",
    alt: "Shastriji Maharaj, spiritual leader who established Swaminarayan Aksharpith",
    factLine: "1865–1951 · Born Shankarbhai Patel · Born Mahelav, Gujarat",
    lifeWork: [
      "Continued the Akshar-Purushottam Upasana within the Swaminarayan Sampradaya",
      "Built multiple temples establishing the dual-worship (Akshar-Purushottam) form of mandir architecture",
      "Founded a separate institutional organization (Bochasanwasi Akshar Purushottam Sanstha) in 1907 to continue this teaching lineage",
      "Ordained and trained the next guru in this line, Yogiji Maharaj",
    ],
    bio: "Shastriji Maharaj carried forward the Akshar-Purushottam teachings within the broader Swaminarayan Sampradaya, and in 1907 founded a distinct organization to preserve and propagate them — the institution that today is known as BAPS.",
  },
  {
    id: "yogiji-maharaj",
    name: "Yogiji Maharaj",
    title: "Spiritual Guide",
    imageStem: "yogiji-maharaj",
    alt: "Yogiji Maharaj, spiritual guide and advisor to the faithful",
    factLine: "1892–1971 · Born Jina Bhai · Born Dhari, Gujarat",
    lifeWork: [
      "Trained and ordained under Shastriji Maharaj",
      "Traveled and taught widely, expanding the Akshar-Purushottam teachings to new regions and, for the first time, outside India",
      "Initiated Hariprasad Swamiji (then Prabhudas) into sainthood in 1965",
      "Known within the tradition for emphasizing personal spiritual practice alongside community service",
    ],
    bio: "Yogiji Maharaj continued the lineage from Shastriji Maharaj and is remembered for extending its reach considerably — both within India and, by the mid-20th century, to early followers abroad. In 1965 he initiated the young Prabhudas into sainthood as Hariprasad Swamiji, who would go on to found Haridham Sokhada / Yogi Divine Society in the early 1970s. Yogiji Maharaj is the last guru in this lineage shared in common between BAPS and Haridham Sokhada before that 1970s founding.",
  },
  {
    id: "hariprasad-swamiji",
    name: "H.H. Hariprasad Swamiji",
    title: "Founder, Haridham Sokhada / YDS",
    imageStem: "hariprasad-swamiji",
    alt: "H.H. Hariprasad Swamiji, founder of Haridham Sokhada and Yogi Divine Society",
    factLine: "1934 – July 26, 2021 · Born Prabhudas · Initiated into sainthood in 1965 by Yogiji Maharaj · Founder, Haridham Sokhada / Yogi Divine Society",
    lifeWork: [
      "Founded Yogi Divine Society / Haridham Sokhada as an independent organization in 1971–74, headquartered at Haridham, Sokhada Village, Vadodara, Gujarat",
      "Continued the Akshar-Purushottam Siddhant under his own continuation of the guru parampara, distinct from BAPS",
      "Grew the organization to 500+ centers worldwide (India, USA, Canada, UK, Australia, New Zealand, Germany, France, South Africa, Kenya)",
      "Emphasized Atmiyata (spiritual harmony, transcending ego and division) as a central teaching",
      "Appointed Premswaroop Swami Maharaj as President of Yogi Divine Society in 2018",
    ],
    bio: "Hariprasad Swamiji is the founder of the organization behind this website. Initiated into sainthood in 1965 by Yogiji Maharaj — the same guru lineage that BAPS traces — he went on to establish his own independent spiritual organization in the early 1970s, continuing the Akshar-Purushottam teachings through his own guru parampara. Under his leadership the organization grew to more than 500 centers across ten countries, with a teaching emphasis on Atmiyata: spiritual harmony and setting aside ego, stubbornness, and envy. He passed away on July 26, 2021, having appointed Premswaroop Swami Maharaj as his successor three years earlier.",
  },
  {
    id: "premswaroop-swami-maharaj",
    name: "H.H. Premswaroop Swami Maharaj",
    title: "Current Guruhari",
    imageStem: "premswaroop-swami-maharaj",
    alt: "H.H. Premswaroop Swami Maharaj, current spiritual leader and Guruhari",
    factLine: "Born Prafulbhai, December 27, 1945, Dharmaj, Gujarat · Current Guruhari, Yogi Divine Society – Haridham Sokhada",
    lifeWork: [
      "Appointed President of Yogi Divine Society by Hariprasad Swamiji in 2018",
      "Revealed as the sixth successor in the Gunatit Parampara after Hariprasad Swamiji's passing in 2021",
      "Leads all worldwide spiritual, social, and humanitarian efforts of Yogi Divine Society – Haridham Sokhada",
      "Has inaugurated 20+ mandirs worldwide and initiated new saints since 2021",
    ],
    bio: "Premswaroop Swami Maharaj is the current Pragat Guruhari (living spiritual head) of Yogi Divine Society – Haridham Sokhada, the sixth in the Gunatit Parampara this lineage traces from Sahajanand Swami. Appointed President by Hariprasad Swamiji in 2018, he was revealed as the spiritual successor following Hariprasad Swamiji's passing in 2021. Since then he has continued the organization's worldwide growth, inaugurating more than 20 new mandirs and initiating new saints into the order, while overseeing its spiritual, social, and humanitarian work — including the Haridham Ohio chapter this website represents.",
  },
] as const;

export default function GuruParamparaPage() {
  return (
    <PageShell>
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

      <nav aria-label="Guru Parampara sections" className="mt-8 overflow-x-auto rounded-2xl bg-cream p-3">
        <div className="flex w-max min-w-full gap-2">
          {gurus.map((guru) => (
            <a
              className="whitespace-nowrap rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate shadow-sm transition-colors hover:bg-saffron hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-saffron"
              href={`#${guru.id}`}
              key={guru.id}
            >
              {guru.name}
            </a>
          ))}
        </div>
      </nav>

      <div className="mt-10 space-y-10">
        {gurus.map((guru) => (
          <section className="scroll-mt-8 rounded-2xl bg-white p-6 shadow-sm md:p-10" id={guru.id} key={guru.id}>
            <div className="grid gap-8 md:grid-cols-[minmax(220px,310px)_1fr] md:items-start">
              <img
                alt={guru.alt}
                className="mx-auto h-auto w-full max-w-[310px] rounded-xl bg-cream md:mx-0"
                decoding="async"
                height={357}
                sizes="(min-width: 768px) 310px, min(100vw - 3rem, 310px)"
                src={`/assets/brand/guru-parampara/${guru.imageStem}-640.jpg`}
                srcSet={`/assets/brand/guru-parampara/${guru.imageStem}-320.jpg 320w, /assets/brand/guru-parampara/${guru.imageStem}-640.jpg 640w`}
                width={310}
              />
              <div>
                <p className="font-semibold uppercase tracking-[0.18em] text-saffron">Guru Parampara</p>
                <h2 className="mt-3 font-display text-4xl text-slate sm:text-5xl">{guru.name}</h2>
                <p className="mt-2 text-lg text-gray-600">{guru.title}</p>
                <p className="mt-5 border-l-4 border-saffron pl-4 text-sm font-semibold leading-7 text-slate">
                  {guru.factLine}
                </p>
                <h3 className="mt-7 font-display text-3xl text-slate">Life Work</h3>
                <ul className="mt-4 list-disc space-y-2 pl-5 leading-7 text-slate">
                  {guru.lifeWork.map((item) => <li key={item}>{item}</li>)}
                </ul>
                <p className="mt-7 leading-8 text-slate">{guru.bio}</p>
              </div>
            </div>
          </section>
        ))}
      </div>
    </PageShell>
  );
}

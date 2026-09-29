import { render, screen, within } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  usePathname: () => window.location.pathname,
}));

import { ContactMap } from "@/components/contact-map";
import { EventCollection } from "@/components/event-collection";
import { SacredImage } from "@/components/sacred-image";
import AboutPage from "@/app/about/page";
import DonatePage from "@/app/donate/page";
import HomePage from "@/app/page";
import GuruParamparaPage from "@/app/guru-parampara/page";
import UpasanaPage from "@/app/upasana/page";
import RootLayout from "@/app/layout";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { loadSiteFacts } from "@/lib/content/schema";

describe("public site components", () => {
  it("renders required navigation routes and Zeffy-only donation action", () => {
    render(<SiteHeader />);

    expect(screen.getByRole("link", { name: "Haridham Ohio" })).toHaveAttribute(
      "href",
      "/",
    );

    for (const label of [
      "About",
      "Upasana",
      "Events",
      "Guru Parampara",
      "Centers",
      "Contact",
      "Donate",
    ]) {
      expect(screen.getByRole("link", { name: label })).toBeInTheDocument();
    }

    expect(screen.getByRole("link", { name: /donate/i })).toHaveAttribute(
      "zeffy-form-link",
      "https://www.zeffy.com/embed/donation-form/haridham-ohio-hsapss?modal=true",
    );
  });

  it("marks the matching nav route active, including event detail routes", () => {
    window.history.replaceState({}, "", "/about/");
    const aboutHeader = render(<SiteHeader />);
    expect(within(aboutHeader.container).getByRole("link", { name: "About" })).toHaveAttribute("aria-current", "page");
    expect(within(aboutHeader.container).getByRole("link", { name: "Events" })).not.toHaveAttribute("aria-current");

    window.history.replaceState({}, "", "/events/annakut-2026-haridham-ohio-hsapss/");
    const eventHeader = render(<SiteHeader />);
    expect(within(eventHeader.container).getByRole("link", { name: "Events" })).toHaveAttribute("aria-current", "page");

    window.history.replaceState({}, "", "/");
  });

  it("renders accessible Instagram, Facebook, and WhatsApp icon links without replacing the WhatsApp text link", () => {
    const footer = render(<SiteFooter />);
    const content = within(footer.container);

    expect(content.getByRole("link", { name: "Instagram" })).toHaveAttribute(
      "href",
      "https://www.instagram.com/haridhamoh/",
    );
    expect(content.getByRole("link", { name: "Facebook" })).toHaveAttribute(
      "href",
      "https://www.facebook.com/people/Haridham-OH-Hindu-Swaminarayan-Temple/61566728870040/",
    );
    expect(content.getByRole("link", { name: "WhatsApp" })).toHaveAttribute(
      "href",
      "https://chat.whatsapp.com/IBQ4cujX1CqFmgvz05Su1c?mode=gi_t",
    );
    expect(content.getByRole("link", { name: "Join WhatsApp community" })).toHaveAttribute(
      "href",
      "https://chat.whatsapp.com/IBQ4cujX1CqFmgvz05Su1c?mode=gi_t",
    );
  });

  it("renders the approved Haridham Ohio logo and responsive homepage hero", () => {
    const header = render(<SiteHeader />);

    expect(within(header.container).getByRole("img", { name: "Haridham Ohio logo" })).toHaveAttribute(
      "src",
      "/assets/brand/hsapss-logo-header-256.png",
    );

    render(<HomePage />);

    expect(screen.getByRole("img", { name: "Haridham Ohio darshan and temple" }))
      .toHaveAttribute("src", "/assets/brand/haridham-ohio-darshan-hero-desktop.jpg");
    expect(screen.getByRole("link", { name: "Donate through Zeffy" })).toHaveAttribute(
      "zeffy-form-link",
      "https://www.zeffy.com/embed/donation-form/haridham-ohio-hsapss?modal=true",
    );
  });

  it("renders the approved About sections, exact community links, and Zeffy modal trigger", () => {
    const about = render(<AboutPage />);
    const page = within(about.container);

    for (const heading of ["Who We Are", "Mission, Vision & Atmiyata", "Our Chapter", "Visit & Get Involved"]) {
      expect(page.getByRole("heading", { level: 2, name: heading })).toBeInTheDocument();
    }

    expect(page.getByText(/H.H. Pragat Guruhari Param Pujya Premswaroop Swami Maharaj/i)).toBeInTheDocument();
    expect(page.getByText(/Yuvako maru sarvasva chhe/i)).toBeInTheDocument();
    expect(page.getByRole("link", { name: "Guru Parampara" })).toHaveAttribute("href", "/guru-parampara/");
    expect(page.getByRole("link", { name: "Join our WhatsApp community" })).toHaveAttribute(
      "href",
      "https://chat.whatsapp.com/IBQ4cujX1CqFmgvz05Su1c?mode=gi_t",
    );
    expect(page.getByRole("link", { name: "@haridhamoh" })).toHaveAttribute(
      "href",
      "https://www.instagram.com/haridhamoh/",
    );
    expect(page.getByRole("link", { name: "Haridham OH Hindu Swaminarayan Temple" })).toHaveAttribute(
      "href",
      "https://www.facebook.com/people/Haridham-OH-Hindu-Swaminarayan-Temple/61566728870040/",
    );
    expect(page.getByRole("link", { name: "Donate through Zeffy" })).toHaveAttribute(
      "zeffy-form-link",
      "https://www.zeffy.com/embed/donation-form/haridham-ohio-hsapss?modal=true",
    );
  });

  it("loads Zeffy globally and uses the modal trigger on the Donate page", () => {
    const layout = renderToStaticMarkup(<RootLayout><p>Layout probe</p></RootLayout>);
    expect(layout).toContain('<script src="https://zeffy-scripts.s3.ca-central-1.amazonaws.com/embed-form-script.min.js"></script>');

    const donate = render(<DonatePage />);
    expect(within(donate.container).getByRole("link", { name: "Donate through Zeffy" })).toHaveAttribute(
      "zeffy-form-link",
      "https://www.zeffy.com/embed/donation-form/haridham-ohio-hsapss?modal=true",
    );
  });

  it("renders the Akshar Purushottam Siddhant doctrine and lineage link", () => {
    render(<UpasanaPage />);

    expect(screen.getByRole("heading", { level: 1, name: "Upasana" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "Akshar Purushottam Siddhant" }))
      .toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "The Living Guru" }))
      .toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "What This Means in Practice" }))
      .toBeInTheDocument();
    expect(screen.getByText(/Upasana means the mode and understanding of worship/i))
      .toBeInTheDocument();
    expect(screen.getByRole("link", { name: "See the full lineage" }))
      .toHaveAttribute("href", "/guru-parampara/");
  });

  it("renders the approved Guru Parampara biography sections and anchor navigation", () => {
    render(<GuruParamparaPage />);

    const lineage = [
      ["Sahajanand Swami", "sahajanand-swami"],
      ["Gunatitanand Swami", "gunatitanand-swami"],
      ["Shastriji Maharaj", "shastriji-maharaj"],
      ["Yogiji Maharaj", "yogiji-maharaj"],
      ["H.H. Hariprasad Swamiji", "hariprasad-swamiji"],
      ["H.H. Premswaroop Swami Maharaj", "premswaroop-swami-maharaj"],
    ];

    for (const [name, anchor] of lineage) {
      expect(screen.getByRole("link", { name })).toHaveAttribute("href", `#${anchor}`);
      expect(document.getElementById(anchor)).toHaveTextContent(name);
    }

    expect(screen.getAllByText("Life Work")).toHaveLength(6);
    expect(screen.getByText(/Founded a distinct organization to preserve and propagate them/i))
      .toBeInTheDocument();
    expect(screen.getByText(/last guru in this lineage shared in common between BAPS and Haridham Sokhada/i))
      .toBeInTheDocument();
    expect(screen.getByText(/founder of the organization behind this website/i)).toBeInTheDocument();
  });

  it("caps Guru Parampara portraits and serves responsive 320w and 640w derivatives", () => {
    const page = render(<GuruParamparaPage />);

    const portraits = [
      ["Sahajanand Swami, founder of the Swaminarayan faith, in traditional saffron attire", "sahajanand-swami"],
      ["Gunatitanand Swami, principal disciple and successor to Sahajanand Swami", "gunatitanand-swami"],
      ["Shastriji Maharaj, spiritual leader who established Swaminarayan Aksharpith", "shastriji-maharaj"],
      ["Yogiji Maharaj, spiritual guide and advisor to the faithful", "yogiji-maharaj"],
      ["H.H. Hariprasad Swamiji, founder of Haridham Sokhada and Yogi Divine Society", "hariprasad-swamiji"],
      ["H.H. Premswaroop Swami Maharaj, current spiritual leader and Guruhari", "premswaroop-swami-maharaj"],
    ];

    for (const [alt, filename] of portraits) {
      const portrait = within(page.container).getByAltText(alt);
      expect(portrait).toHaveAttribute("src", `/assets/brand/guru-parampara/${filename}-640.jpg`);
      expect(portrait).toHaveAttribute(
        "srcset",
        `/assets/brand/guru-parampara/${filename}-320.jpg 320w, /assets/brand/guru-parampara/${filename}-640.jpg 640w`,
      );
      expect(portrait).toHaveAttribute("sizes", "(min-width: 768px) 310px, min(100vw - 3rem, 310px)");
      expect(portrait).toHaveAttribute("width", "310");
      expect(portrait).toHaveAttribute("height", "357");
      expect(portrait).toHaveClass("max-w-[310px]");
    }
  });

  it("uses a static map image and directions derived from site facts", () => {
    render(<ContactMap siteFacts={loadSiteFacts()} />);

    expect(screen.getByAltText(/map overview/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /get directions/i })).toHaveAttribute(
      "href",
      expect.stringContaining(encodeURIComponent("4755 Jeannette Rd, Hilliard, OH 43026")),
    );
  });

  it("renders sacred imagery without a motion wrapper", () => {
    render(
      <SacredImage
        src="/uploads/guru.jpg"
        alt="Guru Parampara"
        width={320}
        height={240}
      />,
    );

    expect(screen.getByAltText("Guru Parampara").closest("[data-motion]"))
      .toBeNull();
  });

  it("renders all event cards as static HTML and ships a view-time New York lifecycle script", () => {
    render(
      <EventCollection
        events={[
          {
            title: "Past event",
            date: "2020-01-01",
            startTime: "08:00",
            endTime: "09:00",
            location: "Haridham Ohio",
            image: "/uploads/events/past.jpg",
            description: "Past event.",
          },
          {
            title: "Future event",
            date: "2099-01-01",
            startTime: "08:00",
            endTime: "09:00",
            location: "Haridham Ohio",
            image: "/uploads/events/future.jpg",
            description: "Future event.",
          },
        ]}
      />,
    );

    expect(screen.getByText("Past event")).toBeInTheDocument();
    expect(screen.getByText("Future event")).toBeInTheDocument();
    const script = document.querySelector("script")?.textContent ?? "";
    expect(script).toContain("America/New_York");
    expect(script).toContain("dataset.eventEnd");
  });
});

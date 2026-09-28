import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ContactMap } from "@/components/contact-map";
import { EventCollection } from "@/components/event-collection";
import { SacredImage } from "@/components/sacred-image";
import HomePage from "@/app/page";
import UpasanaPage from "@/app/upasana/page";
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
      "href",
      "/donate",
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

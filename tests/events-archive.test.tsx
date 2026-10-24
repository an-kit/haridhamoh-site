import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { EventDetail } from "@/components/event-detail";
import { EventsArchive } from "@/components/events-archive";
import type { Event } from "@/lib/content/schema";
import { createEventJsonLd } from "@/lib/content/jsonld";

const photos = [1, 2, 3, 4].map((index) => ({
  type: "photo" as const,
  src: `/uploads/events/past/0${index}.jpg`,
  thumb: `/uploads/events/past/0${index}-thumb.jpg`,
  alt: `Past photo ${index}`,
  caption: `Caption ${index}`,
}));

const pastWithMedia: Event = {
  title: "Past with media",
  date: "2025-05-01",
  startTime: "10:00",
  endTime: "12:00",
  location: "Haridham Ohio",
  image: "/uploads/events/past-poster.jpg",
  description: "Original description.",
  recap: "What a day we shared.",
  media: [...photos, { type: "youtube", videoId: "dQw4w9WgXcQ", title: "Past recap video" }],
};

const pastWithoutMedia: Event = {
  title: "Past without media",
  date: "2024-06-01",
  startTime: "10:00",
  endTime: "12:00",
  location: "Haridham Ohio",
  image: "/uploads/events/older-poster.jpg",
  description: "Older event.",
};

const upcoming: Event = {
  title: "Upcoming event",
  date: "2026-12-01",
  startTime: "10:00",
  endTime: "12:00",
  location: "Haridham Ohio",
  image: "/uploads/events/upcoming.jpg",
  description: "Coming soon.",
};

describe("events archive", () => {
  it("renders upcoming and past sections with badge, year headings, and poster fallback", () => {
    render(<EventsArchive events={[upcoming, pastWithMedia, pastWithoutMedia]} />);

    expect(screen.getByText("See past events ↓")).toBeInTheDocument();
    const upcomingSection = document.querySelector<HTMLElement>('[data-event-section="upcoming"]');
    expect(upcomingSection).not.toBeNull();
    if (!upcomingSection) return;
    expect(within(upcomingSection).getByText("Upcoming event")).toBeInTheDocument();
    const pastSection = document.querySelector<HTMLElement>('[data-event-section="past"]');
    expect(pastSection).not.toBeNull();
    if (!pastSection) return;
    expect(within(pastSection).getByText("4 photos · 1 video")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "2025" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "2024" })).toBeInTheDocument();

    const older = screen.getAllByAltText("Event artwork for Past without media")[0];
    expect(older).toHaveAttribute("src", "/uploads/events/older-poster.jpg");

    const cover = screen.getAllByAltText("Past photo 1")[0];
    expect(cover).toHaveAttribute("src", "/uploads/events/past/01-thumb.jpg");
  });

  it("adds past photo URLs to the Event JSON-LD image array", () => {
    const jsonLd = createEventJsonLd(pastWithMedia);
    expect(Array.isArray(jsonLd.image)).toBe(true);
    expect(jsonLd.image).toHaveLength(5);
    expect(jsonLd.image).toContain("https://haridhamoh.org/uploads/events/past/01.jpg");
  });
});

describe("past event detail", () => {
  it("shows the banner and recap, hides actions and Sabha line, and renders gallery alt text", () => {
    render(<EventDetail event={pastWithMedia} />);

    expect(screen.getByText(/This event took place on Thursday, May 1, 2025/)).toBeInTheDocument();
    expect(screen.getByText("What a day we shared.")).toBeInTheDocument();

    const pastBlock = document.querySelector<HTMLElement>("[data-detail-past]");
    expect(pastBlock).not.toBeNull();
    if (!pastBlock) return;

    expect(within(pastBlock).queryByRole("link", { name: "Add to Calendar" })).toBeNull();
    expect(within(pastBlock).queryByRole("link", { name: "Event Seva" })).toBeNull();
    expect(within(pastBlock).queryByText(/Sabha starts at/)).toBeNull();

    const gallery = pastBlock.querySelector("[data-gallery]");
    expect(gallery).not.toBeNull();
    if (!gallery) return;
    const images = Array.from((gallery as HTMLElement).querySelectorAll("img"));
    expect(images).toHaveLength(9);
    for (const image of images) {
      expect(image).toHaveAttribute("alt");
      expect(image.getAttribute("alt")).not.toBe("");
    }
    expect(within(gallery as HTMLElement).getByText("1 of 4")).toBeInTheDocument();
    expect(
      within(gallery as HTMLElement).getByRole("button", { name: "Play Past recap video" }),
    ).toBeInTheDocument();
  });
});

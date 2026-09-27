import { describe, expect, it } from "vitest";

import { createEventJsonLd, placeOfWorshipJsonLd } from "@/lib/content/jsonld";
import {
  EventSchema,
  SiteFactsSchema,
  loadEvents,
  loadSiteFacts,
} from "@/lib/content/schema";
import {
  getNextUpcomingEvents,
  isUpcomingEvent,
} from "@/lib/events/lifecycle";

describe("site facts content", () => {
  it("loads the approved site facts from one validated content record", () => {
    expect(loadSiteFacts()).toMatchObject({
      address: "4755 Jeannette Rd, Hilliard, OH 43026",
      phone: "614.512.2761",
      darshanHours: "Sun–Sat 8AM–1PM, 4PM–9PM",
    });
  });

  it("rejects an incomplete site-facts record", () => {
    expect(() => SiteFactsSchema.parse({ phone: "614.512.2761" })).toThrow();
  });
});

describe("event content", () => {
  const multiDayEvent = {
    title: "Sharad Purnima",
    date: "2026-09-27",
    endDate: "2026-09-29",
    startTime: "18:00",
    endTime: "20:00",
    location: "Haridham Ohio",
    image: "/uploads/events/sharad-purnima.jpg",
    description: "A multi-day observance.",
  };

  it("accepts multi-day events and rejects an end date before the start date", () => {
    expect(EventSchema.parse(multiDayEvent).endDate).toBe("2026-09-29");
    expect(() =>
      EventSchema.parse({ ...multiDayEvent, endDate: "2026-09-26" }),
    ).toThrow();
  });

  it("loads the approved Annakut 2026 event without inventing an end time for Mahaprasad", () => {
    expect(loadEvents()).toEqual([
      {
        title: "Annakut 2026 – Haridham Ohio (HSAPSS)",
        date: "2026-10-24",
        startTime: "10:30",
        endTime: "12:00",
        endTimeNote: "12:00 is an approximate end time for Sabha only; Mahaprasad follows with no fixed end time.",
        location: "4755 Jeannette Rd, Hilliard, OH 43026",
        image: "/uploads/events/annakut-2026.jpg",
        zeffyUrl: "https://www.zeffy.com/en-US/ticketing/annakut-2026-haridham-ohio-hsapss",
        description: "Join us for Annakut 2026, celebrating 200 years of the Shikshapatri, as devotees offer a mountain of prasad to Thakorji. Sabha followed by Mahaprasad.",
      },
    ]);
  });
});

describe("view-time event lifecycle", () => {
  const now = new Date("2026-09-28T16:00:00.000Z"); // 12:00 America/New_York
  const events = [
    {
      title: "Elapsed",
      date: "2026-09-27",
      startTime: "08:00",
      endTime: "09:00",
      location: "Haridham Ohio",
      image: "/uploads/events/elapsed.jpg",
      description: "Elapsed event.",
    },
    {
      title: "Multi-day",
      date: "2026-09-27",
      endDate: "2026-09-29",
      startTime: "18:00",
      endTime: "20:00",
      location: "Haridham Ohio",
      image: "/uploads/events/multi-day.jpg",
      description: "Still upcoming.",
    },
    {
      title: "Later",
      date: "2026-10-04",
      startTime: "10:00",
      endTime: "11:00",
      location: "Haridham Ohio",
      image: "/uploads/events/later.jpg",
      description: "Later event.",
    },
  ];

  it("hides elapsed events and keeps a multi-day event upcoming through its end date", () => {
    expect(isUpcomingEvent(events[0], now)).toBe(false);
    expect(isUpcomingEvent(events[1], now)).toBe(true);
  });

  it("selects the next upcoming events in America/New_York", () => {
    expect(getNextUpcomingEvents(events, now).map((event) => event.title)).toEqual([
      "Multi-day",
      "Later",
    ]);
  });
});

describe("structured data", () => {
  it("derives PlaceOfWorship JSON-LD from approved site facts", () => {
    const jsonLd = placeOfWorshipJsonLd(loadSiteFacts());
    expect(jsonLd).toMatchObject({
      "@type": "PlaceOfWorship",
      telephone: "614.512.2761",
      address: { streetAddress: "4755 Jeannette Rd" },
    });
  });

  it("emits ISO 8601 New York offsets and uses endDate for multi-day events", () => {
    const jsonLd = createEventJsonLd(
      EventSchema.parse({
        title: "Sharad Purnima",
        date: "2026-11-01",
        endDate: "2026-11-02",
        startTime: "08:00",
        endTime: "09:00",
        location: "Haridham Ohio",
        image: "/uploads/events/sharad-purnima.jpg",
        description: "A multi-day observance.",
      }),
    );

    expect(jsonLd.startDate).toBe("2026-11-01T08:00:00-05:00");
    expect(jsonLd.endDate).toBe("2026-11-02T09:00:00-05:00");
  });

  it("omits an exact JSON-LD endDate when the supplied end time is explicitly approximate", () => {
    const jsonLd = createEventJsonLd(EventSchema.parse({
      title: "Annakut 2026 – Haridham Ohio (HSAPSS)",
      date: "2026-10-24",
      startTime: "10:30",
      endTime: "12:00",
      endTimeNote: "12:00 is an approximate end time for Sabha only; Mahaprasad follows with no fixed end time.",
      location: "4755 Jeannette Rd, Hilliard, OH 43026",
      image: "/uploads/events/annakut-2026.jpg",
      description: "Annakut event.",
    }));

    expect(jsonLd.startDate).toBe("2026-10-24T10:30:00-04:00");
    expect(jsonLd).not.toHaveProperty("endDate");
    expect(jsonLd.description).toBe("Annakut event.");
  });
});

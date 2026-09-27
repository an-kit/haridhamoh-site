import { describe, expect, it } from "vitest";

import { generateStaticParams } from "@/app/events/[slug]/page";
import { loadEvents } from "@/lib/content/schema";
import { isUpcomingEvent } from "@/lib/events/lifecycle";

describe("approved Annakut route and lifecycle", () => {
  it("provides a static export parameter for the approved event", () => {
    expect(generateStaticParams()).toEqual([
      { slug: "annakut-2026-haridham-ohio-hsapss" },
    ]);
  });

  it("is upcoming before October 24 and elapsed after October 24 in America/New_York", () => {
    const [event] = loadEvents();
    expect(isUpcomingEvent(event, new Date("2026-09-27T16:00:00.000Z"))).toBe(true);
    expect(isUpcomingEvent(event, new Date("2026-10-25T16:00:00.000Z"))).toBe(false);
  });
});

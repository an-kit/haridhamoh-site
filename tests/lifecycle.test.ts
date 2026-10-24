import { describe, expect, it } from "vitest";

import {
  isPastEvent,
  isUpcomingEvent,
  newYorkDate,
  renderEventLifecycleScript,
} from "@/lib/events/lifecycle";

describe("New York event date classification", () => {
  it("uses the New York calendar date across UTC midnight", () => {
    expect(newYorkDate(new Date("2026-10-25T03:30:00.000Z"))).toBe("2026-10-24");
    expect(newYorkDate(new Date("2026-10-25T04:30:00.000Z"))).toBe("2026-10-25");
  });

  it("treats a single-day event as upcoming on its date and past the next day", () => {
    const event = { date: "2026-10-24" };
    expect(isPastEvent(event, new Date("2026-10-24T16:00:00.000Z"))).toBe(false);
    expect(isPastEvent(event, new Date("2026-10-25T04:30:00.000Z"))).toBe(true);
    expect(isUpcomingEvent(event as never, new Date("2026-10-25T04:30:00.000Z"))).toBe(false);
  });

  it("keeps a multi-day event upcoming through its end date", () => {
    const event = { date: "2026-10-24", endDate: "2026-10-26" };
    expect(isPastEvent(event, new Date("2026-10-26T16:00:00.000Z"))).toBe(false);
    expect(isPastEvent(event, new Date("2026-10-27T04:30:00.000Z"))).toBe(true);
  });
});

describe("inline lifecycle script", () => {
  it("is built from the same functions and has no module references", () => {
    const script = renderEventLifecycleScript();
    expect(script).toContain("America/New_York");
    expect(script).not.toMatch(/\bimport\b|\brequire\s*\(|module\.exports/);
    expect(() => new Function(script)).not.toThrow();
  });

  it("toggles hidden attributes without moving nodes", () => {
    if (!globalThis.requestAnimationFrame) {
      globalThis.requestAnimationFrame = ((callback: FrameRequestCallback) =>
        setTimeout(callback, 0)) as typeof requestAnimationFrame;
    }

    document.body.innerHTML = `
      <div data-events-page>
        <a data-past-jump hidden></a>
        <section data-event-section="upcoming">
          <a data-event-card data-event-list="upcoming" data-event-start="2000-01-01" data-event-end="2000-01-01"></a>
          <a data-event-card data-event-list="upcoming" data-event-start="2999-01-01" data-event-end="2999-01-01"></a>
        </section>
        <section data-event-section="past" hidden>
          <a data-event-card data-event-list="past" data-event-start="2000-01-01" data-event-end="2000-01-01"></a>
          <a data-event-card data-event-list="past" data-event-start="2999-01-01" data-event-end="2999-01-01"></a>
        </section>
        <div data-event-empty="upcoming" hidden></div>
      </div>`;

    new Function(renderEventLifecycleScript())();

    const [pastOld, futureOld] = Array.from(
      document.querySelectorAll('[data-event-card][data-event-list="upcoming"]'),
    ) as HTMLElement[];
    const [pastOldPast, futureOldPast] = Array.from(
      document.querySelectorAll('[data-event-card][data-event-list="past"]'),
    ) as HTMLElement[];

    expect(pastOld.hidden).toBe(true);
    expect(futureOld.hidden).toBe(false);
    expect(pastOldPast.hidden).toBe(false);
    expect(futureOldPast.hidden).toBe(true);
    expect(document.querySelector<HTMLElement>("[data-event-empty]")?.hidden).toBe(true);
    expect(document.querySelector<HTMLElement>("[data-past-jump]")?.hidden).toBe(false);
  });
});

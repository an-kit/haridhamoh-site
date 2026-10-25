import type { Event } from "@/lib/content/schema";

/**
 * Single source of truth for the New York calendar date and the Upcoming/Past
 * decision. This function is stringified into the inline client script, so it
 * must stay self-contained: no imports, no module-scope references, only Intl
 * and its arguments.
 */
export function eventLifecycleState(
  now: Date,
  event?: { date: string; endDate?: string },
): { today: string; past: boolean } {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const part = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((item) => item.type === type)?.value ?? "";
  const today = `${part("year")}-${part("month")}-${part("day")}`;
  const past = event ? (event.endDate ?? event.date) < today : false;

  return { today, past };
}

export function newYorkDate(now: Date = new Date()): string {
  return eventLifecycleState(now).today;
}

/**
 * An event is past once its inclusive end date (or its date) is before today
 * in America/New_York.
 */
export function isPastEvent(
  event: { date: string; endDate?: string },
  now: Date = new Date(),
): boolean {
  return eventLifecycleState(now, event).past;
}

export function isUpcomingEvent(event: Event, now = new Date()): boolean {
  return !isPastEvent(event, now);
}

export function getNextUpcomingEvents(events: Event[], now = new Date()): Event[] {
  return events
    .filter((event) => isUpcomingEvent(event, now))
    .sort((left, right) => left.date.localeCompare(right.date));
}

export function getPastEvents(events: Event[], now = new Date()): Event[] {
  return events
    .filter((event) => isPastEvent(event, now))
    .sort((left, right) =>
      (right.endDate ?? right.date).localeCompare(left.endDate ?? left.date),
    );
}

/**
 * Applies the shared lifecycle decision to server-rendered event markup. This
 * runner only toggles `hidden`; it never moves, creates, removes, or sorts DOM
 * nodes. `state` is an argument so this function can be stringified for the
 * parser-inserted first-paint script without a module closure.
 */
export function applyEventLifecycle(
  document: Document,
  now: Date,
  state: typeof eventLifecycleState,
): void {
  const page = document.querySelector("[data-events-page]");
  if (page) {
    const cards = Array.from(page.querySelectorAll<HTMLElement>("[data-event-card]"));
    let visibleUpcoming = 0;
    let visiblePast = 0;
    const visibleYears = new Set<string>();
    cards.forEach((card) => {
      const past = state(now, { date: card.dataset.eventStart ?? "", endDate: card.dataset.eventEnd }).past;
      const inPastList = card.dataset.eventList === "past";
      const visible = inPastList ? past : !past;
      card.hidden = !visible;
      if (visible && inPastList) {
        visiblePast += 1;
        visibleYears.add(card.dataset.eventYear ?? "");
      }
      if (visible && !inPastList) visibleUpcoming += 1;
    });
    const empty = page.querySelector<HTMLElement>('[data-event-empty="upcoming"]');
    if (empty) empty.hidden = visibleUpcoming > 0;
    const pastSection = page.querySelector<HTMLElement>('[data-event-section="past"]');
    if (pastSection) pastSection.hidden = visiblePast === 0;
    const jump = page.querySelector<HTMLElement>("[data-past-jump]");
    if (jump) jump.hidden = !(visibleUpcoming > 0 && visiblePast > 0);
    const grouping = visiblePast > 6 || visibleYears.size > 1;
    page.querySelectorAll<HTMLElement>("[data-year-heading]").forEach((heading) => {
      heading.hidden = !grouping || !visibleYears.has(heading.dataset.yearHeading ?? "");
    });
  }

  const home = document.querySelector("[data-home-events]");
  if (home) {
    let shown = 0;
    home.querySelectorAll<HTMLElement>("[data-home-upcoming] [data-event-card]").forEach((card) => {
      const past = state(now, { date: card.dataset.eventStart ?? "", endDate: card.dataset.eventEnd }).past;
      const visible = !past && shown < 3;
      card.hidden = !visible;
      if (visible) shown += 1;
    });
    let shownHighlights = 0;
    home.querySelectorAll<HTMLElement>("[data-home-highlights] [data-event-card]").forEach((card) => {
      const past = state(now, { date: card.dataset.eventStart ?? "", endDate: card.dataset.eventEnd }).past;
      const visible = past && shownHighlights < 1;
      card.hidden = !visible;
      if (visible) shownHighlights += 1;
    });
    const upcomingBlock = home.querySelector<HTMLElement>("[data-home-upcoming]");
    if (upcomingBlock) upcomingBlock.hidden = shown === 0;
    const highlightsBlock = home.querySelector<HTMLElement>("[data-home-highlights]");
    if (highlightsBlock) highlightsBlock.hidden = shown > 0;
    const emptyHighlights = home.querySelector<HTMLElement>("[data-home-highlights-empty]");
    if (emptyHighlights) emptyHighlights.hidden = !(shown === 0 && shownHighlights === 0);
  }

  const detail = document.querySelector<HTMLElement>("[data-event-detail]");
  if (detail) {
    const past = state(now, { date: detail.dataset.eventStart ?? "", endDate: detail.dataset.eventEnd }).past;
    const upcoming = detail.querySelector<HTMLElement>("[data-detail-upcoming]");
    const pastBlock = detail.querySelector<HTMLElement>("[data-detail-past]");
    if (upcoming) upcoming.hidden = past;
    if (pastBlock) pastBlock.hidden = !past;
  }
}

/**
 * Build the inline lifecycle script from the same classifier and DOM apply
 * function used by the client route component.
 */
export function renderEventLifecycleScript(): string {
  return `(() => {
  const eventLifecycleState = ${eventLifecycleState.toString()};
  const applyEventLifecycle = ${applyEventLifecycle.toString()};
  const apply = () => applyEventLifecycle(document, new Date(), eventLifecycleState);
  apply();
  requestAnimationFrame(apply);
})();`;
}

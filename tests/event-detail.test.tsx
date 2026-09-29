import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { EventDetail } from "@/components/event-detail";
import { createEventCalendarDataUrl } from "@/lib/events/calendar";
import { eventSlug } from "@/lib/events/slug";
import { loadEvents } from "@/lib/content/schema";

describe("event detail public copy", () => {
  it("does not render the non-public end-time editorial note", () => {
    const [event] = loadEvents();
    render(<EventDetail event={event} />);

    expect(screen.getByText(event.description)).toBeInTheDocument();
    expect(screen.queryByText(event.endTimeNote ?? "")).not.toBeInTheDocument();
    expect(screen.queryByText("Sabha: 10:30 AM–12:00 PM")).not.toBeInTheDocument();
  });

  it("offers a downloadable calendar entry using public event date, start time, and location", () => {
    const [event] = loadEvents();
    const calendarUrl = createEventCalendarDataUrl(event);
    const calendar = decodeURIComponent(calendarUrl.replace("data:text/calendar;charset=utf-8,", ""));

    expect(calendar).toContain("BEGIN:VCALENDAR");
    expect(calendar).toContain("DTSTART;TZID=America/New_York:20261024T103000");
    expect(calendar).toContain("LOCATION:4755 Jeannette Rd\\, Hilliard\\, OH 43026");
    expect(calendar).toContain("SUMMARY:Annakut 2026 – Haridham Ohio (HSAPSS)");
    expect(calendar).not.toContain(event.endTimeNote ?? "");
    expect(calendar).not.toContain("DTEND");

    const detail = render(<EventDetail event={event} />);
    const link = within(detail.container).getByRole("link", { name: "Add to Calendar" });
    expect(link).toHaveAttribute("href", calendarUrl);
    expect(link).toHaveAttribute("download", `${eventSlug(event.title)}.ics`);
  });
});

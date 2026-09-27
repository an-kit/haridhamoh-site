import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { EventDetail } from "@/components/event-detail";
import { loadEvents } from "@/lib/content/schema";

describe("event detail public copy", () => {
  it("does not render the non-public end-time editorial note", () => {
    const [event] = loadEvents();
    render(<EventDetail event={event} />);

    expect(screen.getByText(event.description)).toBeInTheDocument();
    expect(screen.queryByText(event.endTimeNote ?? "")).not.toBeInTheDocument();
    expect(screen.queryByText("Sabha: 10:30 AM–12:00 PM")).not.toBeInTheDocument();
  });
});

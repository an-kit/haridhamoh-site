import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CentersList } from "@/components/centers-list";
import { loadCenters } from "@/lib/content/schema";

describe("approved centers", () => {
  it("loads the four approved destinations with no invented New Jersey URL", () => {
    expect(loadCenters()).toEqual([
      { name: "Vadodara, India", url: "https://shaharidham.org/" },
      { name: "New Jersey" },
      { name: "Maryland", url: "https://haridhammd.org/" },
      { name: "Chicago", url: "https://www.ydschicago.org/" },
    ]);
  });

  it("renders external destinations as new-tab links and New Jersey as plain text", () => {
    render(<CentersList centers={loadCenters()} />);

    for (const [name, url] of [
      ["Vadodara, India", "https://shaharidham.org/"],
      ["Maryland", "https://haridhammd.org/"],
      ["Chicago", "https://www.ydschicago.org/"],
    ]) {
      const link = screen.getByRole("link", { name: new RegExp(`^${name}`) });
      expect(link).toHaveAttribute("href", url);
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noreferrer");
    }

    expect(screen.getByText("New Jersey")).not.toHaveAttribute("href");
    expect(screen.queryByRole("link", { name: "New Jersey" })).not.toBeInTheDocument();
  });
});

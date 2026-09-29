import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CentersList } from "@/components/centers-list";
import { loadCenters } from "@/lib/content/schema";

describe("approved centers", () => {
  it("loads centers with verified URLs and no-link placeholders", () => {
    expect(loadCenters()).toEqual([
      { name: "Vadodara, India", url: "https://shaharidham.org/" },
      { name: "New Jersey" },
      { name: "Maryland", url: "https://haridhammd.org/" },
      { name: "Chicago", url: "https://www.ydschicago.org/" },
    ]);
  });

  it("renders linked centers with external-link treatment and static text for no-link centers", () => {
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
      expect(link).toHaveClass("underline");
      expect(link).toHaveTextContent("↗");
    }

    const newJerseyStatic = screen.getByText("New Jersey");
    expect(newJerseyStatic.tagName).not.toBe("A");
  });
});

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CentersList } from "@/components/centers-list";
import { loadCenters } from "@/lib/content/schema";

describe("approved centers", () => {
  it("loads four verified destinations, each with a real website URL", () => {
    expect(loadCenters()).toEqual([
      { name: "Vadodara, India", url: "https://shaharidham.org/" },
      { name: "New Jersey", url: "https://www.harisumiran.org/" },
      { name: "Maryland", url: "https://haridhammd.org/" },
      { name: "Chicago", url: "https://www.ydschicago.org/" },
    ]);
  });

  it("renders every center as the same external-link treatment", () => {
    render(<CentersList centers={loadCenters()} />);

    for (const [name, url] of [
      ["Vadodara, India", "https://shaharidham.org/"],
      ["New Jersey", "https://www.harisumiran.org/"],
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
  });
});

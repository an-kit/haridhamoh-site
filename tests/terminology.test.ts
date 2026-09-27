import { describe, expect, it } from "vitest";

import { loadTerminology } from "@/lib/content/schema";

describe("protected terminology", () => {
  it("keeps the approved spellings in the validated content contract", () => {
    expect(loadTerminology()).toEqual({
      placeName: "Sokhada",
      guruName: "Hariprasad Swamiji",
    });
  });
});

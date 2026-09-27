import { describe, expect, it } from "vitest";

import { loadActions } from "@/lib/content/schema";

describe("approved public action content", () => {
  it("loads the approved Zeffy and WhatsApp URLs from content", () => {
    expect(loadActions()).toEqual({
      zeffyDonationUrl:
        "https://www.zeffy.com/en-US/donation-form/haridham-ohio-hsapss",
      whatsappCommunityUrl:
        "https://chat.whatsapp.com/IBQ4cujX1CqFmgvz05Su1c?mode=gi_t",
    });
  });
});

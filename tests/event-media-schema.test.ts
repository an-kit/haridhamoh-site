import Ajv2020 from "ajv/dist/2020";
import addFormats from "ajv-formats";
import { describe, expect, it } from "vitest";

import eventsSchema from "@/content/schemas/events.schema.json";
import { EventSchema } from "@/lib/content/schema";

const ajv = new Ajv2020({ allErrors: true });
addFormats(ajv);
const validate = ajv.compile(eventsSchema);

const baseEvent = {
  title: "Annakut 2026",
  date: "2026-10-24",
  startTime: "10:30",
  endTime: "12:00",
  location: "4755 Jeannette Rd, Hilliard, OH 43026",
  image: "/uploads/events/annakut-2026.jpg",
  description: "Annakut.",
};

const photo = (index: number) => ({
  type: "photo" as const,
  src: `/uploads/events/annakut-2026/0${index}.jpg`,
  thumb: `/uploads/events/annakut-2026/0${index}-thumb.jpg`,
  alt: `Photo ${index}`,
  caption: `Caption ${index}`,
});

const video = {
  type: "youtube" as const,
  videoId: "dQw4w9WgXcQ",
  title: "Annakut recap",
};

function accepts(value: unknown): boolean {
  return EventSchema.safeParse(value).success && Boolean(validate([value]));
}

describe("event media schema", () => {
  it("accepts a photo and YouTube media array in both validators", () => {
    expect(accepts({ ...baseEvent, recap: "A wonderful day.", media: [photo(1), video] })).toBe(
      true,
    );
  });

  it("rejects a full YouTube URL as videoId", () => {
    const value = {
      ...baseEvent,
      media: [{ type: "youtube", videoId: "https://youtu.be/dQw4w9WgXcQ", title: "Recap" }],
    };
    expect(accepts(value)).toBe(false);
    expect(EventSchema.safeParse(value).success).toBe(false);
    expect(validate([value])).toBe(false);
  });

  it("rejects a photo without alt text", () => {
    const value = { ...baseEvent, media: [{ ...photo(1), alt: "" }] };
    expect(accepts(value)).toBe(false);
    expect(EventSchema.safeParse(value).success).toBe(false);
    expect(validate([value])).toBe(false);
  });

  it("rejects a photo path outside /uploads/", () => {
    const value = { ...baseEvent, media: [{ ...photo(1), src: "https://example.com/01.jpg" }] };
    expect(accepts(value)).toBe(false);
    expect(EventSchema.safeParse(value).success).toBe(false);
    expect(validate([value])).toBe(false);
  });

  it("rejects more than eight media items", () => {
    const value = {
      ...baseEvent,
      media: Array.from({ length: 9 }, (_, index) => photo(index + 1)),
    };
    expect(accepts(value)).toBe(false);
    expect(EventSchema.safeParse(value).success).toBe(false);
    expect(validate([value])).toBe(false);
  });
});

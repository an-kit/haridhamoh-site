import actionsJson from "@/content/actions.json";
import centersJson from "@/content/centers.json";
import eventsJson from "@/content/events.json";
import siteFactsJson from "@/content/site-facts.json";
import terminologyJson from "@/content/terminology.json";
import { z } from "zod";

const datePattern = /^\d{4}-\d{2}-\d{2}$/;
const timePattern = /^([01]\d|2[0-3]):[0-5]\d$/;

export const SiteFactsSchema = z.object({
  address: z.string().min(1),
  phone: z.string().min(1),
  darshanHours: z.string().min(1),
});

export const ActionsSchema = z.object({
  zeffyDonationUrl: z.url(),
  whatsappCommunityUrl: z.url(),
});

export const CenterSchema = z.object({
  name: z.string().min(1),
  url: z.url().optional(),
});

export const TerminologySchema = z.object({
  placeName: z.literal("Sokhada"),
  guruName: z.literal("Hariprasad Swamiji"),
});

export const EventMediaSchema = z.discriminatedUnion("type", [
  z
    .object({
      type: z.literal("photo"),
      src: z.string().startsWith("/uploads/"),
      thumb: z.string().startsWith("/uploads/"),
      alt: z.string().min(1),
      caption: z.string().min(1).optional(),
    })
    .strict(),
  z
    .object({
      type: z.literal("youtube"),
      videoId: z.string().regex(/^[A-Za-z0-9_-]{11}$/),
      title: z.string().min(1),
    })
    .strict(),
]);

export const EventSchema = z
  .object({
    title: z.string().min(1),
    date: z.string().regex(datePattern),
    endDate: z.string().regex(datePattern).optional(),
    startTime: z.string().regex(timePattern),
    endTime: z.string().regex(timePattern),
    endTimeNote: z
      .string()
      .min(1)
      .describe("Non-public editorial metadata; it must not render or appear in JSON-LD.")
      .optional(),
    location: z.string().min(1),
    image: z.string().startsWith("/uploads/"),
    zeffyUrl: z.url().optional(),
    description: z.string().min(1),
    recap: z.string().min(1).optional(),
    media: z.array(EventMediaSchema).min(1).max(8).optional(),
  })
  .refine((event) => !event.endDate || event.endDate >= event.date, {
    message: "endDate must not precede date",
    path: ["endDate"],
  });

export type SiteFacts = z.infer<typeof SiteFactsSchema>;
export type Actions = z.infer<typeof ActionsSchema>;
export type Center = z.infer<typeof CenterSchema>;
export type Terminology = z.infer<typeof TerminologySchema>;
export type Event = z.infer<typeof EventSchema>;

export function loadSiteFacts(): SiteFacts {
  return SiteFactsSchema.parse(siteFactsJson);
}

export function loadActions(): Actions {
  return ActionsSchema.parse(actionsJson);
}

export function loadCenters(): Center[] {
  return z.array(CenterSchema).parse(centersJson);
}

export function loadTerminology(): Terminology {
  return TerminologySchema.parse(terminologyJson);
}

export function loadEvents(): Event[] {
  return z.array(EventSchema).parse(eventsJson);
}

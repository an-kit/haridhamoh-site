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

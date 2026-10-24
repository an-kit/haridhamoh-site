import type { Event } from "@/lib/content/schema";

export function formatEventDate(date: string): string {
  const [year, month, day] = date.split("-").map(Number);
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(Date.UTC(year, month - 1, day, 12)));
}

export function eventMediaCounts(event: { media?: Event["media"] }): { photos: number; videos: number } {
  const media = event.media ?? [];
  return {
    photos: media.filter((item) => item.type === "photo").length,
    videos: media.filter((item) => item.type === "youtube").length,
  };
}

export function formatMediaBadge(event: { media?: Event["media"] }): string | null {
  const { photos, videos } = eventMediaCounts(event);
  const parts: string[] = [];
  if (photos > 0) parts.push(`${photos} ${photos === 1 ? "photo" : "photos"}`);
  if (videos > 0) parts.push(`${videos} ${videos === 1 ? "video" : "videos"}`);
  return parts.length > 0 ? parts.join(" · ") : null;
}

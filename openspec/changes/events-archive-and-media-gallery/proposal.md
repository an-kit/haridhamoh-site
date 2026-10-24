## Why

Annakut 2026 is today, 2026-10-24. The current view-time lifecycle hides every elapsed event, so from 2026-10-25 `/events/` renders an empty page and the Home events section disappears entirely. There is no archive, and no way to show the photos and videos the community expects after an event.

This change keeps events visible after they happen: `/events/` gains stacked Upcoming and Past sections, Home gains a Recent highlights fallback, and past event pages gain a recap and a photo/YouTube gallery.

## What Changes

- Split `/events/` into stacked sections, no tabs:
  - **Upcoming**, date ascending. When empty: "No upcoming events right now. Join our WhatsApp community for announcements" plus the WhatsApp button sourced from `content/actions.json`. The page is never blank.
  - **Past events**, newest first. Each card links to the detail page and shows the first photo's thumb as its cover (or the event's poster image when it has no media), a friendly date ("Saturday, October 24, 2026"), the title, and, only when media exists, a badge such as "4 photos · 1 video". Past events group under year headings once there are more than six or they span more than one calendar year.
  - A "See past events ↓" jump link at the top when both sections have content.
- Home: keep "Upcoming events" (max 3). When none are upcoming, show "Recent highlights" with the latest past event that has media. The section never vanishes.
- Past-event detail page:
  - Banner "This event took place on <friendly date>".
  - Hide Add to Calendar, Event Seva, and the "Sabha starts at" line.
  - Render the optional `recap` paragraph in place of the description (falling back to the description when absent).
  - Gallery grid, built as server-rendered HTML plus a small vanilla inline script (thumbnail buttons, one native `<dialog>` viewer, YouTube facade), not a React client component: photo tap opens a full-screen viewer with CSS scroll-snap swipe, arrow keys, Esc/tap to close, caption, and an "N of M" counter; YouTube items show a thumbnail and play button, and the `youtube-nocookie.com` iframe loads only on tap.
  - Upcoming detail pages are unchanged.
- Data model: add optional `recap` (string) and `media` (1–8 items, photo or YouTube) to each event in `content/events.json`, validated identically by `lib/content/schema.ts` (Zod) and `content/schemas/events.schema.json` (`additionalProperties: false`).
- Replace the duplicated "today in New York" logic in `lib/events/lifecycle.ts` and the inline `lifecycleScript` string with one function, add `isPastEvent()`, and build the inline script from the function source (`fn.toString()`).
- Add `scripts/prepare-event-media.mjs` (sharp): HEIC/raw photos to 1600px JPEG (~q80) plus a 600px thumb, EXIF/GPS stripped, named `01.jpg` / `01-thumb.jpg`, printing the media JSON snippet.
- Add past-event photo URLs to the image array in `lib/content/jsonld.ts`.
- Tests for classification, schema accept/reject cases, past detail state, gallery alt text, and badge counts; `npm run ci:validate` must pass.
- Client JavaScript must stay at or below **175,000 gzip bytes per route** (measured framework floor 170,326 + 4,674 headroom); measure and report gzip JS per route before and after. Above that limit the release is not promotable without an explicit exception from Ankit.

This change touches `components/`, `lib/`, `scripts/`, and `tests/`, so it is not content-path-only. Its production tag must therefore land on the SHA actually promoted after this ships: create `refs/tags/production` at the promoted SHA, verified against the CloudFront origin path, as part of that production promotion, with Ankit's explicit authorization. A tag at `51e0529` would make every future Hermes content-only candidate fail with `PATH_VIOLATION`.

## Capabilities

### New Capabilities

None. This change extends the two capabilities already specified by `haridhamoh-site-v2`.

### Modified Capabilities

- `public-site-experience`: the Home event section no longer disappears when nothing is upcoming; `/events/` gains Upcoming/Past sections, empty states, and past cards; past detail pages gain a recap and media gallery.
- `content-governance-and-events`: the event schema gains optional `recap` and `media`; the view-time lifecycle moves cards between Upcoming and Past instead of hiding them; media preparation tooling is specified.

## Impact

- Code: `components/event-collection.tsx`, `components/event-detail.tsx`, new gallery component(s), `lib/events/lifecycle.ts`, `lib/content/schema.ts`, `lib/content/jsonld.ts`, `app/events/page.tsx`, `app/events/[slug]/page.tsx`, `app/page.tsx`.
- Content: `content/events.json`, `content/schemas/events.schema.json`.
- Tooling: `scripts/prepare-event-media.mjs`; `sharp` added as a devDependency used only by the media script, never shipped to the browser. No new runtime npm dependency.
- Tests: `tests/content.test.ts`, `tests/json-schema.test.ts`, `tests/event-detail.test.tsx`, `tests/site-components.test.tsx` or new focused tests.
- Deployment: implementation lands on a branch as a PR; the `validate` CI job must be green; the branch is merged to `main`; staging is deployed from that merged SHA. Production promotion is a separate approval. Annakut media arrives later as a separate content-only commit once the photos, captions, recap, and YouTube link are supplied; no placeholder media or captions will be invented. Because `refs/tags/production` does not exist yet, that media commit SHALL go through the normal human-reviewed lane under Ankit's identity, not the Hermes bot identity, so the content-path gate does not fail closed.
- Structured data: `Event` JSON-LD `image` array now includes past-event photo URLs.

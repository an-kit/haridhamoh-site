## Context

`/events/` currently renders one grid; a single inline script hides every card whose `(endDate ?? date)` is before today in `America/New_York`, and hides the whole section when none remain. Annakut 2026 is dated 2026-10-24, so from 2026-10-25 the Events page is blank and the Home section is gone. Content is a static export (`output: "export"`), so any date behaviour must run at view time without a rebuild.

The same "today in New York" logic exists twice today: `dateInNewYork()` in `lib/events/lifecycle.ts` and a hand-written copy inside the `lifecycleScript` template string in `components/event-collection.tsx`. This change removes that duplication and builds the archive and gallery on top of the single helper.

## Goals / Non-Goals

**Goals**

- `/events/` always shows something: Upcoming (with a WhatsApp empty state) and Past events.
- Past events stay reachable, with cover photo, friendly date, media badge, year grouping, and a recap + gallery detail page.
- One source of truth for "today in New York", shared by build-time render and the inline script.
- No new runtime dependency; no rebuild when a date passes.
- Media preparation that strips EXIF/GPS before anything reaches `public/uploads/`.

**Non-Goals**

- No CMS, no server runtime, no client-side data fetching.
- No changes to upcoming event detail behaviour.
- No generated JSON Schema from Zod in this change (explicit follow-up).
- No production deploy, no DNS change, no tag creation in this change.
- No placeholder media, captions, recap, or YouTube ids.

## Decisions

### 1. Build-time placement is the fallback; view-time script is authoritative

`lib/events/lifecycle.ts` gains `isPastEvent(event, now)` and a partition helper. Server components render each card into `[data-event-section="upcoming"]` or `[data-event-section="past"]` using the build date, which is the no-JS state. The inline script re-partitions on load, moves cards between the two containers, re-sorts them, and toggles:

- `[data-event-empty="upcoming"]` (the WhatsApp empty state),
- `[data-event-section="past"]` and its year headings,
- `[data-past-jump]`,
- on detail pages, `[data-detail-upcoming]` and `[data-detail-past]`.

Cards carry `data-event-start`, `data-event-end`, and `data-event-year`. The script runs on `DOMContentLoaded` (after hydration) and only moves static, non-stateful nodes; the page never re-renders, so React reconciliation is not involved after the move. The build-date placement means a just-passed event can appear under Upcoming until the script runs, but the page is never blank.

### 2. One timezone function, stringified into the page

```ts
export function newYorkDate(now: Date = new Date()): string
export function isPastEvent(
  event: { date: string; endDate?: string },
  now: Date = new Date(),
): boolean
```

Both are pure: only `Intl` and their arguments, no imports or module references, so `fn.toString()` is safe. `renderEventLifecycleScript()` builds:

```js
(() => {
  const newYorkDate = ${newYorkDate.toString()};
  const isPastEvent = ${isPastEvent.toString()};
  // DOM runner uses only those two functions
})()
```

If either function gains a closure or import, the script must fail a unit test that asserts the emitted source contains no `import`/`require` and evaluates in an isolated context. This removes the duplicate date maths rather than relocating it.

Friendly dates are formatted from `YYYY-MM-DD` at 12:00 UTC with `Intl.DateTimeFormat("en-US", { timeZone: "America/New_York", weekday: "long", year: "numeric", month: "long", day: "numeric" })`, avoiding the UTC-midnight rollover that would show the previous day.

### 3. Events page structure

```
[data-events-page]
  [data-past-jump] "See past events ↓"            (hidden unless both sections have content)
  <section data-event-section="upcoming">
    cards, ascending
    [data-event-empty="upcoming"]                 (hidden unless no upcoming)
  <section data-event-section="past">
    <h3 data-year-heading="2026">2026</h3>
    cards, newest first
```

Past cards use the first `photo` item and its `thumb` as the cover (600px is enough for a card), the friendly date, the title, and a badge built from counts. Badge rules: `4 photos · 1 video`, `1 photo`, `2 videos`; a zero-count category is omitted; no media means no badge and no cover.

Year headings are emitted at build time when the past list exceeds six events or spans more than one year. When the script moves a card into a year that has no heading, it creates the heading in the correct position; when a year empties, it removes the heading. The threshold is recorded as an open question until confirmed.

### 4. Home fallback

Home renders Upcoming (max 3) and, hidden, a `[data-home-highlights]` block for the latest past event with media. The same script reveals the highlights block when no upcoming cards remain. When no past event has media, the block shows the heading plus a link to `/events/` rather than an empty card. The section container is never removed.

### 5. Detail page states

The server renders both blocks:

- `[data-detail-upcoming]`: existing actions (Add to Calendar, Event Seva).
- `[data-detail-past]`: banner "This event took place on <friendly date>", optional `recap`, gallery.

The script toggles `hidden` on the two blocks using the card's event dates. The gallery markup ships in the static HTML; for an upcoming event it stays inside the hidden past block.

### 6. Gallery

`components/event-gallery.tsx` is a client component (no new dependency):

- Grid of `<button>` thumbnails, each wrapping `<img src={thumb} alt={alt}>`.
- One native `<dialog>` per event, containing a horizontally scroll-snapping track of `<figure>` elements at 1600px `src`. Arrow keys scroll by one item, Escape closes natively, backdrop click closes, focus moves to the close button on open and returns to the invoking thumbnail on close. The counter is updated from the scroll position (`2 of 5`).
- Captions render under each photo when present.
- `components/youtube-facade.tsx` renders a button with `https://i.ytimg.com/vi/<id>/hqdefault.jpg` and the supplied title; on activation it swaps in `<iframe src="https://www.youtube-nocookie.com/embed/<id>?autoplay=1&rel=0" title={title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>`. No YouTube script is loaded before activation.

Both components are used only on event detail pages, so the list and Home pages do not pay their JavaScript cost. Total client JS must stay under the existing 150 KB budget; the CI build output is the evidence.

### 7. Media preparation script

`scripts/prepare-event-media.mjs`:

- Reads a directory of source photos and a required `alts.json` map (`{"IMG_1234.HEIC": {"alt": "...", "caption": "..."}}`). Missing alt for any file is a hard error; the script never emits empty alt or invented captions.
- For each file in sorted order: `sharp(input).rotate()` (apply EXIF orientation), `.resize({ width: 1600, withoutEnlargement: true }).jpeg({ quality: 80, mozjpeg: true })` to `NN.jpg`; then `.resize({ width: 600 }).jpeg(...)` to `NN-thumb.jpg`.
- Never calls `withMetadata()`, so sharp strips EXIF/GPS/device data by default; the script verifies with `sharp(output).metadata()` that `exif` is undefined and fails if metadata survives.
- Writes to `public/uploads/events/<slug>/`, prints the `media` JSON array with `/uploads/events/<slug>/NN.jpg` paths, and exits non-zero if any output still carries EXIF.
- HEIC decoding depends on the installed libvips; if sharp cannot decode HEIC, the script stops with an instruction to convert first (`sips -s format jpeg`) rather than silently skipping.

### 8. Schema parity

`lib/content/schema.ts` and `content/schemas/events.schema.json` are edited by hand and kept behaviourally identical. `additionalProperties: false` stays set. A shared fixture set (valid photo+video; full URL; missing alt; non-`/uploads/`; nine items) runs through both validators in one test. Generating the JSON Schema from Zod is recorded as a future follow-up, not implemented.

### 9. Structured data

`lib/content/jsonld.ts` appends each photo `src` as an absolute URL to the `Event.image` array, preserving media order; YouTube items are excluded. The existing event `image` remains first.

### 10. Deploy and tag sequencing

- Commit and push to `main` before any deploy, so the deployed SHA exists on `main`.
- Staging only: build `out/`, upload to `s3://haridhamoh-site-staging-392340646785-us-east-2/releases/<sha>/`, point the staging distribution's origin path at that prefix, invalidate, then record the evidence requested in the build request (SHA; `/events/`, homepage, Annakut detail URLs; `head-object` for one photo and one thumb showing `image/jpeg`; photo file sizes).
- Production waits for separate explicit approval. On promotion, create `refs/tags/production` at the promoted SHA, verified against the CloudFront origin path, as part of that production promotion, with Ankit's explicit authorization. Tagging `51e0529` instead would make future Hermes content-only candidates fail with `PATH_VIOLATION`, because this feature's code is in the diff.

## Risks / Trade-offs

- **Time sensitivity**: production shows a blank Events page from 2026-10-25 until this ships. Staging can be reviewed first, but the production approval should not wait long.
- **Post-hydration DOM moves**: moving React-owned nodes is safe only because static pages do not re-render. Running on `DOMContentLoaded` and limiting mutations to `hidden` and section placement keeps it contained.
- **Year-heading creation**: dynamically creating headings is more code than hiding them; a bug can leave a card outside a heading. Tests assert each past card has a preceding year heading after the script runs.
- **YouTube thumbnails**: `i.ytimg.com` is requested at page load (IP visible to Google) even though no cookie-bearing iframe loads until play. Self-hosting thumbnails is a possible later refinement.
- **HEIC**: sharp's HEIC support varies by libvips build; the script fails loudly rather than producing a partial batch.
- **sharp**: added as a devDependency only; it is never bundled. This is the one new package and is called out for approval.
- **Schema drift**: hand-maintained Zod and JSON Schema can diverge; the shared fixture test is the guard until generation is automated.

## Migration Plan

Spec baseline dependency: `openspec/specs/` is empty because `haridhamoh-site-v2` is not archived yet. This change's `MODIFIED` deltas therefore target the capability specs that v2 establishes; archive v2 before archiving this change, or the archive step will refuse the modified requirements (OpenSpec reports this as an informational finding today).

1. Review and approve this OpenSpec change.
2. Implement schema, lifecycle helper, Events page, Home fallback, detail states, gallery, JSON-LD, script, and tests on a branch/PR.
3. `npm run ci:validate` green; deploy to staging only; report the requested evidence; stop.
4. After separate production approval, promote the same built SHA, then create the `production` tag at that promoted SHA as part of the promotion.
5. Annakut media arrives as a separate content-only commit once the photos, captions, recap, and YouTube link are supplied; it re-runs CI and follows the same staging-first path.

Rollback: redeploy the previous production release prefix; no rebuild, no content change.

## Open Questions

- Year grouping: is "more than a few" = more than six past events, or any multi-year list, or both? This design uses "more than six OR more than one calendar year".
- Is `recap` plain text only, or should it allow paragraphs/Markdown? This design assumes a single plain-text paragraph.
- Should past cards always use the 600px thumb, or the 1600px `src` when no thumb exists? This design requires `thumb` on every photo.
- Is `sharp` acceptable as a devDependency, given the "no new npm dependencies" constraint was about the gallery runtime?
- Should the YouTube facade use the maxres thumbnail when available, with `hqdefault` fallback, or always `hqdefault`?
- When no event is upcoming and no past event has media, is "Recent highlights" heading plus a `/events/` link the right fallback, or should it show the WhatsApp empty state instead?

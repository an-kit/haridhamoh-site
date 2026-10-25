## Context

`/events/` currently renders one grid; a single inline script hides every card whose `(endDate ?? date)` is before today in `America/New_York`, and hides the whole section when none remain. Annakut 2026 is dated 2026-10-24, so from 2026-10-25 the Events page is blank and the Home section is gone. Content is a static export (`output: "export"`), so any date behaviour must run at view time without a rebuild.

The same "today in New York" logic exists twice today: `dateInNewYork()` in `lib/events/lifecycle.ts` and a hand-written copy inside the `lifecycleScript` template string in `components/event-collection.tsx`. This change removes that duplication and builds the archive and gallery on top of the single helper.

## Goals / Non-Goals

**Goals**

- `/events/` always shows something: Upcoming (with a WhatsApp empty state) and Past events.
- Past events stay reachable, with cover image, friendly date, media badge, year grouping, and a recap + gallery detail page.
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

### 1. Every card is rendered in both lists; the script only toggles `hidden`

`lib/events/lifecycle.ts` gains `isPastEvent(event, now)` plus build-time partition helpers. The server renders **every event as a card in both** the Upcoming list and the Past list, pre-sorted at build time: Upcoming ascending by `date`, Past descending by `(endDate ?? date)`. The build date sets each card's initial `hidden` value, and that is the no-JavaScript fallback.

The inline script never moves, appends, removes, creates, or sorts nodes. It computes `isPastEvent` from each card's `data-event-start` / `data-event-end` and toggles only the `hidden` attribute on:

- the card in the Upcoming list and the card in the Past list,
- each year heading,
- `[data-event-empty="upcoming"]` (the WhatsApp empty state),
- `[data-event-section="past"]` and `[data-past-jump]`,
- `[data-home-highlights]` and the Home upcoming list,
- on detail pages, `[data-detail-upcoming]` and `[data-detail-past]`.

The parser-inserted script runs immediately after the lists, and calls the exported `applyEventLifecycle(document, new Date(), eventLifecycleState)` function before first paint. A small root-layout client component calls that exact same function on mount, after every `usePathname()` change, and on `pageshow` so client navigation and bfcache restores cannot retain build-time attributes. Neither caller owns DOM logic; both supply only `document`, `new Date()`, and `eventLifecycleState`. Because the runner only flips attributes, React has no structural change to reconcile or undo.

Past-list cards for events that are still upcoming are rendered with `loading="lazy"` so their hidden covers are not fetched. The cost of this design is a duplicated card DOM on `/events/`; the benefit is that classification can never corrupt the rendered structure.

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
    cards for every event, ascending by date
    [data-event-empty="upcoming"]                 (hidden unless no upcoming)
  <section data-event-section="past">
    <h3 data-year-heading="2026">2026</h3>        (one per year present in the content)
    cards for every event, newest first
```

Past cards use the first `photo` item and its `thumb` as the cover (600px is enough for a card). When an event has no `media`, the card falls back to the event's existing poster `image` as the cover and omits the badge; it never renders an empty cover area.

Badge rules: `4 photos · 1 video`, `1 photo`, `2 videos`; a zero-count category is omitted; no media means no badge. Cards show the friendly date and title in every case.

Year headings are rendered at build time for **every year present** in the content, in descending order. The script only hides or reveals them: headings are visible only when the past list has more than six cards or spans more than one year, and a heading whose year has no visible past card is hidden. No heading is created or removed at view time.

### 4. Home fallback

Home renders Upcoming (max 3) and, hidden, a `[data-home-highlights]` block for the latest past event with media. The script reveals the highlights block and hides the upcoming list when no upcoming cards remain. When no past event has media, the block shows the "Recent highlights" heading plus a link to `/events/` rather than an empty card. The section container is never removed.

### 5. Detail page states

The server renders both blocks:

- `[data-detail-upcoming]`: existing description, "Sabha starts at …" line, and actions (Add to Calendar, Event Seva).
- `[data-detail-past]`: banner "This event took place on <friendly date>", the `recap` paragraph in place of the description (falling back to the description when no recap exists), and the gallery.

The past block hides the "Sabha starts at" line and both actions. The script toggles `hidden` on the two blocks using the event's dates; the gallery markup ships in the static HTML and for an upcoming event stays inside the hidden past block.

### 6. Gallery: server-rendered markup, vanilla inline script

`components/event-gallery.tsx` is a **server component**; it emits no client JavaScript of its own:

- A grid of `<button data-gallery-open="N">` thumbnails, each wrapping `<img src={thumb} alt={alt}>`.
- One native `<dialog data-gallery-dialog>` containing a horizontally scroll-snapping track of `<figure>` elements at 1600px `src`, each with its caption, plus a close button and a `[data-gallery-counter]` element.

A single small vanilla inline script on the detail page handles: opening the dialog on a thumbnail, closing on the close button / Escape / backdrop click, arrow-key and scroll-snap navigation, updating the counter (`2 of 5`), moving focus into the dialog and restoring it to the invoking thumbnail. The same script handles the YouTube facade: a `<button data-youtube-id="…" data-youtube-title="…">` with `https://i.ytimg.com/vi/<id>/hqdefault.jpg` swaps itself for `<iframe src="https://www.youtube-nocookie.com/embed/<id>?autoplay=1&rel=0" title="…" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>` on activation. No YouTube script or iframe loads before activation.

There is no React client component and therefore no hydration cost for the gallery. The budget is **175,000 gzip bytes** of shipped client JavaScript per route, per the `accessible-static-site-quality` release exception: the measured framework floor is 170,326 gzip bytes, leaving 4,674 bytes. The implementation must measure gzip JS per route before and after the change and report it; a release above 175,000 gzip bytes is not promotable without an explicit exception from Ankit.

### 7. Media preparation script

`scripts/prepare-event-media.mjs`:

- Reads a directory of source photos and a required `alts.json` map (`{"IMG_1234.HEIC": {"alt": "...", "caption": "..."}}`). Missing alt for any file is a hard error; the script never emits empty alt or invented captions.
- For each file in sorted order: `sharp(input).rotate()` (apply EXIF orientation), `.resize({ width: 1600, withoutEnlargement: true }).jpeg({ quality: 80, mozjpeg: true })` to `NN.jpg`; then `.resize({ width: 600 }).jpeg(...)` to `NN-thumb.jpg`.
- Never calls `withMetadata()`, so sharp strips EXIF/GPS/device data by default; the script verifies with `sharp(output).metadata()` that `exif` is undefined and fails if metadata survives.
- Writes to `public/uploads/events/<slug>/`, prints the `media` JSON array with `/uploads/events/<slug>/NN.jpg` paths, and exits non-zero if any output still carries EXIF.
- HEIC decoding depends on the installed libvips; if sharp cannot decode HEIC, the script stops with an instruction to convert first (`sips -s format jpeg`) rather than silently skipping.

`sharp` is an approved devDependency used only by this script; it is never bundled or shipped.

### 8. Schema parity

`lib/content/schema.ts` and `content/schemas/events.schema.json` are edited by hand and kept behaviourally identical. `additionalProperties: false` stays set. A shared fixture set (valid photo+video; full URL; missing alt; non-`/uploads/`; nine items) runs through both validators in one test. Generating the JSON Schema from Zod is recorded as a future follow-up, not implemented.

### 9. Structured data

`lib/content/jsonld.ts` appends each photo `src` as an absolute URL to the `Event.image` array, preserving media order; YouTube items are excluded. The existing event `image` remains first.

### 10. Deploy and tag sequencing

- Implementation lives on a branch as a pull request. `validate` CI must be green, then the branch is merged to `main`. Staging is deployed from that merged `main` SHA, so the deployed SHA always exists on `main`.
- Staging only: build `out/`, upload to `s3://haridhamoh-site-staging-392340646785-us-east-2/releases/<sha>/`, point the staging distribution's origin path at that prefix, invalidate, then record the evidence requested in the build request (SHA; `/events/`, homepage, Annakut detail URLs; `head-object` for one photo and one thumb showing `image/jpeg`; photo file sizes).
- Production waits for separate explicit approval. On promotion, create `refs/tags/production` at the promoted SHA, verified against the CloudFront origin path, as part of that production promotion, with Ankit's explicit authorization. Tagging `51e0529` instead would make future Hermes content-only candidates fail with `PATH_VIOLATION`, because this feature's code is in the diff.

## Risks / Trade-offs

- **Time sensitivity**: production shows a blank Events page from 2026-10-25 until this ships. Staging can be reviewed first, but the production approval should not wait long.
- **Duplicated card DOM**: every event renders twice on `/events/`, increasing HTML size and repeating image URLs. `loading="lazy"` on upcoming cards in the Past list limits hidden-image fetches; the same URL is cache-shared when a card is revealed.
- **Attribute toggles around hydration**: the script flips only `hidden`, before and once after hydration. If React re-applies a server value, the `requestAnimationFrame` pass restores the correct state without structural mutation.
- **Budget headroom**: only 4,674 gzip bytes above the framework floor. The gallery script must be measured per route; an over-budget release blocks promotion.
- **Year headings**: every year heading ships in the HTML and is hidden when unused; a bug shows an empty year heading rather than misplacing a card.
- **YouTube thumbnails**: `i.ytimg.com` is requested at page load (IP visible to Google) even though no cookie-bearing iframe loads until play. Self-hosting thumbnails is a possible later refinement.
- **HEIC**: sharp's HEIC support varies by libvips build; the script fails loudly rather than producing a partial batch.
- **Schema drift**: hand-maintained Zod and JSON Schema can diverge; the shared fixture test is the guard until generation is automated.

## Migration Plan

Spec baseline dependency: `openspec/specs/` is empty because `haridhamoh-site-v2` is not archived yet. This change's `MODIFIED` deltas therefore target the capability specs that v2 establishes; archive v2 before archiving this change, or the archive step will refuse the modified requirements (OpenSpec reports this as an informational finding today).

1. Review and approve this OpenSpec change.
2. Implement schema, lifecycle helper, Events page, Home fallback, detail states, gallery, JSON-LD, script, and tests on a branch and open a PR.
3. `npm run ci:validate` green; merge to `main`; deploy to staging from that merged SHA only; report the requested evidence; stop.
4. After separate production approval, promote the same built SHA, then create the `production` tag at that promoted SHA as part of the promotion.
5. Annakut media arrives as a separate content-only commit once the photos, captions, recap, and YouTube link are supplied; it re-runs CI and follows the same staging-first path.

Rollback: redeploy the previous production release prefix; no rebuild, no content change.

## Resolved Review Decisions

- Year grouping uses more than six past events **or** more than one calendar year.
- `recap` is plain text only (a single paragraph).
- `thumb` is required on every photo.
- `sharp` is approved as a devDependency; it is not a runtime dependency.
- The YouTube facade always uses `hqdefault.jpg`.
- When nothing is upcoming and no past event has media, "Recent highlights" shows the heading plus a link to `/events/`.

## 1. Schema and fixtures

- [ ] 1.1 Add optional `recap` and optional `media` (1–8 items) to `EventSchema` in `lib/content/schema.ts`: photo requires `src`, `thumb`, non-empty `alt`, optional `caption`, paths start with `/uploads/`; youtube requires `videoId` matching `^[A-Za-z0-9_-]{11}$` and `title`; reject full URLs as `videoId`.
- [ ] 1.2 Mirror 1.1 in `content/schemas/events.schema.json` with `additionalProperties: false` and equivalent `anyOf`/`oneOf` constraints; verify both validators accept and reject the same fixtures.
- [ ] 1.3 Add shared fixtures: valid photo+video event; full YouTube URL; photo without `alt`; photo with non-`/uploads/` path; nine media items. Verify each fixture produces the expected result in both Zod and AJV.

## 2. Single timezone helper

- [ ] 2.1 Add `newYorkDate(now)` and `isPastEvent(event, now)` to `lib/events/lifecycle.ts`; keep both pure (no imports, no module-scope references) and keep `isUpcomingEvent` consistent with `!isPastEvent`.
- [ ] 2.2 Add `renderEventLifecycleScript()` that emits the inline script from `newYorkDate.toString()` and `isPastEvent.toString()` plus a DOM runner; verify the emitted source has no `import`/`require` and runs in an isolated VM context.
- [ ] 2.3 Remove the hand-written date maths from `components/event-collection.tsx`; verify no second `America/New_York` date calculation exists in `lib/`, `components/`, or `app/`.

## 3. Events page

- [ ] 3.1 Restructure `app/events/page.tsx` / `components/event-collection.tsx` into stacked `[data-event-section="upcoming"]` and `[data-event-section="past"]` sections, no tabs; render **every event as a card in both lists**, pre-sorted (Upcoming ascending, Past newest first), with build-time `hidden` values and a year heading for every year present in the content.
- [ ] 3.2 Add the Upcoming empty state with the exact copy "No upcoming events right now. Join our WhatsApp community for announcements" and the WhatsApp button sourced from `content/actions.json`; verify the page is never blank.
- [ ] 3.3 Build past cards: first photo's `thumb` as cover; when the event has no `media`, use the event's poster `image` as cover and omit the badge. Show friendly date ("Saturday, October 24, 2026"), title, and badge ("4 photos · 1 video", pluralized, zero-count omitted). Verify both the media and no-media cases.
- [ ] 3.4 Render year headings for every year present, newest first; add the "See past events ↓" jump link. Verify visibility rules (>6 past events or multi-year), one-year, two-year, and empty-section fixtures.
- [ ] 3.5 Extend the inline script to toggle only `hidden` on cards, year headings, the empty state, jump link, and past section; it must not move, create, remove, or sort nodes. Verify at fixed dates either side of 2026-10-24, including that the build-time values are the no-JS fallback.

## 4. Home fallback

- [ ] 4.1 Keep "Upcoming events" (max 3); add a hidden `[data-home-highlights]` block for the latest past event with media, with a `/events/` link when no past event has media.
- [ ] 4.2 Extend the inline script to reveal Recent highlights and hide the upcoming list when no upcoming cards remain, toggling `hidden` only; verify the section never disappears on 2026-10-25 and later dates.

## 5. Past detail state

- [ ] 5.1 Add `[data-detail-upcoming]` and `[data-detail-past]` blocks to `app/events/[slug]/page.tsx` / `components/event-detail.tsx`; the past block shows "This event took place on <friendly date>", hides Add to Calendar, Event Seva, and the "Sabha starts at" line, and renders `recap` in place of the description (falling back to the description when absent).
- [ ] 5.2 Toggle the blocks from the shared inline script using the event dates, changing only `hidden`; verify the upcoming presentation is unchanged.

## 6. Gallery

- [ ] 6.1 Add `components/event-gallery.tsx` as a **server component**: photo grid with `<button>` + `<img alt>`, one native `<dialog>` with a CSS scroll-snap track, captions, close button, and `[data-gallery-counter]`; no React client component.
- [ ] 6.2 Add the small vanilla inline script (open/close, arrow keys, backdrop click, counter, focus move/restore) and the YouTube facade swap to a `youtube-nocookie.com` iframe on activation; no YouTube iframe or script before activation.
- [ ] 6.3 Measure gzip client JavaScript per route before and after the change and report the numbers; verify no new runtime npm dependency and that the release is at or below **175,000 gzip bytes** per route (framework floor 170,326 + 4,674 headroom). Above that limit it is not promotable without an explicit exception from Ankit.

## 7. Structured data

- [ ] 7.1 Extend `lib/content/jsonld.ts` to append past-event photo `src` values as absolute URLs to `Event.image`, in media order; exclude YouTube items.
- [ ] 7.2 Verify JSON-LD for an event with three photos contains four image URLs (existing image plus three photos).

## 8. Media preparation script

- [ ] 8.1 Add `scripts/prepare-event-media.mjs` with `sharp`: 1600px JPEG ~q80, 600px thumb, `rotate()` before resize, no `withMetadata()`, `NN.jpg` / `NN-thumb.jpg`, output to `public/uploads/events/<slug>/`.
- [ ] 8.2 Require an `alts.json` map; fail if any source photo lacks `alt`; never emit empty alt or invented captions.
- [ ] 8.3 Verify outputs contain no EXIF/GPS/device metadata via `sharp(output).metadata()`; fail the batch if metadata survives. Verify HEIC decode failure stops with a clear instruction.
- [ ] 8.4 Print a valid `media` JSON snippet using `/uploads/events/<slug>/` paths.

## 9. Tests and CI

- [ ] 9.1 Test past/upcoming classification at fixed dates: before, on, and after a single-day event; inside and after a multi-day event's `endDate`; around New York midnight.
- [ ] 9.2 Test schema accept/reject cases from 1.3 against both validators.
- [ ] 9.3 Test past detail page hides Add to Calendar, Event Seva, and the "Sabha starts at" line; shows the banner; renders recap in place of the description and falls back to the description when recap is absent; renders every gallery image with non-empty `alt`.
- [ ] 9.4 Test past card badge counts and pluralization ("4 photos · 1 video", "1 photo", "2 videos", no media) and the poster-image cover fallback when an event has no media.
- [ ] 9.5 Run `npm run ci:validate`; verify schema, routes, accessibility, structured data, path gate, `tsc`, and build all pass.

## 10. Staging deploy and evidence (STOP)

- [ ] 10.1 Put the implementation on a branch and open a PR; require the `validate` CI job to be green; merge to `main`; deploy staging from that merged `main` SHA and record it. Do not deploy from an unmerged branch.
- [ ] 10.2 Build `out/`, upload to `s3://haridhamoh-site-staging-392340646785-us-east-2/releases/<sha>/`, point the staging distribution origin path at it, and invalidate.
- [ ] 10.3 Report: (a) commit SHA; (b) staging URLs for `/events/`, the homepage, and `/events/annakut-2026-haridham-ohio-hsapss/`; (c) `aws s3api head-object` for one gallery photo and one thumb showing `ContentType: image/jpeg`; (d) gallery photo file sizes; (e) gzip client JavaScript per route before vs. after, against the 175,000-byte limit; (f) a real-browser date-flip test on staging using a synthetic test event dated tomorrow, added only to the staging build and never committed to `main`, showing it under Upcoming while Annakut stays under Past, plus the empty-state, jump-link, year-heading, and Home "Recent highlights" states; (g) the inline lifecycle script as it appears in the built staging HTML (not source), confirming no module references and that it runs; (h) the same hidden/shown states still correct 2 seconds after load (post-hydration), not only at first paint. Stop for review.
- [ ] 10.4 After the checks, remove the synthetic event, rebuild, redeploy staging, and confirm it is absent from the staging HTML and the live staging page.
- [ ] 10.5 Do NOT deploy to production until Ankit explicitly approves separately.

## 11. Production promotion and tag (blocked on approval)

- [ ] 11.1 After explicit production approval, promote the already-built SHA without rebuilding; verify the deployed artifact SHA matches the CloudFront origin path.
- [ ] 11.2 Create `refs/tags/production` at the promoted SHA, verified against the CloudFront origin path, as part of that production promotion, with Ankit's explicit authorization. Do not tag `51e0529`.

## 12. Annakut media content commit (blocked on assets)

- [ ] 12.1 Wait for Ankit's Annakut photos, captions, recap, and YouTube link; do not invent placeholder media or captions.
- [ ] 12.2 Run `scripts/prepare-event-media.mjs`, add the resulting `media` and `recap` to `content/events.json`, run `npm run ci:validate`, and follow the same staging-first path as a separate content-only commit authored and pushed under Ankit's identity (human-reviewed lane), not the Hermes bot identity, because `refs/tags/production` does not exist yet.

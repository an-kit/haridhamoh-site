## Purpose

Define schema-validated event content, the view-time Upcoming/Past classification, and media preparation for Haridham Ohio events without introducing a CMS.

## MODIFIED Requirements

### Requirement: Event content schema and timezone

Each event record SHALL contain title, date, start time, end time, location, image, optional `endDate`, optional `zeffyUrl`, and description. `date` and optional `endDate` SHALL use `YYYY-MM-DD`; all event dates and times SHALL be evaluated in `America/New_York`. `endDate` SHALL be used only for multi-day events and, when present, SHALL not precede `date`.

Each event record SHALL also accept two optional fields:

- `recap`: a plain-text string summarizing the event after it has taken place.
- `media`: an array of 1–8 items, each either
  - `{"type":"photo","src":"/uploads/events/<slug>/01.jpg","thumb":"/uploads/events/<slug>/01-thumb.jpg","alt":"...","caption":"..."}`, where `src` and `thumb` SHALL start with `/uploads/`, `alt` SHALL be a non-empty string, and `caption` SHALL be optional; or
  - `{"type":"youtube","videoId":"<11-char id>","title":"..."}`, where `videoId` SHALL match `^[A-Za-z0-9_-]{11}$` and SHALL NOT be a full URL.

The Zod schema in `lib/content/schema.ts` and the JSON Schema in `content/schemas/events.schema.json` SHALL remain behaviorally identical, and the JSON Schema SHALL set `additionalProperties: false`. Generating the JSON Schema from the Zod schema is a future follow-up and SHALL NOT be implemented in this change.

#### Scenario: Valid multi-day event is proposed

- **WHEN** a content change supplies an event with `date`, a later or equal `endDate`, start time, end time, and all other required event fields
- **THEN** schema validation accepts the multi-day event

#### Scenario: Invalid event timezone or date range is proposed

- **WHEN** a content change provides an invalid date format, omits a required time, or supplies an `endDate` earlier than `date`
- **THEN** continuous integration fails before build and deployment

#### Scenario: Valid media array is proposed

- **WHEN** an event includes a photo with `src`, `thumb`, and `alt`, and a YouTube item with an 11-character `videoId`
- **THEN** both the Zod schema and the JSON Schema accept the event

#### Scenario: Full YouTube URL is proposed

- **WHEN** a YouTube media item supplies `videoId` as `https://www.youtube.com/watch?v=...` instead of an 11-character id
- **THEN** both validators reject the event

#### Scenario: Photo without alt text is proposed

- **WHEN** a photo media item omits `alt` or supplies an empty `alt`
- **THEN** both validators reject the event

#### Scenario: Photo outside /uploads/ is proposed

- **WHEN** a photo media item supplies a `src` or `thumb` that does not start with `/uploads/`
- **THEN** both validators reject the event

#### Scenario: More than eight media items are proposed

- **WHEN** an event supplies nine media items
- **THEN** both validators reject the event

### Requirement: View-time event lifecycle

All events SHALL render in static HTML with machine-readable date and time data. The "today in America/New_York" calculation SHALL exist in exactly one function in `lib/events/lifecycle.ts`; the inline client script SHALL be generated from that function's source so server-rendered and view-time classification cannot drift. A companion `isPastEvent()` SHALL classify an event as past when `(endDate ?? date)` is earlier than today in `America/New_York`.

At build time, **every event SHALL be rendered as a card in both** the Upcoming list and the Past list, pre-sorted (Upcoming ascending by `date`; Past descending by `endDate ?? date`). Build-time classification SHALL set each card's initial `hidden` value; that placement is the no-JavaScript fallback. Year headings SHALL be rendered for every year present in the content. Past-list cards for events that are still upcoming SHALL use `loading="lazy"`.

At view time, a small inline script, counted toward the client JavaScript budget, SHALL re-evaluate every card in `America/New_York` and SHALL only toggle the `hidden` attribute on cards, year headings, the Upcoming empty state, the Past section, the jump link, the Home upcoming/highlights blocks, and the detail page's upcoming/past blocks. It SHALL NOT move, create, remove, or sort DOM nodes. Production artifacts SHALL remain immutable; this behavior SHALL NOT require a scheduled rebuild or a content change.

#### Scenario: Event elapses after production deployment

- **WHEN** a visitor views a production artifact after an event's date or `endDate` has elapsed in America/New_York
- **THEN** the script hides the Upcoming card and reveals the Past card without changing or rebuilding the production artifact

#### Scenario: Multi-day event remains eligible at view time

- **WHEN** a visitor views a production artifact on a date within a multi-day event's inclusive date range in America/New_York
- **THEN** the script keeps the event in Upcoming

#### Scenario: No upcoming events remain

- **WHEN** the script finds no upcoming events in America/New_York
- **THEN** it shows the Upcoming empty state with the WhatsApp action and keeps the Past section visible

#### Scenario: JavaScript is unavailable

- **WHEN** a visitor loads `/events/` without JavaScript
- **THEN** the build-time `hidden` values remain in effect and the page still renders both section containers without a blank page

#### Scenario: Duplicate date logic is introduced

- **WHEN** implementation adds a second America/New_York date calculation outside `lib/events/lifecycle.ts` or hard-codes one in the inline script string
- **THEN** the change is rejected in review

## ADDED Requirements

### Requirement: Event media preparation tooling

The repository SHALL provide `scripts/prepare-event-media.mjs`, using `sharp`, that converts raw photos (including HEIC) into a 1600px-wide JPEG at approximately quality 80 and a 600px-wide thumbnail, applies EXIF orientation before stripping, removes all EXIF/GPS/device metadata from both outputs, names files `01.jpg`, `01-thumb.jpg`, `02.jpg`, `02-thumb.jpg`, and so on, and prints a ready-to-paste `media` JSON snippet.

#### Scenario: Media is prepared from a phone photo

- **WHEN** the script processes an HEIC photo containing GPS and device metadata
- **THEN** it writes a 1600px JPEG and a 600px thumb named `01.jpg` and `01-thumb.jpg`, and neither output contains EXIF, GPS, or device metadata

#### Scenario: Media snippet is produced

- **WHEN** the script finishes a batch
- **THEN** it prints photo `media` objects with `src`, `thumb`, `alt`, and optional `caption` fields using the `/uploads/events/<slug>/` prefix

### Requirement: Past-event structured data

`Event` JSON-LD SHALL include every photo `src` from an event's `media` array in its `image` array as an absolute URL, in media order. YouTube items SHALL NOT be added to `image`. Events without `media` SHALL continue to emit their existing `image`.

#### Scenario: Past event JSON-LD is generated

- **WHEN** a past event has three photos in `media`
- **THEN** its `Event` JSON-LD `image` array contains the event image and the three absolute photo URLs

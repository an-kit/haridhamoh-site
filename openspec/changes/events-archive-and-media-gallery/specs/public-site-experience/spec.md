## Purpose

Define the English-only public experience for HSAPSS Ohio (Haridham Ohio), including the upcoming/past events archive and the media gallery on past events.

## MODIFIED Requirements

### Requirement: Home upcoming-event presentation

The Home page SHALL use the inline event-lifecycle behavior to show the next upcoming events in America/New_York, up to three. When no upcoming events remain at view time, the Home page SHALL replace that list with a "Recent highlights" block showing the latest past event that has media, linking to its detail page. The Home events section SHALL NOT be omitted or rendered empty in either state.

#### Scenario: Upcoming events exist

- **WHEN** one or more events are upcoming in America/New_York at view time
- **THEN** the Home page shows the next upcoming events, maximum three

#### Scenario: No upcoming events exist

- **WHEN** no event is upcoming in America/New_York at view time
- **THEN** the Home page shows "Recent highlights" for the latest past event with media, and does not render an empty events section

#### Scenario: No past event has media

- **WHEN** no event is upcoming and no past event has media
- **THEN** the Home page shows the "Recent highlights" heading with a link to `/events/` and does not render a broken or empty card

## ADDED Requirements

### Requirement: Events page upcoming and past sections

`/events/` SHALL render two stacked sections, with no tabs: "Upcoming" first and "Past events" second.

Upcoming SHALL list events in ascending date order. When no upcoming event exists, it SHALL show the exact text "No upcoming events right now. Join our WhatsApp community for announcements" together with the WhatsApp button whose destination comes from `content/actions.json`. The page SHALL NOT be blank in any state.

Past events SHALL list events newest first. Each past card SHALL link to its detail page and show: the cover photo (the first `photo` in `media`), a friendly date such as "Saturday, October 24, 2026", the title, and a media badge such as "4 photos · 1 video". The badge SHALL count photos and videos, pluralize each noun, omit a zero-count category, and SHALL NOT render when the event has no `media`. Past events without media SHALL still render a card with date and title.

Past events SHALL be grouped under year headings when the past list contains more than six events or spans more than one calendar year. A "See past events ↓" jump link SHALL appear at the top of the page only when both sections have content.

#### Scenario: Both sections have content

- **WHEN** at least one upcoming and one past event exist
- **THEN** the page shows "See past events ↓", the Upcoming section, and the year-grouped Past events section

#### Scenario: No upcoming events

- **WHEN** every event has passed
- **THEN** the Upcoming section shows the WhatsApp empty state and the Past events section remains visible

#### Scenario: Past card with media

- **WHEN** a past event has four photos and one video
- **THEN** its card shows the first photo as cover, a friendly date, the title, and the badge "4 photos · 1 video"

#### Scenario: Past card without media

- **WHEN** a past event has no `media`
- **THEN** its card shows date and title without a cover image or media badge

### Requirement: Past-event detail state

For an event whose `(endDate ?? date)` is earlier than today in America/New_York, the detail page SHALL show the banner "This event took place on <friendly date>", SHALL hide the Add to Calendar and Event Seva actions, and SHALL render the `recap` paragraph when present.

Upcoming events SHALL keep their current detail presentation, including Add to Calendar and Event Seva where applicable.

#### Scenario: Visitor opens a past event

- **WHEN** a visitor opens a past event's detail page
- **THEN** the banner names the friendly date, Add to Calendar and Event Seva are absent, and the recap is shown when present

#### Scenario: Visitor opens an upcoming event

- **WHEN** a visitor opens an upcoming event's detail page
- **THEN** the existing actions and presentation remain unchanged

### Requirement: Event media gallery

A past event with `media` SHALL render a gallery grid on its detail page.

Photo items SHALL render as images with the supplied `alt` text. Activating a photo SHALL open a full-screen native `<dialog>` viewer that supports CSS scroll-snap swiping between photos, left/right arrow keys, Escape and a tap/click outside the image to close, the photo caption, and an "N of M" counter. Focus SHALL move into the dialog on open and return to the invoking thumbnail on close.

YouTube items SHALL render as a thumbnail with a play button and SHALL NOT load the `youtube-nocookie.com` iframe until the visitor activates play. The iframe SHALL use the privacy-enhanced `youtube-nocookie.com` host and the event's 11-character `videoId`.

The gallery SHALL add no new runtime npm dependency and SHALL keep its client JavaScript within the existing 150 KB budget.

#### Scenario: Visitor opens the photo viewer

- **WHEN** a visitor activates the second of five photos
- **THEN** the dialog opens on that photo, shows "2 of 5", and supports arrows, swipe, Escape, and outside-tap close

#### Scenario: Visitor plays a YouTube item

- **WHEN** a visitor activates the play button on a YouTube item
- **THEN** a `youtube-nocookie.com` iframe for that `videoId` loads in place of the thumbnail

#### Scenario: YouTube item is present but not played

- **WHEN** the detail page first loads with a YouTube item
- **THEN** no YouTube iframe or YouTube script is requested

#### Scenario: Every photo has alt text

- **WHEN** the gallery renders
- **THEN** every `<img>` has a non-empty `alt` attribute taken from the content record

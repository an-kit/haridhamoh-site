## Purpose

Define the accessible, low-JavaScript static-site quality bar for Haridham Ohio, including visual motion boundaries, performance budgets, map behavior, and search-consumable structured data.

## ADDED Requirements

### Requirement: Fixed visual system and accessible text contrast
The site SHALL use these design tokens: saffron `#C0561F` / `#D4651A`, slate `#4A6078`, gold `#C8922A`, and cream `#FBF6EE`; display typography SHALL use Cormorant Garamond and interface typography SHALL use DM Sans. Every rendered text/background combination SHALL meet WCAG 2.1 AA for its text size; token combinations that do not meet the applicable threshold SHALL NOT be used for text. The implementation SHALL retain a contrast inventory covering every rendered text/background pair.

#### Scenario: A text/background pair is introduced
- **WHEN** a rendered text/background color pair is added or changed
- **THEN** the contrast inventory records it and verification confirms its applicable WCAG AA threshold

#### Scenario: A failing token pair is proposed for body text
- **WHEN** a body-text treatment uses a token pair below the 4.5:1 normal-text threshold
- **THEN** visual review or automated contrast verification rejects that treatment

### Requirement: Motion and sacred imagery safeguards
The site SHALL use Motion as its only animation library and SHALL NOT use Aceternity, Magic UI, Anime.js, or map libraries. Thakorji imagery and guru imagery SHALL have no motion effects. All non-sacred optional motion SHALL honor `prefers-reduced-motion` by removing or materially reducing animation.

#### Scenario: Visitor prefers reduced motion
- **WHEN** a visitor has `prefers-reduced-motion` enabled
- **THEN** optional interface animation is removed or materially reduced without impairing navigation or content access

#### Scenario: Sacred imagery is rendered
- **WHEN** a page displays Thakorji or guru imagery
- **THEN** that imagery has no animation, parallax, transform-on-scroll, or hover-motion effect

### Requirement: Static map and directions treatment
The Contact experience SHALL use a static map image and a Google Maps directions link for the approved site-facts content record address. The site SHALL NOT load an interactive map library or embedded interactive map as a dependency of this experience.

#### Scenario: Visitor requests directions
- **WHEN** a visitor activates the directions link near the static map
- **THEN** Google Maps opens with directions for the approved site-facts content record address

### Requirement: Mobile performance budgets
For a production-equivalent mobile assessment, the site SHALL achieve Lighthouse scores of at least 95 in Performance, Accessibility, Best Practices, and SEO and SHALL achieve LCP below 2 seconds on the agreed 4G test profile. The 150 KB shipped-client-JavaScript target remains aspirational for any future stack change. For this Next.js App Router implementation only, the approved release exception is 175,000 gzip bytes: the measured framework floor is 170,326 gzip bytes, with 4,674 bytes of normal content-growth headroom. This exception supersedes the original 150 KB target for this implementation. A release that does not meet its applicable budget SHALL not be eligible for production promotion until an exception is explicitly approved in a later change.

#### Scenario: Release candidate passes quality assessment
- **WHEN** the staging release is tested using the documented mobile profile
- **THEN** all four Lighthouse categories are at least 95, LCP is below 2 seconds on 4G, and shipped client JavaScript meets its applicable budget

#### Scenario: Current Next.js App Router release uses the approved exception
- **WHEN** this Next.js App Router implementation is assessed for shipped client JavaScript
- **THEN** it may use the approved 175,000 gzip-byte release budget, derived from the measured 170,326 gzip-byte framework floor plus 4,674 bytes of normal content-growth headroom

#### Scenario: Release candidate exceeds a budget
- **WHEN** a staging release misses a Lighthouse, LCP, or applicable JavaScript budget
- **THEN** it is reported as blocked and is not promoted under this change

### Requirement: Place and event structured data
The site SHALL emit schema.org `PlaceOfWorship` structured data from the approved site-facts content record, including its address and opening hours. Each public event detail page SHALL emit schema.org `Event` structured data reflecting its repository event record. Event JSON-LD SHALL serialize start and end date-times as ISO 8601 values with the correct `America/New_York` UTC offset; a multi-day event SHALL use its `endDate` for the end date-time. When an event's end time is not reliably known (for example, an approximate or open-ended end), Event JSON-LD MAY omit `endDate` rather than assert a fabricated one.

#### Scenario: Crawler inspects organization structured data
- **WHEN** a crawler reads the site structured data
- **THEN** it finds a `PlaceOfWorship` object whose address and opening hours match the approved site-facts content record

#### Scenario: Crawler inspects a single-day event detail page
- **WHEN** a crawler reads a single-day event detail page structured data
- **THEN** it finds an `Event` object with ISO 8601 start and end date-times using the correct America/New_York UTC offset

#### Scenario: Crawler inspects a multi-day event detail page
- **WHEN** a crawler reads a multi-day event detail page structured data
- **THEN** it finds an `Event` object whose end date-time uses `endDate` and the correct America/New_York UTC offset

#### Scenario: Crawler inspects an event with an approximate or open-ended end time
- **WHEN** a crawler reads structured data for an event whose end time is not reliably known
- **THEN** the `Event` object MAY omit `endDate` rather than asserting a fabricated end date-time

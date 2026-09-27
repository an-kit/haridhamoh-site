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
The Contact experience SHALL use a static map image and a Google Maps directions link for the approved address. The site SHALL NOT load an interactive map library or embedded interactive map as a dependency of this experience.

#### Scenario: Visitor requests directions
- **WHEN** a visitor activates the directions link near the static map
- **THEN** Google Maps opens with directions for 4755 Jeannette Rd, Hilliard, OH 43026

### Requirement: Mobile performance budgets
For a production-equivalent mobile assessment, the site SHALL achieve Lighthouse scores of at least 95 in Performance, Accessibility, Best Practices, and SEO; SHALL achieve LCP below 2 seconds on the agreed 4G test profile; and SHALL keep shipped client JavaScript below 150 KB. A release that does not meet any budget SHALL not be eligible for production promotion until the exception is explicitly approved in a later change.

#### Scenario: Release candidate passes quality assessment
- **WHEN** the staging release is tested using the documented mobile profile
- **THEN** all four Lighthouse categories are at least 95, LCP is below 2 seconds on 4G, and shipped client JavaScript is below 150 KB

#### Scenario: Release candidate exceeds a budget
- **WHEN** a staging release misses a Lighthouse, LCP, or JavaScript budget
- **THEN** it is reported as blocked and is not promoted under this change

### Requirement: Place and event structured data
The site SHALL emit schema.org `PlaceOfWorship` structured data that includes the approved address and opening hours. Each public event detail page SHALL emit schema.org `Event` structured data reflecting its repository event record.

#### Scenario: Crawler inspects organization structured data
- **WHEN** a crawler reads the site structured data
- **THEN** it finds a `PlaceOfWorship` object with the approved address and daily darshan opening hours

#### Scenario: Crawler inspects an event detail page
- **WHEN** a crawler reads an event detail page structured data
- **THEN** it finds an `Event` object matching the event title, date/time, location, image, and description
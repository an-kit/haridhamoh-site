## Why

Haridham Ohio currently relies on a WordPress/Elementor site on Namecheap hosting, which does not provide the desired static-site performance, controlled publishing workflow, or production cutover discipline. This change defines the v2 replacement as a content-first, English-only public site for HSAPSS Ohio without conflating it with BAPS.

## What Changes

- Create the specification for a static public website at the canonical domain `haridhamoh.org`, with Home, About, Upasana, Events, Guru Parampara, Centers, Contact, and Donate routes.
- Port existing English content only; omit Gujarati, sabha schedules, livestreams, and new editorial content from v1.
- Publish fixed organization facts: 4755 Jeannette Rd, Hilliard, OH 43026; 614.512.2761; daily darshan 8AM–1PM and 4PM–9PM.
- Use Zeffy-only donation calls to action, retain a WhatsApp community join link, and retire the PayPal donation button.
- Establish repository-owned JSON/Markdown content with schemas, event data, restricted agent edit boundaries, staging-first review, human production approval, and revertable commits.
- Define accessible visual, performance, structured-data, asset-provenance, AWS delivery, DNS-preservation, redirect-discovery, and future cutover requirements.
- **BREAKING**: The future deployed site replaces the current WordPress public experience; cutover is explicitly outside this change and remains separately authorized.

## Capabilities

### New Capabilities
- `public-site-experience`: English-only HSAPSS Ohio public information architecture, page content, navigation, contact/donation actions, and accurate organizational identity.
- `content-governance-and-events`: Repository content contracts, event presentation, agent-only content update boundary, staging review, and production publication approval.
- `accessible-static-site-quality`: Accessible visual contract, reduced-motion behavior, performance budgets, static map treatment, and required structured data.
- `delivery-and-cutover-governance`: Design-only infrastructure, DNS preservation, asset provenance, redirect discovery, and a separately gated production cutover.

### Modified Capabilities
- None; this repository has no existing OpenSpec capabilities.

## Impact

This is specification and design work only. It establishes future requirements for a Next.js static export, content assets, GitHub Actions, a dedicated AWS account, CloudFront/S3, ACM, Namecheap DNS, Zeffy links, and a later read-only WordPress URL crawl. It creates no application code, cloud resources, DNS records, scraping jobs, redirects, or deployment automation.

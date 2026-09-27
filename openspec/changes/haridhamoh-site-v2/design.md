## Context

See `proposal.md` for motivation and the delta specs for observable requirements. The repository is new and contains only this OpenSpec change. The intended public replacement is a static, English-only HSAPSS Ohio site at `haridhamoh.org`; current WordPress/Elementor hosting remains untouched during this change.

## Goals / Non-Goals

**Goals:**

- Establish a buildable future architecture for a fast static site without creating application or infrastructure artifacts now.
- Make content updates schema-governed, staging-first, reviewable, revertable, and limited to a dedicated Hermes operator identity.
- Preserve the public identity of HSAPSS Ohio / Haridham Ohio; it is not BAPS.
- Make production boundaries explicit: no cloud, DNS, asset collection, URL crawling, or cutover is authorized by this change.

**Non-Goals:**

- Implementing Next.js, Tailwind, shadcn/ui, Motion, CI, GitHub Actions, AWS, CloudFront, S3, ACM, Namecheap DNS, Zeffy, redirects, or content migration.
- Adding a CMS, Gujarati content, sabha schedules, livestreaming, a map library, PayPal, or HSAPSS Canada branding.
- Performing the current WordPress URL crawl, scraping/uploading assets, or creating the separate cutover change.

## Decisions

### 1. Static application boundary

The future application SHALL use Next.js App Router with `output: 'export'` and `trailingSlash: true`; Tailwind; shadcn/ui; and Motion only. Static export removes server-rendering and runtime API requirements from the public site, supports private-S3/CloudFront delivery, and keeps the client JavaScript budget governable.

Alternatives considered:
- WordPress/Elementor retention: rejected because it does not meet the static delivery and controlled-deployment goal.
- A hosted CMS or runtime API: rejected because the content model is explicitly repository-owned and no-CMS.
- Aceternity, Magic UI, Anime.js, or interactive map libraries: rejected by scope and because they increase visual/runtime complexity.

### 2. Route and content shape

Future routes will map to Home, About, Upasana, Events, event details, Guru Parampara, Centers, Contact, and Donate. All editorial data will live under `/content`, with images and approved media under `/public/uploads`. JSON Schemas will describe each JSON content type; Markdown front matter, where used, will be parsed and validated against an equivalent schema. Site facts are a single validated content record that supplies the visible address, phone number, darshan hours, and `PlaceOfWorship` JSON-LD. Events use the required fields:

```json
{
  "title": "string",
  "date": "YYYY-MM-DD",
  "startTime": "HH:MM",
  "endTime": "HH:MM",
  "location": "string",
  "image": "/uploads/...",
  "endDate": "YYYY-MM-DD, optional",
  "zeffyUrl": "https URL, optional",
  "description": "string"
}
```

Dates and times are evaluated in `America/New_York`. Event detail JSON-LD uses ISO 8601 date-times with the applicable New York UTC offset; multi-day events use `endDate` for the end date-time. The future implementation will retain route slugs as derived, validated identifiers rather than user-authored executable paths. A missing `zeffyUrl` produces no registration/payment call to action.

Every event is emitted into immutable static HTML with machine-readable date/time data. A small inline client script, counted toward the JavaScript budget, evaluates events in `America/New_York` at view time, hides elapsed event cards, and selects next upcoming events. The Home event section disappears without an empty-state message when no upcoming event remains. This replaces a scheduled-rebuild approach; production artifacts do not change merely because time passes.

### 3. Credential, repository-visibility, and production authorization boundary

Before any workflow or GitHub Actions environment is configured, a full-history gitleaks scan must have no findings and `an-kit/haridhamoh-site` must be public. Public visibility is a prerequisite for the intended required-reviewer and admin-bypass protections of the GitHub Actions `production` environment.

Before any workflow is created, the Hermes runtime must hold no credential capable of acting as Ankit on `an-kit/haridhamoh-site`, including approving environment deployments through an API. Enforcement is credential-side: Ankit's personal GitHub CLI authentication is removed from or scoped away from the Hermes runtime. The precondition is verified with `gh auth status` and a documented authorization check showing that the runtime token cannot list or approve pending deployments for this repository.

Hermes uses a dedicated GitHub App or fine-grained PAT scoped only to `an-kit/haridhamoh-site`, with `contents` and `pull-requests` write permission. It is the sole automated content operator. For a Hermes candidate, CI identifies the dedicated identity and evaluates the entire diff from the last successfully promoted production SHA to the candidate SHA; the resulting path set must be limited to `/content/**` and `/public/uploads/**`. CI fails closed if identity is absent or ambiguous, or if the full diff includes any other path. This intentionally blocks a Hermes content candidate when an unpromoted human code change on `main` is also part of that full diff; the human change must be promoted before the subsequent Hermes candidate can pass.

The future delivery state machine is:

1. A validated candidate is built once and stored in S3 under a key containing its commit SHA.
2. The immutable artifact deploys to staging at `new.haridhamoh.org`, which sends `X-Robots-Tag: noindex` and serves `robots.txt` with `Disallow: /`.
3. Hermes reports the staging preview URL and screenshot. Its role ends there.
4. The GitHub Actions `production` environment requires Ankit as reviewer, disallows admin bypass, and rejects approval by the dedicated Hermes identity.
5. Only a job executing in that `production` environment can assume the production OIDC role and deploy the already-built candidate SHA to production.
6. Production does not send `X-Robots-Tag: noindex` and does not disallow all crawling in `robots.txt`.

Human-maintainer code/configuration work is outside the Hermes content-update pathway and uses ordinary reviewed repository controls. It does not gain a content-path exception; any unpromoted human change participates in the full-diff gate until it is promoted.

Alternatives considered:
- A CMS editing interface: rejected by the no-CMS requirement.
- Direct production deploy for content changes: rejected because it bypasses staging review and the required production environment approval.
- Rebuilding at production promotion or rollback time: rejected because it breaks artifact equivalence and weakens rollback evidence.
- GitHub Actions artifacts as rollback storage: rejected because their retention expires; S3 SHA-keyed artifacts are retained instead.

### 4. Visual system, typography, and motion

The fixed tokens are saffron `#C0561F` / `#D4651A`, slate `#4A6078`, gold `#C8922A`, and cream `#FBF6EE`; Cormorant Garamond is display type and DM Sans is UI type. `#D4651A` and `#C8922A` are decorative/accent colors only where they would otherwise fail text contrast. The site will use dark neutral `#17212B` for primary body text, which is an implementation support color rather than a replacement for a fixed brand token.

| Text | Background | Ratio | WCAG AA status | Intended use |
|---|---:|---:|---|---|
| `#17212B` | `#FBF6EE` | 15.14:1 | Pass, normal and large text | Primary body and headings |
| `#4A6078` | `#FBF6EE` | 6.03:1 | Pass, normal and large text | Secondary text and links |
| `#FFFFFF` | `#C0561F` | 4.57:1 | Pass, normal and large text | Saffron buttons and labels |
| `#FBF6EE` | `#4A6078` | 6.03:1 | Pass, normal and large text | Slate buttons and inverse labels |
| `#C0561F` | `#FFFFFF` | 4.57:1 | Pass, normal and large text | Saffron text on white only |

The following pairs are prohibited for normal text and therefore are not rendered text/background combinations: `#C0561F` on `#FBF6EE` (4.25:1), `#D4651A` on `#FBF6EE` (3.44:1), `#C8922A` on `#FBF6EE` (2.57:1), and `#C8922A` on `#4A6078` (2.35:1). The contrast inventory will be updated whenever a rendered pair changes.

Motion will be purposeful and restricted to non-sacred interface elements. Thakorji and guru imagery receive no animation, parallax, transform, or hover motion. Motion behavior is removed or materially reduced for `prefers-reduced-motion`.

### 5. Map and structured data

Contact uses a responsive static map image stored with site assets and an external Google Maps directions URL for the approved site-facts record address. No interactive map embed or map library is needed. The future site emits `PlaceOfWorship` JSON-LD from the site-facts record and `Event` JSON-LD from each event record. Structured data is generated from the same validated content sources that render visible facts.

### 6. Asset provenance

Asset inventory and downloading are deferred. The approved future source boundaries are Haridham Ohio WordPress uploads at `haridhamoh.org/wp-content/uploads` and shared organization guru/parampara imagery from `hsapss.ca`; the latter excludes HSAPSS Canada branding. The inventory must record source URL, original dimensions, file type, and permitted use. It will choose original high-resolution files, never `_next/image` resized output URLs.

### 7. Delivery architecture, artifact retention, and DNS boundary

A future implementation will use Ankit's existing AWS account `392340646785`, isolated by project rather than by a second account. Every Haridham Ohio resource SHALL carry `Project=haridhamoh-site` consistently and remain distinct from kiosk resource tags. The implementation SHALL use dedicated project-only staging and production IAM deploy roles; it SHALL NOT reuse `sat-track-deploy` or any `kioskorder-*` role. It SHALL use separate Haridham Ohio S3 bucket origins and CloudFront distributions, with no shared bucket or distribution with kiosk, private S3 origins, CloudFront Origin Access Control, and ACM certificates in `us-east-1`. Staging is `new.haridhamoh.org`; production is `haridhamoh.org`. GitHub Actions will assume the separately scoped project roles through OIDC, with no long-lived AWS keys. The production role trust policy allows assumption only from the GitHub Actions `production` environment. Before initial deploy, a dedicated AWS Budget scoped to `Project=haridhamoh-site`, separate from any kiosk budget, must be configured and an alert delivery test recorded.

Built artifacts are stored in S3 with commit-SHA keys. A rollback selects any retained prior production SHA that Ankit approves through the same protected `production` environment; it redeploys the selected existing S3 artifact without rebuilding. GitHub Actions artifacts are not the rollback source.

DNS stays in Namecheap. A future preflight must confirm the currently available Namecheap apex ALIAS/ANAME-style capability before production mapping; it must not change MX, SPF, DKIM, or Google Workspace TXT records. No DNS lookup or modification is performed now.

### 8. Redirects and cutover are separate

A later read-only task will enumerate every current WordPress URL and produce a reviewed 301 redirect map. This change explicitly does not perform that crawl or write redirects. Production DNS cutover requires a separate OpenSpec change and a HARD STOP-AND-REPORT gate: full current Namecheap DNS export in the report, staging acceptance evidence with synthetic events, and explicit authorization from Ankit. WordPress remains live as a rollback option through June 2027.

## Risks / Trade-offs

- [Repository must be public before the production environment is configured] → Run gitleaks against full history with no findings before visibility changes; do not configure workflows or environments until the repository is public.
- [The protected production approval gate depends on public visibility] → Treat visibility and clean-history verification as a hard prerequisite, documented before any workflow/environment write.
- [Current WordPress URL coverage is unknown] → Do not infer redirect mappings; perform the later read-only crawl and review its complete output before implementation.
- [Existing assets may contain low-resolution copies or Canada branding] → Produce a provenance and dimensions inventory before approving assets; select only permitted originals.
- [Namecheap apex record behavior may not support the expected mapping] → Confirm support before provisioning a production DNS plan; no DNS changes without the later hard gate.
- [Dedicated Hermes identity may be absent or ambiguous] → Fail closed for agent-originated updates and do not use any credential capable of acting as Ankit.
- [An unpromoted human change can block a Hermes content update] → Promote the human change first, then evaluate the Hermes candidate from that new production SHA.
- [A synthetic event may not represent all content defects] → Require schema validation, route tests, JSON-LD checks, and visual screenshot review in addition to staging synthetic-event acceptance tests.
- [Lighthouse, LCP, and JavaScript budgets vary by test environment] → Version-control the test profile, mobile viewport, network/CPU configuration, audit tool version, and artifact output; compare like-for-like.
- [Visual movement can be inappropriate around sacred imagery] → Maintain an explicit image classification list and test that sacred components receive no Motion props/classes.
- [WordPress rollback may accumulate divergence after launch] → Retain it unchanged as rollback only through June 2027; do not treat it as a parallel content source after cutover.

## Migration Plan

1. Keep the current WordPress/Elementor production site and Namecheap DNS unchanged while this specification is reviewed.
2. Before any workflow or environment configuration, run a full-history gitleaks scan, resolve all findings, and make the repository public.
3. Before any workflow is created, remove Ankit-capable GitHub authentication from the Hermes runtime or scope it away, then document the negative authorization check.
4. In a later implementation change, create the static application and content schemas; do not deploy or collect production assets before approved tasks authorize it.
5. In that later work, assemble provenance-approved assets and port only approved English content; do not create new editorial sections.
6. Provision and verify staging delivery, then run schema, build, mobile Lighthouse, 4G LCP, JavaScript-budget, accessibility, JSON-LD, synthetic-event, and production-environment approval checks.
7. Create a separate OpenSpec cutover change. Its first gate exports the full current Namecheap DNS record set into the report and stops if any named precondition is absent.
8. After Ankit explicitly authorizes the separate cutover, update only the approved web routing records, preserve all mail/Google Workspace records, and retain WordPress as rollback through June 2027.

Rollback: before the June 2027 retention deadline, restore the documented prior web-routing records from the pre-cutover DNS export and serve the still-live WordPress site. Before that DNS rollback boundary, application rollback deploys an Ankit-selected retained production SHA from S3 without rebuilding it. This design does not authorize performing either rollback or any DNS write.

## Open Questions

- The approved Zeffy donation URL and WhatsApp community join URL have not been supplied; they are required content inputs before a future implementation can render live calls to action.
- Existing URLs for the four Centers destinations must be copied from the current approved site/content during the later source-review task; this change does not browse or validate them.
- The dedicated identity may be implemented as a GitHub App or fine-grained PAT; the selected mechanism must satisfy the fixed repository-only permission and runtime credential-precondition requirements before any workflow is created.
- The selected 4G/mobile Lighthouse test profile requires an implementation-time decision and versioned test configuration before performance acceptance can be claimed.

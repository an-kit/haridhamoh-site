## Context

See `proposal.md` for motivation and the delta specs for observable requirements. The repository is new and contains only this OpenSpec change. The intended public replacement is a static, English-only HSAPSS Ohio site at `haridhamoh.org`; current WordPress/Elementor hosting remains untouched during this change.

## Goals / Non-Goals

**Goals:**

- Establish a buildable future architecture for a fast static site without creating application or infrastructure artifacts now.
- Make content updates schema-governed, staging-first, reviewable, revertable, and limited to a single Hermes operator acting for Ankit.
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
- WordPress/Elementor retention: rejected because it does not meet the static delivery and controlled publish-flow goal.
- A hosted CMS or runtime API: rejected because the content model is explicitly repository-owned and no-CMS.
- Aceternity, Magic UI, Anime.js, or interactive map libraries: rejected by scope and because they increase visual/runtime complexity.

### 2. Route and content shape

Future routes will map to Home, About, Upasana, Events, event details, Guru Parampara, Centers, Contact, and Donate. All editorial data will live under `/content`, with images and approved media under `/public/uploads`. JSON Schemas will describe each JSON content type; Markdown front matter, where used, will be parsed and validated against an equivalent schema. Events use the required fields:

```json
{
  "title": "string",
  "date": "YYYY-MM-DD",
  "startTime": "HH:MM",
  "endTime": "HH:MM",
  "location": "string",
  "image": "/uploads/...",
  "zeffyUrl": "https URL, optional",
  "description": "string"
}
```

The future implementation will retain route slugs as derived, validated identifiers rather than user-authored executable paths. A missing `zeffyUrl` produces no registration/payment call to action.

### 3. Content-edit authorization and promotion

`main` is the production source branch. Each approved content commit is first built and deployed to staging from its immutable commit SHA; production promotion deploys the exact already-validated SHA, not a rebuild from a later branch head. Hermes is the only authorized automated content operator, acting only when instructed by Ankit. CI will enforce the boundary for commits attributed to the Hermes bot identity: the changed-path set must be a subset of `/content/**` and `/public/uploads/**`; any other changed path fails the workflow.

The future delivery state machine is:

1. Hermes creates a revertable commit limited to the permitted paths.
2. CI verifies the author identity rule, changed-path rule, schemas, static build, and quality checks.
3. The exact commit deploys to `new.haridhamoh.org`.
4. Hermes reports the preview URL and a screenshot tied to that commit.
5. Ankit replies exactly `publish` in the originating approval context.
6. A protected promotion workflow deploys that same SHA to production.

Human-maintainer code/configuration work is outside this agent-content pathway and uses ordinary reviewed repository controls; it is not silently authorized by this design. If commit attribution cannot be reliably established by the selected GitHub identity mechanism, the workflow SHALL fail closed rather than infer agent authorship.

Alternatives considered:
- A CMS editing interface: rejected by the no-CMS requirement.
- Direct production deploy for content changes: rejected because it bypasses the preview and explicit authorization gate.
- Rebuilding at promotion time: rejected because the preview would no longer prove the exact production artifact.

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

Contact uses a responsive static map image stored with site assets and an external Google Maps directions URL for the approved address. No interactive map embed or map library is needed. The future site emits `PlaceOfWorship` JSON-LD with address and daily darshan hours, plus `Event` JSON-LD from each event record. Structured data is generated from the same validated content source that renders visible facts.

### 6. Asset provenance

Asset inventory and downloading are deferred. The approved future source boundaries are Haridham Ohio WordPress uploads at `haridhamoh.org/wp-content/uploads` and shared organization guru/parampara imagery from `hsapss.ca`; the latter excludes HSAPSS Canada branding. The inventory must record source URL, original dimensions, file type, and permitted use. It will choose original high-resolution files, never `_next/image` resized output URLs.

### 7. Delivery architecture and DNS boundary

A future implementation will use a fresh dedicated AWS account, private S3 bucket origins, CloudFront Origin Access Control, ACM certificates in `us-east-1`, and separate staging/prod distributions. Staging is `new.haridhamoh.org`; production is `haridhamoh.org`. GitHub Actions will assume separately scoped staging and production IAM roles through OIDC, with no long-lived AWS keys. Before initial deploy, the AWS Budget alert must be configured and an alert delivery test recorded.

DNS stays in Namecheap. A future preflight must confirm the currently available Namecheap apex ALIAS/ANAME-style capability before production mapping; it must not change MX, SPF, DKIM, or Google Workspace TXT records. No DNS lookup or modification is performed now.

### 8. Redirects and cutover are separate

A later read-only task will enumerate every current WordPress URL and produce a reviewed 301 redirect map. This change explicitly does not perform that crawl or write redirects. Production DNS cutover requires a separate OpenSpec change and a HARD STOP-AND-REPORT gate: full current Namecheap DNS export in the report, staging acceptance evidence with synthetic events, and explicit authorization from Ankit. WordPress remains live as a rollback option through June 2027.

## Risks / Trade-offs

- [Current WordPress URL coverage is unknown] → Do not infer redirect mappings; perform the later read-only crawl and review its complete output before implementation.
- [Existing assets may contain low-resolution copies or Canada branding] → Produce a provenance and dimensions inventory before approving assets; select only permitted originals.
- [Namecheap apex record behavior may not support the expected mapping] → Confirm support before provisioning a production DNS plan; no DNS changes without the later hard gate.
- [Agent identity may be ambiguous in GitHub Actions] → Fail closed for agent-originated updates unless the author/actor rule is technically enforceable and tested.
- [A synthetic event may not represent all content defects] → Require schema validation, route tests, JSON-LD checks, and visual screenshot review in addition to staging synthetic-event acceptance tests.
- [Lighthouse, LCP, and JavaScript budgets vary by test environment] → Version-control the test profile, mobile viewport, network/CPU configuration, audit tool version, and artifact output; compare like-for-like.
- [Visual movement can be inappropriate around sacred imagery] → Maintain an explicit image classification list and test that sacred components receive no Motion props/classes.
- [WordPress rollback may accumulate divergence after launch] → Retain it unchanged as rollback only through June 2027; do not treat it as a parallel content source after cutover.

## Migration Plan

1. Keep the current WordPress/Elementor production site and Namecheap DNS unchanged while this specification is reviewed.
2. In a later implementation change, create the static application and content schemas; do not deploy or collect production assets before approved tasks authorize it.
3. In that later work, assemble provenance-approved assets and port only approved English content; do not create new editorial sections.
4. Provision and verify staging delivery, then run schema, build, mobile Lighthouse, 4G LCP, JavaScript-budget, accessibility, JSON-LD, and synthetic-event acceptance checks.
5. Create a separate OpenSpec cutover change. Its first gate exports the full current Namecheap DNS record set into the report and stops if any named precondition is absent.
6. After Ankit explicitly authorizes the separate cutover, update only the approved web routing records, preserve all mail/Google Workspace records, and retain WordPress as rollback through June 2027.

Rollback: before the June 2027 retention deadline, restore the documented prior web-routing records from the pre-cutover DNS export and serve the still-live WordPress site. This design does not authorize performing that rollback or any DNS write.

## Open Questions

- The approved Zeffy donation URL and WhatsApp community join URL have not been supplied; they are required content inputs before a future implementation can render live calls to action.
- Existing URLs for the four Centers destinations must be copied from the current approved site/content during the later source-review task; this change does not browse or validate them.
- The exact GitHub identity/actor mechanism that will distinguish Hermes-originated commits requires implementation-time verification; the fail-closed policy is fixed here.
- The selected 4G/mobile Lighthouse test profile requires an implementation-time decision and versioned test configuration before performance acceptance can be claimed.

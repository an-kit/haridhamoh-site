## Purpose

Define the non-destructive delivery, index-control, rollback, artifact-retention, and future cutover controls for a Haridham Ohio static-site replacement while preserving Namecheap DNS ownership and the live WordPress rollback path.

## ADDED Requirements

### Requirement: Dedicated-account static delivery design
The implementation design SHALL target a fresh dedicated AWS account with private S3 origins, CloudFront Origin Access Control, and an ACM certificate in `us-east-1`. It SHALL define separate staging and production distributions, with staging at `new.haridhamoh.org` and production at `haridhamoh.org`. It SHALL NOT use S3 website hosting. GitHub Actions deployment design SHALL use OIDC with separately scoped staging and production roles and no long-lived AWS access keys. The production deploy role SHALL be assumable only from the GitHub Actions `production` environment. An AWS Budget alert SHALL be tested before the first deployment.

#### Scenario: Infrastructure design is reviewed
- **WHEN** an operator reviews the delivery design before implementation
- **THEN** it specifies private S3, CloudFront OAC, ACM in `us-east-1`, two distributions, OIDC roles scoped by environment, a production role restricted to the `production` environment, and a tested budget alert

#### Scenario: Production role is requested outside the production environment
- **WHEN** a workflow outside the GitHub Actions `production` environment attempts to assume the production deploy role
- **THEN** the role assumption is denied

#### Scenario: Proposed hosting uses a public S3 website endpoint
- **WHEN** a hosting plan proposes S3 website hosting or a publicly reachable bucket origin
- **THEN** it is rejected as nonconforming

### Requirement: Durable commit-SHA artifact retention
Built site artifacts SHALL be stored in S3 under keys that include their commit SHA. GitHub Actions artifacts SHALL NOT be the retained rollback source. The artifact store SHALL retain each production SHA eligible for rollback so it can be redeployed without rebuilding.

#### Scenario: Production artifact is retained
- **WHEN** a commit SHA is promoted to production
- **THEN** its already-built artifact is retained in S3 under a key containing that commit SHA

#### Scenario: GitHub Actions artifact expires
- **WHEN** a GitHub Actions artifact expires or is unavailable
- **THEN** the S3 artifact for an eligible production SHA remains the rollback source

### Requirement: Environment-specific crawl control
Staging SHALL return `X-Robots-Tag: noindex` and serve a `robots.txt` containing `Disallow: /`. Production SHALL NOT send that noindex header and SHALL NOT serve a production `robots.txt` that disallows all crawling.

#### Scenario: Crawler requests staging
- **WHEN** a crawler requests a staging page or staging `robots.txt`
- **THEN** the page response includes `X-Robots-Tag: noindex` and `robots.txt` contains `Disallow: /`

#### Scenario: Crawler requests production
- **WHEN** a crawler requests a production page or production `robots.txt`
- **THEN** the page response does not include `X-Robots-Tag: noindex` and `robots.txt` does not disallow all crawling

### Requirement: Namecheap DNS preservation
DNS authority SHALL remain at Namecheap. Before apex cutover planning, the team SHALL confirm Namecheap support for the required apex ALIAS/ANAME-style record. No work in this change or the later cutover change SHALL modify MX, SPF, DKIM, or Google Workspace TXT records.

#### Scenario: DNS cutover preparation begins
- **WHEN** DNS preparation is proposed
- **THEN** the plan records Namecheap apex ALIAS support and preserves all MX, SPF, DKIM, and Google Workspace TXT records unchanged

### Requirement: Asset provenance and source limits
The later implementation MAY source Haridham Ohio assets from `haridhamoh.org/wp-content/uploads` and MAY source only shared organizational guru/parampara imagery from `hsapss.ca`. It SHALL NOT copy HSAPSS Canada branding. Asset selection SHALL prefer highest-resolution original files and SHALL NOT use `_next/image` resized render outputs as source originals.

#### Scenario: Canada-originated imagery is proposed
- **WHEN** an asset is selected from hsapss.ca
- **THEN** review confirms it is shared organizational guru/parampara imagery and not HSAPSS Canada branding

#### Scenario: An image source has variants
- **WHEN** an asset source provides original and resized-render variants
- **THEN** the asset inventory selects the highest-resolution original rather than a `_next/image` render

### Requirement: Deferred redirect inventory
The future implementation SHALL produce a 301 redirect map covering every current WordPress URL, but this change SHALL NOT crawl or enumerate those URLs. URL discovery SHALL occur only in a later, read-only task and its output SHALL be reviewed before redirects are implemented.

#### Scenario: This change is executed
- **WHEN** work is performed under `haridhamoh-site-v2`
- **THEN** no WordPress crawl, redirect inventory, or redirect implementation is performed

#### Scenario: Redirect implementation is later proposed
- **WHEN** a future change plans redirects
- **THEN** it begins from a reviewed read-only inventory of every current WordPress URL

### Requirement: Approved-artifact rollback workflow
The delivery system SHALL provide a rollback workflow that redeploys any prior production SHA selected by Ankit from its already-built S3 artifact without rebuilding it. The rollback workflow SHALL require the same GitHub Actions `production` environment approval from Ankit as a forward production promotion, and the dedicated Hermes identity SHALL NOT approve it.

#### Scenario: Approved rollback is requested
- **WHEN** Ankit selects a retained prior production SHA and approves rollback in the GitHub Actions `production` environment
- **THEN** the workflow redeploys that SHA's already-built S3 artifact without a new build

#### Scenario: Rollback approval is absent or attempted by Hermes
- **WHEN** the required production-environment approval is absent or the dedicated Hermes identity attempts to approve rollback
- **THEN** rollback does not execute

### Requirement: Separate hard-gated production cutover
Production cutover SHALL be specified in a separate OpenSpec change with a HARD STOP-AND-REPORT gate. The separate change SHALL require: an exported full current Namecheap DNS record list in its report; staging acceptance tests passed with synthetic events; and explicit authorization from Ankit. WordPress SHALL remain live as rollback until June 2027.

#### Scenario: Cutover preconditions are incomplete
- **WHEN** the DNS export, synthetic-event staging acceptance evidence, or Ankit authorization is missing
- **THEN** the cutover change stops, reports the missing precondition, and does not modify production DNS

#### Scenario: Cutover is authorized
- **WHEN** all named preconditions are documented and Ankit explicitly authorizes cutover
- **THEN** the change may proceed only under its separate approved cutover specification while retaining WordPress as rollback through June 2027

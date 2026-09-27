## Purpose

Define the non-destructive delivery and future cutover controls for a Haridham Ohio static-site replacement while preserving Namecheap DNS ownership and the live WordPress rollback path.

## ADDED Requirements

### Requirement: Dedicated-account static delivery design
The implementation design SHALL target a fresh dedicated AWS account with private S3 origins, CloudFront Origin Access Control, and an ACM certificate in `us-east-1`. It SHALL define separate staging and production distributions, with staging at `new.haridhamoh.org` and production at `haridhamoh.org`. It SHALL NOT use S3 website hosting. GitHub Actions deployment design SHALL use OIDC with separately scoped staging and production roles and no long-lived AWS access keys. An AWS Budget alert SHALL be tested before the first deployment.

#### Scenario: Infrastructure design is reviewed
- **WHEN** an operator reviews the delivery design before implementation
- **THEN** it specifies private S3, CloudFront OAC, ACM in `us-east-1`, two distributions, OIDC roles scoped by environment, and a tested budget alert

#### Scenario: Proposed hosting uses a public S3 website endpoint
- **WHEN** a hosting plan proposes S3 website hosting or a publicly reachable bucket origin
- **THEN** it is rejected as nonconforming

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

### Requirement: Separate hard-gated production cutover
Production cutover SHALL be specified in a separate OpenSpec change with a HARD STOP-AND-REPORT gate. The separate change SHALL require: an exported full current Namecheap DNS record list in its report; staging acceptance tests passed with synthetic events; and explicit authorization from Ankit. WordPress SHALL remain live as rollback until June 2027.

#### Scenario: Cutover preconditions are incomplete
- **WHEN** the DNS export, synthetic-event staging acceptance evidence, or Ankit authorization is missing
- **THEN** the cutover change stops, reports the missing precondition, and does not modify production DNS

#### Scenario: Cutover is authorized
- **WHEN** all named preconditions are documented and Ankit explicitly authorizes cutover
- **THEN** the change may proceed only under its separate approved cutover specification while retaining WordPress as rollback through June 2027
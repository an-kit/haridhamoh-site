## Purpose

Define schema-validated repository content, event behavior, and a constrained staging-first update process for Haridham Ohio without introducing a CMS.

## ADDED Requirements

### Requirement: Repository-owned validated content
The public site's editable content SHALL be stored under `/content` as JSON and/or Markdown and SHALL be validated by version-controlled JSON Schemas. The approved site-facts content record SHALL contain the address, phone number, and darshan hours. Its initial approved values SHALL be `4755 Jeannette Rd, Hilliard, OH 43026`, `614.512.2761`, and `Sun–Sat 8AM–1PM, 4PM–9PM`. Visible public facts and `PlaceOfWorship` structured data SHALL derive from this same record. Invalid content SHALL fail continuous integration before build or deployment.

#### Scenario: Valid site-facts record is proposed
- **WHEN** a site-facts content record contains the required address, phone number, and darshan hours
- **THEN** schema validation accepts the record and both visible pages and `PlaceOfWorship` structured data consume that same record

#### Scenario: Site-facts record is incomplete
- **WHEN** a content change omits a required site-facts field or provides an invalid field type
- **THEN** continuous integration fails before build and deployment

### Requirement: Event content schema and timezone
Each event record SHALL contain title, date, start time, end time, location, image, optional `endDate`, optional `zeffyUrl`, and description. `date` and optional `endDate` SHALL use `YYYY-MM-DD`; all event dates and times SHALL be evaluated in `America/New_York`. `endDate` SHALL be used only for multi-day events and, when present, SHALL not precede `date`.

#### Scenario: Valid multi-day event is proposed
- **WHEN** a content change supplies an event with `date`, a later or equal `endDate`, start time, end time, and all other required event fields
- **THEN** schema validation accepts the multi-day event

#### Scenario: Invalid event timezone or date range is proposed
- **WHEN** a content change provides an invalid date format, omits a required time, or supplies an `endDate` earlier than `date`
- **THEN** continuous integration fails before build and deployment

### Requirement: View-time event lifecycle
All events SHALL render in static HTML with machine-readable date and time data. A small inline script, counted toward the client JavaScript budget, SHALL evaluate events in `America/New_York` at view time, hide elapsed events, and select the next upcoming events. Production artifacts SHALL remain immutable; this lifecycle behavior SHALL NOT require a scheduled rebuild or a content change.

#### Scenario: Event elapses after production deployment
- **WHEN** a visitor views a production artifact after an event's date or `endDate` has elapsed in America/New_York
- **THEN** the inline script hides the elapsed event without changing or rebuilding the production artifact

#### Scenario: Multi-day event remains eligible at view time
- **WHEN** a visitor views a production artifact on a date within a multi-day event's inclusive date range in America/New_York
- **THEN** the inline script treats the event as upcoming

#### Scenario: No events remain upcoming at view time
- **WHEN** the inline script finds no upcoming events in America/New_York
- **THEN** it hides the Home event section without rendering a `no upcoming events` message

### Requirement: Event listing and detail behavior
The Events experience SHALL render event records in static HTML and SHALL link each listed event to its own public detail page. The view-time lifecycle behavior SHALL hide elapsed event cards. An event with `zeffyUrl` SHALL expose an event-specific Zeffy action; an event without `zeffyUrl` SHALL NOT fabricate a registration or donation destination.

#### Scenario: Event has a Zeffy URL
- **WHEN** a visitor opens an event whose content includes `zeffyUrl`
- **THEN** the detail page presents the supplied Zeffy destination

#### Scenario: Event has no Zeffy URL
- **WHEN** a visitor opens an event whose content omits `zeffyUrl`
- **THEN** the detail page presents its event details without a fabricated transaction link

### Requirement: Public-visibility precondition
`an-kit/haridhamoh-site` SHALL be public before any GitHub Actions workflow or environment is configured. Before its visibility is made public, a gitleaks scan of the repository's full history SHALL report no findings.

#### Scenario: Repository is prepared for visibility change
- **WHEN** implementation prepares to make `an-kit/haridhamoh-site` public
- **THEN** a full-history gitleaks scan reports no findings before the visibility change occurs

#### Scenario: Workflow or environment configuration is attempted while private
- **WHEN** the repository is not public and implementation attempts to configure a GitHub Actions workflow or environment
- **THEN** the configuration step is blocked until the repository is public

### Requirement: Hermes runtime credential precondition
Before any workflow is created, the Hermes runtime SHALL hold no credential capable of acting as Ankit on `an-kit/haridhamoh-site`, including a credential capable of approving environment deployments through an API. Enforcement SHALL be credential-side: Ankit's personal GitHub CLI authentication SHALL be removed from or scoped away from the Hermes runtime environment before implementation begins.

#### Scenario: Credential precondition is verified before workflow creation
- **WHEN** implementation is about to create a workflow
- **THEN** `gh auth status` and a documented authorization check show that Hermes's available token cannot list or approve pending deployments for `an-kit/haridhamoh-site`

### Requirement: Dedicated Hermes identity and constrained update boundary
Hermes SHALL use a dedicated GitHub identity, implemented as a GitHub App or fine-grained personal access token, scoped only to `an-kit/haridhamoh-site` with `contents` and `pull-requests` write permission. For agent-originated content updates, Hermes SHALL be the single permitted operator and SHALL modify only `/content` and `/public/uploads`. Continuous integration SHALL determine the dedicated Hermes identity before applying the changed-path rule. The changed-path rule SHALL evaluate the full diff between the last successfully promoted production SHA and the candidate SHA, SHALL fail if that full diff alters any path outside `/content` and `/public/uploads`, and SHALL fail closed if the dedicated identity cannot be determined. All accepted updates SHALL be represented by revertable commits.

#### Scenario: Dedicated Hermes identity changes content only
- **WHEN** the dedicated Hermes identity submits a candidate whose full diff from the last successfully promoted production SHA is limited to `/content` and/or `/public/uploads`
- **THEN** continuous integration evaluates the identity, full diff, schemas, and build, and permits the staging path only if all checks pass

#### Scenario: Earlier out-of-bound commit is followed by a content-only commit
- **WHEN** a candidate contains an earlier dedicated-Hermes commit that changes a path outside `/content` or `/public/uploads` followed by a content-only commit
- **THEN** continuous integration fails the candidate based on the full diff from the last successfully promoted production SHA and does not deploy

#### Scenario: Unpromoted human code change precedes a Hermes candidate
- **WHEN** an Ankit human code change on `main` is not yet promoted and a subsequent Hermes content candidate is evaluated
- **THEN** continuous integration fails the candidate because the full diff from the last successfully promoted production SHA contains the unpromoted human code change

#### Scenario: Identity is absent or ambiguous
- **WHEN** continuous integration cannot determine the dedicated Hermes identity
- **THEN** continuous integration fails closed and the update does not deploy

### Requirement: Staging-first production-environment authorization
Every accepted content change SHALL follow this sequence: commit; CI identity/path and schema validation; build; deploy to staging; Hermes reports the staging preview URL and screenshot; GitHub Actions `production` environment approval by Ankit; then and only then promotion of the approved commit to production. Ankit SHALL be a required reviewer for the `production` environment, and administrator bypass SHALL be disabled. The dedicated Hermes identity SHALL NOT approve that environment. Hermes's role SHALL end after reporting the staging preview URL and screenshot. Absence of the required environment approval SHALL block production promotion.

#### Scenario: Staging verification awaits production-environment approval
- **WHEN** a content change has passed CI and deployed to staging
- **THEN** Hermes reports the preview URL and screenshot and production remains unchanged until Ankit approves the GitHub Actions `production` environment

#### Scenario: Administrator bypass is attempted
- **WHEN** an administrator attempts to bypass the GitHub Actions `production` environment approval
- **THEN** the bypass is rejected and production promotion remains blocked

#### Scenario: Hermes attempts production approval
- **WHEN** the dedicated Hermes identity attempts to approve the GitHub Actions `production` environment
- **THEN** the approval is rejected and production promotion remains blocked

#### Scenario: Production-environment approval is absent
- **WHEN** the deployment has not received the required GitHub Actions `production` environment approval from Ankit
- **THEN** the deployment workflow does not promote the change to production

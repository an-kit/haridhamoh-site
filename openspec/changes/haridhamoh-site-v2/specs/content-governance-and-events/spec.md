## Purpose

Define schema-validated repository content, event behavior, and a constrained staging-first update process for Haridham Ohio without introducing a CMS.

## ADDED Requirements

### Requirement: Repository-owned validated content
The public site's editable content SHALL be stored under `/content` as JSON and/or Markdown and SHALL be validated by version-controlled JSON Schemas. Each event record SHALL contain title, date, start time, end time, location, image, optional `zeffyUrl`, and description. Invalid content SHALL fail continuous integration before build or deployment.

#### Scenario: Valid event record is proposed
- **WHEN** a content change supplies all required event fields with a valid optional Zeffy URL
- **THEN** schema validation accepts the event record for build

#### Scenario: Event record is incomplete
- **WHEN** a content change omits a required event field or provides an invalid field type
- **THEN** continuous integration fails before build and deployment

### Requirement: Event listing and detail behavior
The Events list SHALL render the event records available in repository content and SHALL link each listed event to its own public detail page. An event with `zeffyUrl` SHALL expose an event-specific Zeffy action; an event without `zeffyUrl` SHALL NOT fabricate a registration or donation destination.

#### Scenario: Event has a Zeffy URL
- **WHEN** a visitor opens an event whose content includes `zeffyUrl`
- **THEN** the detail page presents the supplied Zeffy destination

#### Scenario: Event has no Zeffy URL
- **WHEN** a visitor opens an event whose content omits `zeffyUrl`
- **THEN** the detail page presents its event details without a fabricated transaction link

### Requirement: Constrained Hermes content update boundary
For agent-originated content updates, Hermes SHALL be the single permitted operator and SHALL modify only `/content` and `/public/uploads`. Continuous integration SHALL fail an agent-identity change that alters any path outside those two boundaries. All accepted updates SHALL be represented by revertable commits.

#### Scenario: Hermes changes content only
- **WHEN** Hermes submits an update limited to `/content` and/or `/public/uploads`
- **THEN** continuous integration evaluates schemas, builds the site, and permits the staging path if all checks pass

#### Scenario: Hermes attempts an out-of-bound change
- **WHEN** a commit attributed to Hermes changes a path outside `/content` or `/public/uploads`
- **THEN** continuous integration fails and the update does not deploy

### Requirement: Staging-first human publication authorization
Every accepted content change SHALL follow this sequence: commit; CI schema validation; build; deploy to staging; Hermes reports the staging preview URL and screenshot; Ankit explicitly replies `publish`; then and only then the approved commit is promoted to production. Absence of the exact authorization SHALL block production promotion.

#### Scenario: Staging verification awaits authorization
- **WHEN** a content change has passed CI and deployed to staging
- **THEN** Hermes reports the preview URL and screenshot and production remains unchanged until Ankit replies `publish`

#### Scenario: Authorization is absent or different
- **WHEN** the staging report has no explicit `publish` reply from Ankit
- **THEN** the deployment workflow does not promote the change to production
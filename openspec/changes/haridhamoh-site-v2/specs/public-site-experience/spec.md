## Purpose

Define the English-only public experience for HSAPSS Ohio (Haridham Ohio) and preserve its distinct organizational identity, accurate location information, and approved public actions.

## ADDED Requirements

### Requirement: HSAPSS Ohio identity and facts
The site SHALL identify the organization as HSAPSS Ohio / Haridham Ohio and SHALL NOT describe, brand, or imply that it is BAPS. All ported and newly written visible copy SHALL preserve this distinction. The site SHALL display the address `4755 Jeannette Rd, Hilliard, OH 43026`, telephone number `614.512.2761`, and darshan hours `Sun–Sat 8AM–1PM, 4PM–9PM` where public contact or visit information is presented. The site SHALL use `Sokhada` and `Hariprasad Swamiji` when those names occur.

#### Scenario: Visitor views contact information
- **WHEN** a visitor opens the Contact page or a global contact surface
- **THEN** the address, phone number, and darshan hours match the approved facts exactly

#### Scenario: Visitor encounters organization identity
- **WHEN** a visitor reads a page title, navigation label, footer, or organization description
- **THEN** the site identifies HSAPSS Ohio / Haridham Ohio without conflating it with BAPS

#### Scenario: Ported copy names Sokhada or Hariprasad Swamiji
- **WHEN** imported English content includes either corrected name
- **THEN** it uses `Sokhada` and `Hariprasad Swamiji` rather than the known erroneous spellings

### Requirement: English v1 information architecture
The site SHALL provide navigable public routes for Home, About, Upasana, Events, individual Event pages, Guru Parampara, Centers, Contact, and Donate. v1 SHALL port existing English content only. v1 SHALL NOT include Gujarati content, a sabha schedule, livestream functionality, or unapproved new editorial content.

#### Scenario: Visitor uses primary navigation
- **WHEN** a visitor opens the site navigation
- **THEN** they can reach every required public route and do not see a Gujarati, sabha schedule, or livestream route

#### Scenario: Visitor opens an event
- **WHEN** a visitor selects an event from the Events list
- **THEN** the site opens a distinct page for that event

### Requirement: Centers and outbound community actions
The Centers page SHALL link to the existing approved external center destinations for Vadodara, India; New Jersey; Maryland; and Chicago. The site SHALL provide the approved WhatsApp community join link. External destinations SHALL be distinguishable from internal navigation.

#### Scenario: Visitor selects an external center
- **WHEN** a visitor activates a Centers link for Vadodara, New Jersey, Maryland, or Chicago
- **THEN** the approved existing destination opens without representing that center as Haridham Ohio

#### Scenario: Visitor selects the WhatsApp call to action
- **WHEN** a visitor activates the WhatsApp community link
- **THEN** the approved community join destination opens

### Requirement: Zeffy-only donation journey
The Donate page and any donation call to action SHALL use Zeffy as the only donation provider. The site SHALL NOT render a PayPal donation button or PayPal donation destination.

#### Scenario: Visitor starts a donation
- **WHEN** a visitor activates a donation call to action
- **THEN** the destination is the configured Zeffy URL

#### Scenario: Visitor reviews donation controls
- **WHEN** a visitor views the Donate page and global donation calls to action
- **THEN** no PayPal button, form, script, or destination is present
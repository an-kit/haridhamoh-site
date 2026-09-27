## 1. Preconditions and source review

- [ ] 1.1 Obtain Ankit-approved Zeffy donation URL, WhatsApp community join URL, and the existing four Centers URLs; verify each is recorded as a source-controlled content input before rendering public calls to action.
- [ ] 1.2 Review the live WordPress site and its English content in a read-only source-review task; verify the proposed v1 content inventory excludes Gujarati, sabha schedules, livestreams, and unapproved new editorial content.
- [ ] 1.3 Produce an asset provenance inventory from approved future sources only, including original URL, dimensions, type, intended use, and Canada-branding exclusion; verify every selected image is an original high-resolution source rather than a `_next/image` render.
- [ ] 1.4 Obtain and retain the exact existing external center destinations for Vadodara, New Jersey, Maryland, and Chicago; verify each outbound link opens the approved destination.

## 2. Static application foundation

- [ ] 2.1 Initialize the Next.js App Router project with `output: 'export'` and `trailingSlash: true`; verify a production build generates a static export with no server runtime requirement.
- [ ] 2.2 Configure Tailwind, shadcn/ui, Motion, Cormorant Garamond, DM Sans, and the fixed brand tokens; verify dependency inventory contains none of Aceternity, Magic UI, Anime.js, or map libraries.
- [ ] 2.3 Implement the shared layout, accessible navigation, footer, and route inventory for Home, About, Upasana, Events, Guru Parampara, Centers, Contact, and Donate; verify keyboard navigation and route tests cover each required route.
- [ ] 2.4 Implement the fixed HSAPSS Ohio facts and protected terminology; verify content tests assert the address, phone, darshan hours, `Sokhada`, `Hariprasad Swamiji`, and absence of BAPS conflation.

## 3. Content contracts and event rendering

- [ ] 3.1 Create `/content` JSON/Markdown conventions and version-controlled JSON Schemas for all editable content; verify valid fixtures pass and field omissions/type errors fail schema validation.
- [ ] 3.2 Create the event content schema with title, date, start time, end time, location, image, optional `zeffyUrl`, and description; verify schema tests cover both Zeffy-present and Zeffy-absent events.
- [ ] 3.3 Implement Events list and per-event static pages from validated content; verify every event list item links to a detail page and emitted event JSON-LD matches its source record.
- [ ] 3.4 Implement Zeffy-only donation behavior and optional event Zeffy calls to action; verify no PayPal text, button, script, or outbound URL is shipped.
- [ ] 3.5 Implement the approved WhatsApp community and Centers external actions; verify their target URLs are sourced from approved content and distinguishable from internal links.

## 4. Accessibility, map, and visual-motion safeguards

- [ ] 4.1 Build and enforce a rendered text/background contrast inventory; verify every actual pair meets WCAG AA for its text size and prohibited saffron/orange/gold low-contrast body treatments fail the check.
- [ ] 4.2 Implement typography and responsive visual treatments using the approved token rules; verify Cormorant Garamond is limited to display use and DM Sans to UI/body use as designed.
- [ ] 4.3 Classify Thakorji and guru assets and enforce a no-motion boundary for them; verify component and visual tests show no animation, parallax, transform-on-scroll, or hover motion for classified imagery.
- [ ] 4.4 Implement non-sacred Motion behavior with a `prefers-reduced-motion` fallback; verify reduced-motion tests remove or materially reduce optional animation without hiding content.
- [ ] 4.5 Implement Contact with a static map image and Google Maps directions link; verify no interactive map embed/library is shipped and the directions target resolves to the approved address.
- [ ] 4.6 Implement `PlaceOfWorship` JSON-LD with the approved address and daily darshan hours; verify structured-data tests validate the rendered object.

## 5. Quality gates and staging content workflow

- [ ] 5.1 Add CI schema, route, accessibility, structured-data, build, and changed-path validation; verify intentionally invalid fixtures and an out-of-bound Hermes-attributed change each fail before deployment.
- [ ] 5.2 Implement the Hermes agent-identity enforcement rule for content updates; verify an authenticated Hermes commit limited to `/content/**` and `/public/uploads/**` passes while any other touched path fails closed.
- [ ] 5.3 Implement immutable-SHA staging deployment and production promotion controls; verify staging and production use the same approved commit SHA and a later branch head cannot substitute an artifact.
- [ ] 5.4 Implement the preview report artifact containing the staging URL and screenshot; verify production promotion remains blocked unless Ankit provides the exact `publish` authorization in the approved interaction path.
- [ ] 5.5 Configure and version the mobile test profile; verify Lighthouse Performance, Accessibility, Best Practices, and SEO are each at least 95, LCP is below 2 seconds on the chosen 4G profile, and shipped client JavaScript is below 150 KB.

## 6. Design-only cloud preflight, then infrastructure implementation

- [ ] 6.1 Before any AWS write, obtain explicit authorization for the dedicated-account implementation boundary and verify account identity, budget-alert delivery plan, and rollback evidence requirements are recorded.
- [ ] 6.2 Provision private S3 origins, CloudFront Origin Access Control, ACM certificates in `us-east-1`, and separate staging/production distributions; verify no S3 website hosting endpoint or public-bucket origin is used.
- [ ] 6.3 Configure GitHub Actions OIDC with separately scoped staging and production roles; verify no long-lived AWS access keys exist in repository secrets, workflow configuration, or deployment environment.
- [ ] 6.4 Create and test the AWS Budget alert before first deployment; verify alert delivery evidence is captured and reviewed.
- [ ] 6.5 Map and verify `new.haridhamoh.org` only after Namecheap DNS preflight; verify the staging distribution serves the validated static artifact without changing mail or Google Workspace records.

## 7. Redirect discovery and separate cutover change

- [ ] 7.1 Perform a later read-only crawl that enumerates every current WordPress URL; verify the resulting complete URL inventory is retained as an input to redirect design.
- [ ] 7.2 Produce and review a one-to-one 301 redirect map from the approved WordPress URL inventory; verify each source URL has an explicit destination or an approved documented exception.
- [ ] 7.3 Create a separate OpenSpec production-cutover change with proposal, design, delta specs, and tasks; verify it contains the HARD STOP-AND-REPORT gate and does not inherit authorization from this change.
- [ ] 7.4 In the separate cutover change, export the full current Namecheap DNS record list into its report and confirm Namecheap apex ALIAS/ANAME-style support; verify MX, SPF, DKIM, and Google Workspace TXT records are itemized and protected from modification.
- [ ] 7.5 In the separate cutover change, run all staging acceptance tests with synthetic events and obtain explicit authorization from Ankit; verify any missing precondition stops and reports before a production DNS write.
- [ ] 7.6 After authorized cutover, retain WordPress live and document its rollback routing through June 2027; verify rollback instructions restore only the pre-cutover web routing records from the recorded DNS export.

## 8. Release evidence and human acceptance

- [ ] 8.1 Produce a release evidence bundle with validation output, performance artifacts, structured-data validation, synthetic-event results, preview screenshot, asset provenance, and deployment SHA; verify every item names the exact artifact or command output it relies on.
- [ ] 8.2 Obtain human review of the staging preview for organization identity, English-only scope, content accuracy, visual treatment, and public actions; verify approval is recorded separately from the `publish` production authorization.
- [ ] 8.3 Commit each accepted content or implementation unit as a revertable commit; verify the repository history can identify the exact commit deployed to staging and production.

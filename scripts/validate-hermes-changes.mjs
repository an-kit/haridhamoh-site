import { spawnSync } from "node:child_process";
import { resolve } from "node:path";

function usage(message) {
  if (message) console.error(`INPUT_ERROR: ${message}`);
  console.error(
    "Usage: node scripts/validate-hermes-changes.mjs --repo <path> --candidate <sha> --promoted-ref <ref> --expected-actor <login> --actual-actor <login> --expected-author-email <email>",
  );
  process.exit(1);
}

function parseArgs(args) {
  const values = {};
  for (let index = 0; index < args.length; index += 2) {
    const key = args[index];
    const value = args[index + 1];
    if (!key?.startsWith("--") || value === undefined || values[key] !== undefined) {
      usage("arguments must be unique --key value pairs");
    }
    values[key] = value;
  }

  const required = [
    "--repo",
    "--candidate",
    "--promoted-ref",
    "--expected-actor",
    "--actual-actor",
    "--expected-author-email",
  ];
  for (const key of required) {
    if (!values[key]) usage(`${key} is required`);
  }
  if (Object.keys(values).some((key) => !required.includes(key))) usage("unknown argument");
  return values;
}

function git(repo, args, options = {}) {
  const result = spawnSync("git", ["-C", repo, ...args], {
    encoding: "utf8",
    ...options,
  });
  if (result.status !== 0) {
    throw new Error((result.stderr || result.stdout || "git command failed").trim());
  }
  return result.stdout;
}

function fail(message) {
  console.error(message);
  console.error("RESULT: FAIL");
  process.exit(1);
}

const options = parseArgs(process.argv.slice(2));
const repo = resolve(options["--repo"]);
const candidate = options["--candidate"];
const promotedRef = options["--promoted-ref"];
const expectedActor = options["--expected-actor"];
const actualActor = options["--actual-actor"];
const expectedAuthorEmail = options["--expected-author-email"];

if (expectedActor !== actualActor) {
  fail("IDENTITY_AMBIGUOUS: workflow actor does not match configured Hermes identity");
}

let promotedSha;
let candidateSha;
try {
  promotedSha = git(repo, ["rev-parse", "--verify", `${promotedRef}^{commit}`]).trim();
} catch {
  fail(`PROMOTED_SHA_UNRESOLVED: ${promotedRef}`);
}

try {
  candidateSha = git(repo, ["rev-parse", "--verify", `${candidate}^{commit}`]).trim();
} catch {
  fail(`CANDIDATE_SHA_UNRESOLVED: ${candidate}`);
}

try {
  git(repo, ["merge-base", "--is-ancestor", promotedSha, candidateSha]);
} catch {
  fail("CANDIDATE_NOT_DESCENDED_FROM_PROMOTED_SHA");
}

let authorEmail;
let committerEmail;
try {
  authorEmail = git(repo, ["show", "-s", "--format=%ae", candidateSha]).trim();
  committerEmail = git(repo, ["show", "-s", "--format=%ce", candidateSha]).trim();
} catch {
  fail("IDENTITY_AMBIGUOUS: candidate commit identity cannot be read");
}

if (authorEmail !== expectedAuthorEmail || committerEmail !== expectedAuthorEmail) {
  fail("IDENTITY_AMBIGUOUS: candidate author or committer does not match configured Hermes identity");
}

let paths;
try {
  paths = git(repo, ["diff", "--no-renames", "--name-only", "-z", promotedSha, candidateSha])
    .split("\0")
    .filter(Boolean);
} catch {
  fail("FULL_DIFF_UNAVAILABLE");
}

const disallowed = paths.filter(
  (path) => !path.startsWith("content/") && !path.startsWith("public/uploads/"),
);

console.log(`PROMOTED_REF: ${promotedRef}`);
console.log(`PROMOTED_SHA: ${promotedSha}`);
console.log(`CANDIDATE_SHA: ${candidateSha}`);
console.log(`WORKFLOW_ACTOR: ${actualActor}`);
console.log(`CANDIDATE_AUTHOR_EMAIL: ${authorEmail}`);
for (const path of paths) console.log(`CHANGED_PATH: ${path}`);

if (disallowed.length > 0) {
  for (const path of disallowed) console.error(`PATH_VIOLATION: ${path}`);
  console.error("RESULT: FAIL");
  process.exit(1);
}

console.log("RESULT: PASS");

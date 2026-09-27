import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

const root = new URL("..", import.meta.url).pathname;
const validator = join(root, "scripts", "validate-hermes-changes.mjs");
const identity = {
  actor: "haridhamoh-hermes[bot]",
  authorEmail: "haridhamoh-hermes[bot]@users.noreply.github.com",
};

function git(repo, ...args) {
  return execFileSync("git", ["-C", repo, ...args], { encoding: "utf8" }).trim();
}

function commit(repo, path, contents, subject = `change ${path}`) {
  const file = join(repo, path);
  const directory = file.slice(0, file.lastIndexOf("/"));
  execFileSync("mkdir", ["-p", directory]);
  writeFileSync(file, contents);
  git(repo, "add", path);
  git(
    repo,
    "-c",
    "user.name=Haridham Ohio Hermes",
    "-c",
    `user.email=${identity.authorEmail}`,
    "commit",
    "-m",
    subject,
  );
}

function fixture() {
  const repo = mkdtempSync(join(tmpdir(), "hermes-path-gate-"));
  git(repo, "init", "-q");
  commit(repo, "README.md", "production baseline\n", "baseline");
  git(repo, "tag", "production");
  return repo;
}

function validate(repo, overrides = {}) {
  const options = {
    "--repo": repo,
    "--candidate": "HEAD",
    "--promoted-ref": "refs/tags/production",
    "--expected-actor": identity.actor,
    "--actual-actor": identity.actor,
    "--expected-author-email": identity.authorEmail,
    ...overrides,
  };
  const args = Object.entries(options).flatMap(([name, value]) => [name, value]);
  return execFileSync("node", [validator, ...args], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
}

function validateFailure(repo, overrides = {}) {
  try {
    validate(repo, overrides);
    assert.fail("validator unexpectedly passed");
  } catch (error) {
    assert.equal(error.status, 1);
    return `${error.stdout}${error.stderr}`;
  }
}

test("rejects a full promoted-baseline diff containing an out-of-bound Hermes change", (t) => {
  const repo = fixture();
  t.after(() => rmSync(repo, { recursive: true, force: true }));
  commit(repo, "next.config.ts", "export default {};\n");
  commit(repo, "content/events.json", "[]\n");

  const output = validateFailure(repo);
  assert.match(output, /PATH_VIOLATION: next\.config\.ts/);
  assert.match(output, /RESULT: FAIL/);
});

test("accepts a Hermes candidate whose entire promoted-baseline diff is content-only", (t) => {
  const repo = fixture();
  t.after(() => rmSync(repo, { recursive: true, force: true }));
  commit(repo, "content/events.json", "[]\n");

  const output = validate(repo);
  assert.match(output, /PROMOTED_SHA:/);
  assert.match(output, /CANDIDATE_SHA:/);
  assert.match(output, /CHANGED_PATH: content\/events\.json/);
  assert.match(output, /RESULT: PASS/);
});

test("fails closed when the production pointer cannot be resolved", (t) => {
  const repo = fixture();
  t.after(() => rmSync(repo, { recursive: true, force: true }));
  commit(repo, "content/events.json", "[]\n");

  const output = validateFailure(repo, { "--promoted-ref": "refs/tags/missing-production" });
  assert.match(output, /PROMOTED_SHA_UNRESOLVED/);
  assert.match(output, /RESULT: FAIL/);
});

test("fails closed when the GitHub Actions actor is not the configured Hermes identity", (t) => {
  const repo = fixture();
  t.after(() => rmSync(repo, { recursive: true, force: true }));
  commit(repo, "content/events.json", "[]\n");

  const output = validateFailure(repo, { "--actual-actor": "an-kit" });
  assert.match(output, /IDENTITY_AMBIGUOUS: workflow actor does not match configured Hermes identity/);
  assert.match(output, /RESULT: FAIL/);
});

import { cp, mkdtemp, readFile, rm, symlink, writeFile } from "node:fs/promises";
import { createServer } from "node:http";
import { spawn } from "node:child_process";
import { tmpdir } from "node:os";
import { extname, join, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { expect, test, type Page } from "@playwright/test";

const REPO_ROOT = resolve(fileURLToPath(new URL("..", import.meta.url)));
const TARGET_ROOT = resolve(process.env.LIFECYCLE_E2E_TARGET_ROOT ?? REPO_ROOT);
const BUILD_NOW = "2026-10-24T19:00:00.000Z";
const FLIP_INSTANT = "2026-10-25T04:00:00.000Z";
const BEFORE_FLIP = "2026-10-24T14:00:00.000Z";
const AFTER_FLIP = "2026-10-25T14:00:00.000Z";
const PORT = 4173;
const BASE_URL = `http://127.0.0.1:${PORT}`;
const ANNAKUT = "Annakut 2026 – Haridham Ohio (HSAPSS)";
const SYNTHETIC = "Synthetic future lifecycle fixture";

let workspace = "";
let server: ReturnType<typeof createServer> | undefined;

function log(step: string) {
  console.log(`LIFECYCLE-E2E ${step}`);
}

async function run(command: string, args: string[], cwd: string, env: NodeJS.ProcessEnv) {
  await new Promise<void>((resolveRun, rejectRun) => {
    const child = spawn(command, args, { cwd, env, stdio: "inherit" });
    child.once("error", rejectRun);
    child.once("exit", (code) => {
      if (code === 0) resolveRun();
      else rejectRun(new Error(`${command} ${args.join(" ")} exited ${code}`));
    });
  });
}

async function addSyntheticFutureFixture(root: string) {
  const path = join(root, "content/events.json");
  const events = JSON.parse(await readFile(path, "utf8")) as unknown[];
  events.push({
    title: SYNTHETIC,
    date: "2026-11-01",
    startTime: "10:30",
    endTime: "12:00",
    location: "Test fixture only",
    image: "/uploads/events/annakut-2026.jpg",
    description: "Synthetic fixture used only by the browser lifecycle regression test.",
  });
  await writeFile(path, `${JSON.stringify(events, null, 2)}\n`);
}

function shouldCopy(source: string) {
  const relative = normalize(source).slice(normalize(TARGET_ROOT).length + 1);
  return !relative.split(/[\\/]/).some((part) => [".git", "node_modules", ".next", "out"].includes(part));
}

async function buildFixture(withSynthetic = false): Promise<string> {
  const fixture = await mkdtemp(join(tmpdir(), "haridham-lifecycle-e2e-"));
  await cp(TARGET_ROOT, fixture, { recursive: true, filter: shouldCopy });
  await symlink(join(REPO_ROOT, "node_modules"), join(fixture, "node_modules"));
  if (withSynthetic) await addSyntheticFutureFixture(fixture);

  const fakeDate = join(REPO_ROOT, "tests/fake-build-date.cjs");
  const nodeOptions = `${process.env.NODE_OPTIONS ?? ""} --require ${fakeDate}`.trim();
  log(`build date ${BUILD_NOW}; target ${TARGET_ROOT}; synthetic=${withSynthetic}`);
  await run("npm", ["run", "build"], fixture, {
    ...process.env,
    EVENT_LIFECYCLE_BUILD_NOW: BUILD_NOW,
    NODE_OPTIONS: nodeOptions,
  });
  await writeFile(join(fixture, "out/lifecycle-build-receipt.json"), JSON.stringify({ buildNow: BUILD_NOW }));
  return fixture;
}

function contentType(path: string) {
  return {
    ".css": "text/css",
    ".html": "text/html",
    ".ico": "image/x-icon",
    ".jpeg": "image/jpeg",
    ".jpg": "image/jpeg",
    ".js": "application/javascript",
    ".json": "application/json",
    ".png": "image/png",
    ".svg": "image/svg+xml",
    ".woff2": "font/woff2",
  }[extname(path)] ?? "application/octet-stream";
}

async function serveStatic(root: string, port = PORT): Promise<ReturnType<typeof createServer>> {
  const staticServer = createServer(async (request, response) => {
    const url = new URL(request.url ?? "/", `http://127.0.0.1:${port}`);
    const requested = decodeURIComponent(url.pathname);
    const wantsRsc = url.searchParams.has("_rsc") || request.headers.rsc === "1";
    const indexFile = wantsRsc ? "index.txt" : "index.html";
    const relative = requested.endsWith("/")
      ? `${requested}${indexFile}`
      : extname(requested)
        ? requested
        : `${requested}/${indexFile}`;
    const file = resolve(root, `.${relative}`);
    if (!file.startsWith(`${root}/`) && file !== root) {
      response.writeHead(403).end();
      return;
    }
    try {
      const body = await readFile(file);
      response.writeHead(200, { "content-type": wantsRsc ? "text/x-component" : contentType(file) }).end(body);
    } catch {
      response.writeHead(404).end();
    }
  });
  await new Promise<void>((resolveListen) => staticServer.listen(port, "127.0.0.1", resolveListen));
  return staticServer;
}

async function setClock(page: Page, value: string) {
  await page.addInitScript((now: string) => {
    const loadKey = "lifecycle-e2e-document-loads";
    sessionStorage.setItem(loadKey, String(Number(sessionStorage.getItem(loadKey) ?? "0") + 1));
    const NativeDate = Date;
    const timestamp = new NativeDate(now).getTime();
    const FixedDate = function (this: unknown, ...args: unknown[]) {
      return Reflect.construct(NativeDate, args.length === 0 ? [timestamp] : args);
    } as unknown as DateConstructor;
    FixedDate.now = () => timestamp;
    FixedDate.parse = NativeDate.parse;
    FixedDate.UTC = NativeDate.UTC;
    (FixedDate as unknown as { prototype: Date }).prototype = NativeDate.prototype;
    globalThis.Date = FixedDate;
  }, value);
}

function eventCard(page: Page, list: "upcoming" | "past", title: string) {
  return page.locator(`[data-event-list="${list}"]`, { hasText: title });
}

async function assertDetailPast(page: any) {
  await expect(page.locator("[data-detail-past]")).toBeVisible();
  await expect(page.locator("[data-detail-past]")).toContainText("This event took place on Saturday, October 24, 2026");
  await expect(page.locator("[data-detail-past]")).toContainText("about 250 devotees");
  await expect(page.locator("[data-detail-past] [data-gallery-open]")).toHaveCount(5);
  await expect(page.locator("[data-detail-upcoming]")).toBeHidden();
}

async function assertDetailUpcoming(page: any) {
  await expect(page.locator("[data-detail-upcoming]")).toBeVisible();
  await expect(page.locator("[data-detail-upcoming]")).toContainText("Sabha starts at");
  await expect(page.getByRole("link", { name: "Add to Calendar" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Event Seva" })).toBeVisible();
  await expect(page.locator("[data-detail-past]")).toBeHidden();
}

test.beforeAll(async () => {
  workspace = await buildFixture();
  server = await serveStatic(join(workspace, "out"));
});

test.afterAll(async () => {
  if (server) {
    await new Promise<void>((resolveClose) => server?.close(() => resolveClose()));
  }
  if (workspace) await rm(workspace, { recursive: true, force: true });
});

test("build guard rejects a build at or after the Oct 25 lifecycle flip", async () => {
  const receipt = JSON.parse(await readFile(join(workspace, "out/lifecycle-build-receipt.json"), "utf8")) as { buildNow: string };
  log(`guard build=${receipt.buildNow}`);
  expect(new Date(receipt.buildNow).getTime()).toBeLessThan(new Date(FLIP_INSTANT).getTime());
});

test("Oct 24 browser clock keeps direct loads and soft navigation upcoming", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await setClock(page, BEFORE_FLIP);

  await test.step("direct /events/ keeps Annakut upcoming", async () => {
    log("Oct24 direct /events/ => Upcoming");
    await page.goto(`${BASE_URL}/events/`);
    await expect(eventCard(page, "upcoming", ANNAKUT)).toBeVisible();
    await expect(eventCard(page, "past", ANNAKUT)).toBeHidden();
  });

  await test.step("direct / keeps Upcoming events visible", async () => {
    log("Oct24 direct / => Upcoming events");
    await page.goto(`${BASE_URL}/`);
    await expect(page.getByRole("heading", { name: "Upcoming events" })).toBeVisible();
    await expect(eventCard(page, "upcoming", ANNAKUT)).toBeVisible();
    await expect(page.locator("[data-home-highlights]")).toBeHidden();
  });

  await test.step("direct detail keeps invitation content visible", async () => {
    log("Oct24 direct detail => invitation");
    await page.goto(`${BASE_URL}/events/annakut-2026-haridham-ohio-hsapss/`);
    await assertDetailUpcoming(page);
  });

  await context.close();
});

test("synthetic future fixture is not rendered as Past in the no-JS build fallback", async ({ browser }) => {
  const syntheticWorkspace = await buildFixture(true);
  const syntheticServer = await serveStatic(join(syntheticWorkspace, "out"), PORT + 1);
  try {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    log("synthetic future fixture no-JS build fallback => Upcoming, not Past");
    await page.goto(`http://127.0.0.1:${PORT + 1}/events/`);
    await expect(eventCard(page, "upcoming", SYNTHETIC)).toBeVisible();
    await expect(eventCard(page, "past", SYNTHETIC)).toBeHidden();
    await context.close();
  } finally {
    await new Promise<void>((resolveClose) => syntheticServer.close(() => resolveClose()));
    await rm(syntheticWorkspace, { recursive: true, force: true });
  }
});

test("Oct 25 browser clock applies Past state after direct loads, soft navigation, and back", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await setClock(page, AFTER_FLIP);

  await test.step("direct /events/ lists Annakut under Past", async () => {
    log("Oct25 direct /events/ => Past events list");
    await page.goto(`${BASE_URL}/events/`);
    await expect(page.getByRole("heading", { name: "Past events" })).toBeVisible();
    await expect(eventCard(page, "past", ANNAKUT)).toBeVisible();
    await expect(eventCard(page, "upcoming", ANNAKUT)).toBeHidden();
  });

  await test.step("direct / exposes Recent highlights", async () => {
    log("Oct25 direct / => Recent highlights");
    await page.goto(`${BASE_URL}/`);
    await expect(page.getByRole("heading", { name: "Recent highlights" })).toBeVisible();
    await expect(eventCard(page, "past", ANNAKUT)).toBeVisible();
  });

  await test.step("direct detail exposes banner, recap, five photos, and no invitation actions", async () => {
    log("Oct25 direct detail => banner recap 5 photos no actions");
    await page.goto(`${BASE_URL}/events/annakut-2026-haridham-ohio-hsapss/`);
    await assertDetailPast(page);
  });

  await test.step("Home -> header Events -> Annakut card applies Past after client navigation", async () => {
    log("Oct25 soft nav Home -> header Events -> Annakut detail => Past");
    await page.goto(`${BASE_URL}/`);
    const documentLoadsBeforeEvents = await page.evaluate(() => sessionStorage.getItem("lifecycle-e2e-document-loads"));
    await page.getByRole("link", { name: "Events", exact: true }).click({ force: true });
    await expect(page).toHaveURL(/\/events\/?$/);
    await expect.poll(() => page.evaluate(() => sessionStorage.getItem("lifecycle-e2e-document-loads"))).toBe(documentLoadsBeforeEvents);
    await expect(eventCard(page, "past", ANNAKUT)).toBeVisible();
    const documentLoadsBeforeDetail = await page.evaluate(() => sessionStorage.getItem("lifecycle-e2e-document-loads"));
    await eventCard(page, "past", ANNAKUT).click({ force: true });
    await expect(page).toHaveURL(/annakut-2026-haridham-ohio-hsapss\/?$/);
    await expect.poll(() => page.evaluate(() => sessionStorage.getItem("lifecycle-e2e-document-loads"))).toBe(documentLoadsBeforeDetail);
    await assertDetailPast(page);
  });

  await test.step("browser back retains the Past events list", async () => {
    log("Oct25 browser back => Past events list");
    await page.goBack();
    await expect(page).toHaveURL(/\/events\/?$/);
    await expect(page.getByRole("heading", { name: "Past events" })).toBeVisible();
    await expect(eventCard(page, "past", ANNAKUT)).toBeVisible();
  });

  await context.close();
});

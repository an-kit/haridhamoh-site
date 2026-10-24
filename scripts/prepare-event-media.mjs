#!/usr/bin/env node
import { mkdir, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

import sharp from "sharp";

function parseArgs(argv) {
  const args = {};
  for (let index = 0; index < argv.length; index += 2) {
    const key = argv[index];
    const value = argv[index + 1];
    if (!key?.startsWith("--") || value === undefined) {
      throw new Error("Arguments must be --key value pairs");
    }
    args[key.slice(2)] = value;
  }
  return args;
}

function usage() {
  console.error(
    "Usage: node scripts/prepare-event-media.mjs --input <photo-dir> --slug <event-slug> --alts <alts.json> [--out <dir>]",
  );
  process.exit(1);
}

const IMAGE_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".tif",
  ".tiff",
  ".heic",
  ".heif",
]);

const args = parseArgs(process.argv.slice(2));
if (!args.input || !args.slug || !args.alts) usage();

const inputDir = path.resolve(args.input);
const outputDir = path.resolve(
  args.out ?? path.join("public", "uploads", "events", args.slug),
);
const altsPath = path.resolve(args.alts);

const alts = JSON.parse(await readFile(altsPath, "utf8"));
const files = (await readdir(inputDir))
  .filter((name) => IMAGE_EXTENSIONS.has(path.extname(name).toLowerCase()))
  .sort((left, right) => left.localeCompare(right, "en"));

if (files.length === 0) {
  console.error(`No supported images found in ${inputDir}`);
  process.exit(1);
}

const missing = files.filter((name) => !alts[name]?.alt);
if (missing.length > 0) {
  console.error(`Missing alt text in ${altsPath} for: ${missing.join(", ")}`);
  process.exit(1);
}

await mkdir(outputDir, { recursive: true });

const media = [];
for (const [index, name] of files.entries()) {
  const number = String(index + 1).padStart(2, "0");
  const source = path.join(inputDir, name);
  const fullName = `${number}.jpg`;
  const thumbName = `${number}-thumb.jpg`;
  const fullPath = path.join(outputDir, fullName);
  const thumbPath = path.join(outputDir, thumbName);

  try {
    await sharp(source)
      .rotate()
      .resize({ width: 1600, withoutEnlargement: true })
      .jpeg({ quality: 80, mozjpeg: true })
      .toFile(fullPath);

    await sharp(source)
      .rotate()
      .resize({ width: 600, withoutEnlargement: true })
      .jpeg({ quality: 80, mozjpeg: true })
      .toFile(thumbPath);
  } catch (error) {
    console.error(
      `Failed to process ${name}. If this is HEIC, convert it first with: sips -s format jpeg "${name}" --out "${name}.jpg"`,
    );
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  }

  for (const output of [fullPath, thumbPath]) {
    const metadata = await sharp(output).metadata();
    if (metadata.exif) {
      console.error(`EXIF metadata survived in ${path.basename(output)}`);
      process.exit(1);
    }
  }

  const item = {
    type: "photo",
    src: `/uploads/events/${args.slug}/${fullName}`,
    thumb: `/uploads/events/${args.slug}/${thumbName}`,
    alt: alts[name].alt,
    ...(alts[name].caption ? { caption: alts[name].caption } : {}),
  };
  media.push(item);
}

const sizes = await Promise.all(
  media.map(async (item) => {
    const stats = await sharp(path.join(outputDir, path.basename(item.src))).metadata();
    return `${path.basename(item.src)}: ${stats.width}x${stats.height}`;
  }),
);

console.log(JSON.stringify(media, null, 2));
console.error(`Wrote ${media.length * 2} files to ${outputDir}`);
for (const line of sizes) console.error(line);

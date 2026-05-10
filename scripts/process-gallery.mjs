#!/usr/bin/env node
// Read every photo in _originals/gallery/, watermark with "© Raagalaya Academy"
// in the bottom-right, write the watermarked version + a thumbnail to
// public/images/gallery/. Idempotent — safe to run on every build.

import { readdir, mkdir, stat, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { extname, basename, join } from "node:path";
import sharp from "sharp";

const SRC_DIR = "_originals/gallery";
const OUT_DIR = "public/images/gallery";
const WATERMARK_TEXT = "© Raagalaya Academy";
const FONT_FRAC_FULL = 0.030;   // watermark height as fraction of image short edge
const MARGIN_FRAC = 0.020;
const TEXT_OPACITY = 0.70;
const SHADOW_OPACITY = 0.65;
const THUMB_WIDTH = 640;
const FULL_QUALITY = 86;
const THUMB_QUALITY = 78;
const ACCEPTED_EXT = new Set([".jpg", ".jpeg", ".png", ".webp"]);

const svgWatermark = (w, h) => {
  const short = Math.min(w, h);
  const fontSize = Math.max(12, Math.round(short * FONT_FRAC_FULL));
  const margin = Math.round(short * MARGIN_FRAC);
  // Drop shadow via SVG <filter> for readability over light *and* dark photos.
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
  <defs>
    <filter id="ds" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="${Math.max(1, fontSize / 20)}"/>
      <feOffset dx="2" dy="2" result="off"/>
      <feComponentTransfer><feFuncA type="linear" slope="${SHADOW_OPACITY}"/></feComponentTransfer>
      <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>
  <text x="${w - margin}" y="${h - margin}"
        text-anchor="end"
        font-family="serif"
        font-weight="bold"
        font-size="${fontSize}"
        fill="white"
        fill-opacity="${TEXT_OPACITY}"
        filter="url(#ds)">${WATERMARK_TEXT}</text>
</svg>`);
};

const needsRebuild = async (srcPath, outPath) => {
  if (!existsSync(outPath)) return true;
  const [s, o] = await Promise.all([stat(srcPath), stat(outPath)]);
  return s.mtimeMs > o.mtimeMs;
};

const processOne = async (srcPath, outPath, thumbPath) => {
  const img = sharp(srcPath);
  const meta = await img.metadata();
  const watermark = svgWatermark(meta.width, meta.height);
  const watermarked = await sharp(srcPath)
    .composite([{ input: watermark }])
    .jpeg({ quality: FULL_QUALITY, progressive: true, mozjpeg: true })
    .toBuffer();
  await writeFile(outPath, watermarked);
  const thumb = await sharp(watermarked)
    .resize({ width: THUMB_WIDTH, withoutEnlargement: true })
    .jpeg({ quality: THUMB_QUALITY, progressive: true, mozjpeg: true })
    .toBuffer();
  await writeFile(thumbPath, thumb);
};

const main = async () => {
  if (!existsSync(SRC_DIR)) {
    console.log(`[gallery] no ${SRC_DIR}/ found — skipping`);
    return;
  }
  await mkdir(OUT_DIR, { recursive: true });
  const entries = (await readdir(SRC_DIR))
    .filter((f) => ACCEPTED_EXT.has(extname(f).toLowerCase()))
    .filter((f) => !basename(f, extname(f)).endsWith("-thumb"))
    .sort();

  let built = 0;
  let skipped = 0;
  for (const file of entries) {
    const stem = basename(file, extname(file));
    const srcPath = join(SRC_DIR, file);
    const outPath = join(OUT_DIR, `${stem}.jpg`);
    const thumbPath = join(OUT_DIR, `${stem}-thumb.jpg`);
    if (await needsRebuild(srcPath, outPath)) {
      await processOne(srcPath, outPath, thumbPath);
      built++;
    } else {
      skipped++;
    }
  }
  console.log(`[gallery] processed ${built} image(s), ${skipped} up-to-date.`);
};

main().catch((err) => {
  console.error("[gallery] failed:", err);
  process.exit(1);
});

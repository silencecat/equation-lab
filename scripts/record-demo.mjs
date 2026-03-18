#!/usr/bin/env node

import { spawn, spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, renameSync, rmSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const ASSET_DIR = path.resolve(ROOT, 'docs/assets');
const TMP_VIDEO_DIR = path.resolve(ROOT, 'test-results/demo-video');
const PORT = 8766;

mkdirSync(ASSET_DIR, { recursive: true });
mkdirSync(TMP_VIDEO_DIR, { recursive: true });

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function startServer() {
  return new Promise((resolve, reject) => {
    const child = spawn('node', ['tests/e2e/static-server.mjs'], {
      cwd: ROOT,
      stdio: ['ignore', 'pipe', 'pipe'],
    });

    const onData = (buf) => {
      const text = String(buf);
      if (text.includes('Equation Lab static server on')) resolve(child);
    };

    child.stdout.on('data', onData);
    child.stderr.on('data', (buf) => {
      const text = String(buf);
      if (/EADDRINUSE/i.test(text)) reject(new Error(`Port ${PORT} is already in use`));
    });
    child.on('error', reject);
    child.on('exit', (code) => {
      if (code !== null && code !== 0) reject(new Error(`Static server exited with code ${code}`));
    });
  });
}

async function dragToPoint(page, locator, point) {
  const box = await locator.boundingBox();
  if (!box) throw new Error('Missing source element box');
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.mouse.move(point.x, point.y, { steps: 24 });
  await page.mouse.up();
}

async function dragToSide(page, locator, sideSelector) {
  const target = await page.locator(sideSelector).boundingBox();
  if (!target) throw new Error(`Missing target side: ${sideSelector}`);
  await dragToPoint(page, locator, {
    x: target.x + target.width * 0.68,
    y: target.y + target.height * 0.5,
  });
}

async function dragTrayCard(page, index, sideSelector) {
  const locator = page.locator('#buildTray .tray-chip').nth(index);
  const target = await page.locator(sideSelector).boundingBox();
  if (!target) throw new Error(`Missing tray target: ${sideSelector}`);
  await dragToPoint(page, locator, {
    x: target.x + target.width * 0.55,
    y: target.y + target.height * 0.46,
  });
}

async function dragToolToEquals(page, op) {
  const eqBox = await page.locator('#eqToolDrop').boundingBox();
  if (!eqBox) throw new Error('Missing equals drop area');
  await dragToPoint(page, page.locator(`.tool-op[data-op="${op}"]`), {
    x: eqBox.x + eqBox.width / 2,
    y: eqBox.y + eqBox.height / 2,
  });
}

async function loadLevel(page, index, expectedTitle) {
  if (index !== 0) {
    await page.locator('.menu-btn').click();
    await page.waitForTimeout(250);
    await page.evaluate((i) => {
      const buttons = document.querySelectorAll('#levels .level');
      const btn = buttons[i];
      if (!btn) throw new Error(`Missing level button ${i}`);
      btn.click();
    }, index);
  }
  await page.waitForFunction(
    (title) => document.querySelector('#title')?.textContent?.includes(title),
    expectedTitle,
  );
  await page.waitForTimeout(600);
}

function runFfmpeg(args) {
  const result = spawnSync('ffmpeg', args, { cwd: ROOT, stdio: 'inherit' });
  if (result.status !== 0) throw new Error(`ffmpeg failed: ${args.join(' ')}`);
}

async function recordDemo() {
  const server = await startServer();
  let browser;

  try {
    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
      viewport: { width: 1366, height: 900 },
      recordVideo: {
        dir: TMP_VIDEO_DIR,
        size: { width: 1366, height: 900 },
      },
    });

    const page = await context.newPage();
    await page.addInitScript(() => {
      localStorage.setItem('eqlab_state_v1', JSON.stringify({
        version: 1,
        profile: { locale: 'zh' },
        progress: { clearedLevelIds: [], currentLevelId: '' },
        learning: { seenOnboarding: true, lastPlayedAt: null },
        drafts: {},
        meta: { schemaVersion: 1 },
      }));
      localStorage.setItem('eqlab_lang', 'zh');
      localStorage.setItem('eqlab_cleared', '[]');
      localStorage.setItem('eqlab_onboard_done', '1');
    });

    await page.goto(`http://127.0.0.1:${PORT}/equation_lab.html`, { waitUntil: 'load' });
    await page.waitForTimeout(1000);

    // 1. Cross-equals drag
    await loadLevel(page, 0, '1-1');
    await dragToSide(page, page.locator('#left .chip.n').first(), '#right');
    await page.waitForTimeout(1600);

    // 2. Build mode tray drag
    await loadLevel(page, 3, '1-4');
    await dragTrayCard(page, 0, '#left');
    await page.waitForTimeout(500);
    await dragTrayCard(page, 1, '#left');
    await page.waitForTimeout(500);
    await dragTrayCard(page, 2, '#right');
    await page.waitForTimeout(1600);

    // 3. Tool drag to equals
    await loadLevel(page, 16, '4-1');
    await page.locator('#toolValue').fill('2');
    await page.waitForTimeout(300);
    await dragToolToEquals(page, 'mul');
    await page.waitForTimeout(1600);

    // 4. Expand grouped expression
    await loadLevel(page, 31, '6-1');
    await page.locator('.gexpand').first().click();
    await page.waitForTimeout(1800);

    // settle
    await page.waitForTimeout(1000);

    const video = page.video();
    await context.close();

    const rawVideoPath = await video.path();
    const webmPath = path.resolve(ASSET_DIR, 'equation_lab_demo.webm');
    const mp4Path = path.resolve(ASSET_DIR, 'equation_lab_demo.mp4');
    const gifPath = path.resolve(ASSET_DIR, 'equation_lab_demo.gif');
    const palettePath = path.resolve(TMP_VIDEO_DIR, 'equation_lab_demo_palette.png');

    if (existsSync(webmPath)) rmSync(webmPath, { force: true });
    if (existsSync(mp4Path)) rmSync(mp4Path, { force: true });
    if (existsSync(gifPath)) rmSync(gifPath, { force: true });
    if (existsSync(palettePath)) rmSync(palettePath, { force: true });

    renameSync(rawVideoPath, webmPath);

    runFfmpeg([
      '-y',
      '-i', webmPath,
      '-movflags', '+faststart',
      '-pix_fmt', 'yuv420p',
      mp4Path,
    ]);

    runFfmpeg([
      '-y',
      '-i', webmPath,
      '-vf', 'fps=10,scale=720:-1:flags=lanczos,palettegen',
      '-frames:v', '1',
      '-update', '1',
      palettePath,
    ]);

    runFfmpeg([
      '-y',
      '-i', webmPath,
      '-i', palettePath,
      '-lavfi', 'fps=10,scale=720:-1:flags=lanczos[x];[x][1:v]paletteuse',
      gifPath,
    ]);

    rmSync(palettePath, { force: true });

    console.log('Demo assets created:');
    console.log(`- ${webmPath}`);
    console.log(`- ${mp4Path}`);
    console.log(`- ${gifPath}`);
  } finally {
    if (browser) await browser.close().catch(() => {});
    server.kill();
  }
}

recordDemo().catch((err) => {
  console.error(err);
  process.exit(1);
});

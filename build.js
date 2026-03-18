#!/usr/bin/env node
/**
 * build.js — 把 equation_lab.html + 7 个 ES module 打包成一个
 * 完全自包含的 HTML 文件，可以直接双击打开（file:// 也能用）。
 *
 * 用法：node build.js
 * 输出：
 *   - dist/equation_lab.html
 *   - dist/equation_lab_standalone.html
 *   - dist/index.html
 */

import { buildSync } from 'esbuild';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC = resolve(__dirname, 'src');
const DIST = resolve(__dirname, 'dist');

/* ── 1. 用 esbuild 把 ui.js（入口）打成一个 IIFE bundle ── */
const result = buildSync({
  entryPoints: [resolve(SRC, 'js/ui.js')],
  bundle: true,
  format: 'iife',
  globalName: 'EqLab',       // window.EqLab.init
  write: false,
  minify: false,              // 保持可读；改 true 可压缩
  charset: 'utf8',
  target: ['es2020'],
});

const bundledJS = new TextDecoder().decode(result.outputFiles[0].contents);

/* ── 2. 读取 HTML 模板 ── */
let html = readFileSync(resolve(SRC, 'equation_lab.html'), 'utf-8');

/* ── 3. 替换 <script type="module">…</script> 为内联 bundle ── */
//  同时去掉后面的 file:// 检测脚本（因为不再需要）
const scriptRegex =
  /\s*<script type="module">[\s\S]*?<\/script>\s*<script>\s*\/\/ 检测[\s\S]*?<\/script>/;

const inlineScript = `
  <script>
// ── 打包后的完整脚本（可直接 file:// 打开） ──
${bundledJS}
EqLab.init();
  </script>`;

if (!scriptRegex.test(html)) {
  console.error('❌ 找不到需要替换的 <script> 块，请检查 equation_lab.html');
  process.exit(1);
}

html = html.replace(scriptRegex, inlineScript);

/* ── 4. 写入 dist/ ── */
mkdirSync(DIST, { recursive: true });
writeFileSync(resolve(DIST, 'equation_lab.html'), html, 'utf-8');
writeFileSync(resolve(DIST, 'equation_lab_standalone.html'), html, 'utf-8');
writeFileSync(resolve(DIST, 'index.html'), html, 'utf-8');

const sizeKB = (Buffer.byteLength(html, 'utf-8') / 1024).toFixed(1);
console.log(`✅ 构建完成 → dist/equation_lab.html + dist/equation_lab_standalone.html + dist/index.html (${sizeKB} KB)`);
console.log('   equation_lab_standalone.html: 本地双击打开 / 发给家长直接用');
console.log('   equation_lab.html: 与 standalone 内容相同，保留兼容旧路径');
console.log('   index.html: GitHub Pages 部署用');

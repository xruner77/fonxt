import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distHtmlPath = path.resolve(__dirname, '../dist/index.html');
const serverEntryPath = path.resolve(__dirname, '../dist-ssr/entry-server.js');
const distSsrDir = path.resolve(__dirname, '../dist-ssr');

async function runPrerender() {
  console.log('🚀 Starting SSG Static Pre-render process...');

  if (!fs.existsSync(distHtmlPath)) {
    throw new Error(`Client build HTML not found at: ${distHtmlPath}. Please run 'vite build' first.`);
  }

  if (!fs.existsSync(serverEntryPath)) {
    throw new Error(`SSR bundle not found at: ${serverEntryPath}. Please build SSR bundle first.`);
  }

  const template = fs.readFileSync(distHtmlPath, 'utf-8');
  const { render } = await import(pathToFileURL(serverEntryPath).href);
  const appHtml = render();

  if (!appHtml || appHtml.length === 0) {
    throw new Error('Render output is empty!');
  }

  let finalHtml = template.replace(
    '<div id="root"></div>',
    `<div id="root">${appHtml}</div>`
  );

  // 1. Remove crossorigin from stylesheet link so Chrome does not block CSS under file:/// protocol
  finalHtml = finalHtml.replace(/<link rel="stylesheet" crossorigin href="([^"]+)">/g, '<link rel="stylesheet" href="$1">');

  // 2. Convert root-relative asset paths to relative paths so they resolve correctly both on web servers and via file:///
  finalHtml = finalHtml.replace(/src="\/logo/g, 'src="./logo');
  finalHtml = finalHtml.replace(/href="\/logo/g, 'href="./logo');
  finalHtml = finalHtml.replace(/src="\/assets\//g, 'src="./assets/');
  finalHtml = finalHtml.replace(/href="\/assets\//g, 'href="./assets/');

  fs.writeFileSync(distHtmlPath, finalHtml, 'utf-8');
  console.log(`✅ [SSG Success] Static HTML successfully injected into dist/index.html`);
  console.log(`📦 Pre-rendered DOM Content Size: ${(appHtml.length / 1024).toFixed(2)} KB`);
  console.log(`📄 Total dist/index.html Size: ${(finalHtml.length / 1024).toFixed(2)} KB`);

  // Clean up temporary SSR folder
  if (fs.existsSync(distSsrDir)) {
    fs.rmSync(distSsrDir, { recursive: true, force: true });
    console.log('🧹 Cleaned up temporary dist-ssr directory.');
  }
}

runPrerender().catch((err) => {
  console.error('❌ Prerender failed:', err);
  process.exit(1);
});

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '../dist');
const files = [];

function getHtmlFiles(dir) {
  for (const item of fs.readdirSync(dir)) {
    const full = path.join(dir, item);
    if (fs.statSync(full).isDirectory()) {
      getHtmlFiles(full);
    } else if (item.endsWith('.html')) {
      files.push(full);
    }
  }
}
getHtmlFiles(distDir);

console.log(`Auditing ${files.length} HTML files in dist...`);

const report = [];

for (const file of files) {
  const rel = path.relative(distDir, file);
  const html = fs.readFileSync(file, 'utf-8');

  // Title
  const titleMatch = html.match(/<title>(.*?)<\/title>/s);
  const title = titleMatch ? titleMatch[1].trim() : null;

  // Description
  const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i);
  const desc = descMatch ? descMatch[1].trim() : null;

  // Keywords
  const kwMatch = html.match(/<meta\s+name=["']keywords["']\s+content=["'](.*?)["']/i);
  const keywords = kwMatch ? kwMatch[1].trim() : null;

  // Canonical
  const canonMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["'](.*?)["']/i);
  const canonical = canonMatch ? canonMatch[1].trim() : null;

  // OG Image
  const ogImgMatch = html.match(/<meta\s+property=["']og:image["']\s+content=["'](.*?)["']/i);
  const ogImage = ogImgMatch ? ogImgMatch[1].trim() : null;

  // H1
  const h1Matches = html.match(/<h1[\s>](.*?)<\/h1>/gis) || [];

  // Alt check
  const allImgs = html.match(/<img\s+[^>]*>/gi) || [];
  const imgsWithoutAlt = allImgs.filter(img => !/alt=["'][^"']*["']/i.test(img));

  // JSON-LD check
  const jsonLdMatches = html.match(/<script type=["']application\/ld\+json["']>(.*?)<\/script>/gis) || [];

  report.push({
    file: rel,
    title: title ? `${title.slice(0, 45)}... (${title.length} chars)` : 'MISSING',
    hasDesc: !!desc,
    descLen: desc ? desc.length : 0,
    hasKeywords: !!keywords,
    canonical: canonical || 'MISSING',
    ogImage: ogImage || 'MISSING',
    h1Count: h1Matches.length,
    h1Text: h1Matches[0] ? h1Matches[0].replace(/<[^>]+>/g, '').trim().slice(0, 40) : 'NONE',
    missingAltCount: imgsWithoutAlt.length,
    jsonLdCount: jsonLdMatches.length,
  });
}

console.table(report);

// Check sitemap.xml
const sitemapPath = path.resolve(distDir, 'sitemap.xml');
if (fs.existsSync(sitemapPath)) {
  const sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');
  const urlCount = (sitemapContent.match(/<loc>/g) || []).length;
  console.log(`\n🗺️ sitemap.xml exists with ${urlCount} URLs.`);
} else {
  console.error('\n❌ sitemap.xml missing!');
}

// Check robots.txt
const robotsPath = path.resolve(distDir, 'robots.txt');
if (fs.existsSync(robotsPath)) {
  console.log('🤖 robots.txt exists.');
} else {
  console.error('❌ robots.txt missing in dist!');
}

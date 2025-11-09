/**
 * Sitemap Generator for Taawidaty
 * Generates sitemap.xml with all medication URLs for SEO
 * Also creates bing-urls.txt for Bing Webmaster Tools
 * Run with: node generate-sitemap.mjs
 */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const BASE_URL = 'https://taawidaty.ma'; // Production domain

function generateMedicationSlug(name) {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function generateSitemap() {
  const medications = [];
  
  try {
    // Load CNOPS medications
    const cnopsData = JSON.parse(readFileSync(join(__dirname, 'src/data/medications-cnops.json'), 'utf-8'));
    medications.push(...cnopsData);
  } catch (error) {
    console.warn('Could not load CNOPS medications:', error.message);
  }

  try {
    // Load CNSS medications (avoiding duplicates)
    const cnssData = JSON.parse(readFileSync(join(__dirname, 'src/data/medications-cnss.json'), 'utf-8'));
    const existingNames = new Set(medications.map(m => m.name));
    cnssData.forEach(med => {
      if (!existingNames.has(med.name)) {
        medications.push(med);
        existingNames.add(med.name);
      }
    });
  } catch (error) {
    console.warn('Could not load CNSS medications:', error.message);
  }

  const now = new Date().toISOString();

  // Generate XML sitemap
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  
  <!-- Main Pages -->
  <url>
    <loc>${BASE_URL}/</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="fr" href="${BASE_URL}/" />
    <xhtml:link rel="alternate" hreflang="ar" href="${BASE_URL}/" />
  </url>
  
  <url>
    <loc>${BASE_URL}/prix-medicaments</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
    <xhtml:link rel="alternate" hreflang="fr" href="${BASE_URL}/prix-medicaments" />
    <xhtml:link rel="alternate" hreflang="ar" href="${BASE_URL}/prix-medicaments" />
  </url>
  
  <url>
    <loc>${BASE_URL}/faq-cnops</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <url>
    <loc>${BASE_URL}/faq-cnss</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <!-- Medication Pages (Top ${Math.min(medications.length, 5000)}) -->
`;

  // Add medication URLs (limit to 5000 for sitemap best practices)
  const topMedications = medications
    .sort((a, b) => b.ppv - a.ppv) // Sort by price (assuming higher price = more searched)
    .slice(0, 5000);

  topMedications.forEach(medication => {
    const slug = generateMedicationSlug(medication.name);
    const priority = medication.ppv > 100 ? '0.8' : '0.6'; // Higher priority for expensive meds
    
    sitemap += `  <url>
    <loc>${BASE_URL}/prix/${slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
    <xhtml:link rel="alternate" hreflang="fr" href="${BASE_URL}/prix/${slug}" />
    <xhtml:link rel="alternate" hreflang="ar" href="${BASE_URL}/prix/${slug}" />
  </url>
`;
  });

  sitemap += `</urlset>`;

  // Write sitemap
  const sitemapPath = join(__dirname, 'public/sitemap.xml');
  writeFileSync(sitemapPath, sitemap);

  // Generate Bing URL list (plain text file)
  let bingUrls = `# Bing Webmaster Tools URL List
# Generated: ${new Date().toISOString()}
# Total URLs: ${topMedications.length + 4}

# Main Pages
${BASE_URL}/
${BASE_URL}/prix-medicaments
${BASE_URL}/faq-cnops
${BASE_URL}/faq-cnss

# Medication Pages (Top ${topMedications.length})
`;

  topMedications.forEach(medication => {
    const slug = generateMedicationSlug(medication.name);
    bingUrls += `${BASE_URL}/prix/${slug}\n`;
  });

  const bingUrlsPath = join(__dirname, 'public/bing-urls.txt');
  writeFileSync(bingUrlsPath, bingUrls);

  console.log(`✅ Sitemap generated successfully!`);
  console.log(`📊 Total URLs: ${topMedications.length + 4}`);
  console.log(`📝 Medications indexed: ${topMedications.length}`);
  console.log(`📄 Sitemap: ${sitemapPath}`);
  console.log(`📄 Bing URLs: ${bingUrlsPath}`);
  console.log(`\n🔗 Submit to:`);
  console.log(`   Google: https://search.google.com/search-console`);
  console.log(`   Bing: https://www.bing.com/webmasters`);
}

// Run the generator
generateSitemap();

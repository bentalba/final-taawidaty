/**
 * URL List Generator for Search Engine Submission
 * Creates a simple text file with all URLs for easy copy-paste
 * Run with: node generate-url-list.mjs
 */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const BASE_URL = 'https://dev.taawidaty-site.pages.dev'; // Update to your domain

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

function generateUrlList() {
  const medications = [];
  
  try {
    const cnopsData = JSON.parse(readFileSync(join(__dirname, 'src/data/medications-cnops.json'), 'utf-8'));
    medications.push(...cnopsData);
  } catch (error) {
    console.warn('Could not load CNOPS medications:', error.message);
  }

  try {
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

  // Main pages
  const mainUrls = [
    BASE_URL,
    `${BASE_URL}/prix-medicaments`,
    `${BASE_URL}/faq-cnops`,
    `${BASE_URL}/faq-cnss`
  ];

  // Generate medication URLs (top 5000)
  const topMedications = medications
    .sort((a, b) => b.ppv - a.ppv)
    .slice(0, 5000);

  const medicationUrls = topMedications.map(med => 
    `${BASE_URL}/prix/${generateMedicationSlug(med.name)}`
  );

  const allUrls = [...mainUrls, ...medicationUrls];

  // Write comprehensive list
  const urlListPath = join(__dirname, 'public/url-list.txt');
  writeFileSync(urlListPath, allUrls.join('\n'));

  // Also create a CSV for advanced users
  const csvContent = 'URL,Type,Priority\n' +
    mainUrls.map(url => `${url},Main Page,1.0`).join('\n') + '\n' +
    medicationUrls.slice(0, 100).map(url => `${url},Medication,0.8`).join('\n');
  
  const csvPath = join(__dirname, 'public/url-list.csv');
  writeFileSync(csvPath, csvContent);

  // Create sample for display (first 50 URLs)
  const sampleUrls = allUrls.slice(0, 50);
  console.log('\n📋 Sample URLs (first 50):');
  console.log('━'.repeat(60));
  sampleUrls.forEach((url, i) => console.log(`${(i + 1).toString().padStart(3)}. ${url}`));
  console.log('━'.repeat(60));
  console.log(`\n✅ Generated ${allUrls.length} URLs`);
  console.log(`📄 Full list: ${urlListPath}`);
  console.log(`📊 CSV format: ${csvPath}`);
  console.log(`\n💡 Usage:`);
  console.log(`   - Copy URLs from url-list.txt`);
  console.log(`   - Submit to Bing Webmaster Tools`);
  console.log(`   - Or use CSV for bulk operations`);
}

generateUrlList();

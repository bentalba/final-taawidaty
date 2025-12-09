#!/usr/bin/env bun
/**
 * Pre-Launch Verification Script
 * Tests critical functionality before deployment
 */

import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

console.log('🚀 TAAWIDATY - Pre-Launch Verification\n');
console.log('=====================================\n');

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`✅ ${name}`);
    passed++;
  } catch (error) {
    console.log(`❌ ${name}`);
    console.log(`   Error: ${error.message}\n`);
    failed++;
  }
}

// Test 1: Build artifacts exist
test('Production build exists', () => {
  if (!existsSync('dist/index.html')) {
    throw new Error('dist/index.html not found');
  }
  if (!existsSync('dist/assets')) {
    throw new Error('dist/assets folder not found');
  }
});

// Test 2: Medication data files exist
test('CNOPS medication data exists', () => {
  const cnopsPath = 'src/data/medications-cnops.json';
  if (!existsSync(cnopsPath)) {
    throw new Error('CNOPS data file not found');
  }
  const data = JSON.parse(readFileSync(cnopsPath, 'utf-8'));
  if (!Array.isArray(data) || data.length < 5000) {
    throw new Error(`Expected 5000+ medications, got ${data.length}`);
  }
});

test('CNSS medication data exists', () => {
  const cnssPath = 'src/data/medications-cnss.json';
  if (!existsSync(cnssPath)) {
    throw new Error('CNSS data file not found');
  }
  const data = JSON.parse(readFileSync(cnssPath, 'utf-8'));
  if (!Array.isArray(data) || data.length < 5000) {
    throw new Error(`Expected 5000+ medications, got ${data.length}`);
  }
});

// Test 3: Configuration files valid
test('Package.json valid', () => {
  const pkg = JSON.parse(readFileSync('package.json', 'utf-8'));
  if (pkg.version !== '2.0.0') {
    throw new Error(`Expected version 2.0.0, got ${pkg.version}`);
  }
  if (pkg.name !== 'taawidaty') {
    throw new Error(`Expected name 'taawidaty', got ${pkg.name}`);
  }
});

test('Capacitor config valid', () => {
  const capacitorConfig = readFileSync('capacitor.config.ts', 'utf-8');
  if (!capacitorConfig.includes('com.taawidaty.app')) {
    throw new Error('App ID not found in capacitor config');
  }
  if (!capacitorConfig.includes('webDir: \'dist\'')) {
    throw new Error('webDir not correctly configured');
  }
});

// Test 4: Android configuration
test('Android manifest exists', () => {
  const manifestPath = 'android/app/src/main/AndroidManifest.xml';
  if (!existsSync(manifestPath)) {
    throw new Error('AndroidManifest.xml not found');
  }
  const manifest = readFileSync(manifestPath, 'utf-8');
  // Modern Android uses namespace instead of package attribute
  if (!manifest.includes('android:name="androidx.core.content.FileProvider"')) {
    throw new Error('FileProvider not configured in manifest');
  }
  if (!manifest.includes('INTERNET')) {
    throw new Error('Internet permission not found in manifest');
  }
});

test('Android build.gradle configured', () => {
  const gradlePath = 'android/app/build.gradle';
  if (!existsSync(gradlePath)) {
    throw new Error('build.gradle not found');
  }
  const gradle = readFileSync(gradlePath, 'utf-8');
  if (!gradle.includes('applicationId "com.taawidaty.app"')) {
    throw new Error('Application ID not configured');
  }
});

// Test 5: PWA assets
test('PWA manifest exists', () => {
  const manifestPath = 'public/manifest.json';
  if (!existsSync(manifestPath)) {
    throw new Error('manifest.json not found');
  }
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf-8'));
  if (manifest.short_name !== 'TAAWIDATY') {
    throw new Error('Manifest short_name incorrect');
  }
});

test('Service worker exists', () => {
  if (!existsSync('public/sw.js')) {
    throw new Error('Service worker not found');
  }
});

// Test 6: Critical assets
test('Logo assets exist', () => {
  if (!existsSync('public/logos/TAAWIDATY.png')) {
    throw new Error('TAAWIDATY logo not found');
  }
});

test('Favicon exists', () => {
  if (!existsSync('public/favicon.ico')) {
    throw new Error('Favicon not found');
  }
});

// Test 7: Index HTML structure
test('Index.html properly configured', () => {
  const html = readFileSync('index.html', 'utf-8');
  if (!html.includes('gtag(\'consent\', \'default\'')) {
    throw new Error('Consent mode not configured');
  }
  if (!html.includes('<div id="root">')) {
    throw new Error('Root div not found');
  }
  if (!html.includes('manifest.json')) {
    throw new Error('Manifest link not found');
  }
});

// Test 8: Environment setup
test('Environment example exists', () => {
  if (!existsSync('.env.example')) {
    throw new Error('.env.example not found');
  }
});

// Test 9: Documentation
test('README.md exists', () => {
  if (!existsSync('README.md')) {
    throw new Error('README.md not found');
  }
  const readme = readFileSync('README.md', 'utf-8');
  if (!readme.includes('Taawidaty')) {
    throw new Error('README missing project name');
  }
});

test('Deployment checklist exists', () => {
  if (!existsSync('DEPLOYMENT_CHECKLIST.md')) {
    throw new Error('DEPLOYMENT_CHECKLIST.md not found');
  }
});

// Results Summary
console.log('\n=====================================');
console.log(`\n📊 Results: ${passed} passed, ${failed} failed\n`);

if (failed === 0) {
  console.log('✅ All checks passed! Ready for deployment.\n');
  process.exit(0);
} else {
  console.log('❌ Some checks failed. Please review errors above.\n');
  process.exit(1);
}

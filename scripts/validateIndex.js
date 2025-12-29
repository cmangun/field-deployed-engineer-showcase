#!/usr/bin/env node
/**
 * Validate index.json against actual files
 */

const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'index.json');

try {
  const index = JSON.parse(fs.readFileSync(indexPath, 'utf-8'));
  
  console.log('🔍 Validating index.json...\n');
  
  let errors = 0;
  
  // Check case studies
  console.log('📁 Case Studies:');
  for (const cs of index.caseStudies) {
    const filePath = path.join(__dirname, '..', cs.file);
    const exists = fs.existsSync(filePath);
    const status = exists ? '✓' : '✗';
    console.log(`  ${status} ${cs.id}: ${cs.file}`);
    if (!exists) errors++;
  }
  
  // Check artifacts
  console.log('\n📄 Artifacts:');
  for (const artifact of index.artifacts) {
    const filePath = path.join(__dirname, '..', artifact.file);
    const exists = fs.existsSync(filePath);
    const status = exists ? '✓' : '✗';
    console.log(`  ${status} ${artifact.id}: ${artifact.file}`);
    if (!exists) errors++;
  }
  
  console.log('');
  
  if (errors === 0) {
    console.log('✅ All files validated successfully!');
    process.exit(0);
  } else {
    console.log(`❌ ${errors} file(s) missing`);
    process.exit(1);
  }
  
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}

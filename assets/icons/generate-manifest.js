const fs = require('fs');
const path = require('path');

// Path to skills directory
const skillsPath = path.join(__dirname, 'skills');

// Output manifest file
const manifestPath = path.join(__dirname, 'skills-manifest.json');

/**
 * Scans the skills directory and creates a manifest file
 * This runs during the build process to generate a dynamic list of skills
 */
function generateManifest() {
  const manifest = {};
  
  // Get all category directories
  const categories = fs.readdirSync(skillsPath)
    .filter(item => {
      const itemPath = path.join(skillsPath, item);
      return fs.statSync(itemPath).isDirectory() && !item.startsWith('.');
    });
  
  // For each category, scan for icon files
  categories.forEach(category => {
    const categoryPath = path.join(skillsPath, category);
    
    // Get all PNG files in this category
    const icons = fs.readdirSync(categoryPath)
      .filter(file => file.endsWith('.png') && !file.startsWith('.'));
    
    // Add to manifest
    manifest[category] = icons;
  });
  
  // Write the manifest file
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  
  console.log(`✅ Skills manifest generated with ${Object.keys(manifest).length} categories`);
  
  // Log details for each category
  Object.keys(manifest).forEach(category => {
    console.log(`  - ${category}: ${manifest[category].length} icons`);
  });
}

// Run the function
generateManifest();

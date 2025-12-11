const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Starting deployment process...');

try {
  // Check if we're in the right directory
  const packageJsonPath = path.join(__dirname, 'package.json');
  if (!fs.existsSync(packageJsonPath)) {
    console.error('Error: package.json not found. Make sure you are in the project root directory.');
    process.exit(1);
  }

  // Install dependencies
  console.log('Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });

  // Build the project
  console.log('Building the project...');
  execSync('npm run build', { stdio: 'inherit' });

  // Check if dist folder exists
  const distPath = path.join(__dirname, 'dist');
  if (fs.existsSync(distPath)) {
    console.log('Build successful! The application is ready for deployment.');
    console.log('The built files are located in the "dist" folder.');
    console.log('You can now deploy these files to any static hosting service.');
  } else {
    console.error('Build failed: dist folder not found.');
    process.exit(1);
  }

} catch (error) {
  console.error('Deployment failed:', error.message);
  process.exit(1);
}
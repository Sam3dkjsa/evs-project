const { exec } = require('child_process');
const fs = require('fs');

console.log('Testing build process...');

// Run TypeScript build
exec('npx tsc -b', (error, stdout, stderr) => {
  if (error) {
    console.error('TypeScript build failed:', error);
    return;
  }
  
  console.log('TypeScript build successful');
  
  // Run Vite build
  exec('npx vite build', (error, stdout, stderr) => {
    if (error) {
      console.error('Vite build failed:', error);
      return;
    }
    
    console.log('Vite build successful');
    
    // Check if dist folder exists
    if (fs.existsSync('./dist')) {
      console.log('Build completed successfully! Distribution files are in the dist folder.');
    } else {
      console.error('Build process completed but dist folder not found.');
    }
  });
});
const { spawn } = require('child_process');
const path = require('path');

// Change to the project directory
const projectDir = path.join(__dirname);

// Spawn the vite process
const viteProcess = spawn('npx', ['vite'], {
  cwd: projectDir,
  stdio: 'inherit',
  shell: true
});

viteProcess.on('close', (code) => {
  console.log(`Vite process exited with code ${code}`);
});

viteProcess.on('error', (error) => {
  console.error('Failed to start Vite process:', error);
});
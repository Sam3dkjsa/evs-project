const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end('<h1>Test Server Running</h1><p>If you can see this, the Node.js environment is working.</p>');
});

server.listen(3000, () => {
  console.log('Test server running on http://localhost:3000');
});
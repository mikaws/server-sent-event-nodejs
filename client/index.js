const http = require('http');
const fs = require('fs');
const path = require('path');

const host = "localhost";

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Error loading index.html');
      } else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
      }
    });
  } else {
    fs.readFile(path.join(__dirname, 'notfound.html'), (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('Not found');
      } else {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end(data);
      }
    });
  }
});

const port = process.env.PORT || 8000;

server.listen(port, host, () => {
  console.log(`Server listening on port ${port}`);
});
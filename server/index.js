const http = require("http");

const host = "localhost";

const server = http.createServer((req, res) => {
  const defaultHeaders = {
    "Access-Control-Allow-Origin": "http://localhost:8000",
    "Access-Control-Allow-Methods": "OPTIONS, GET",
    "Access-Control-Max-Age": 2592000,
  };

  if (req.url === "/") {
    const headers = { "Content-Type": "text/html" };
    Object.assign(headers, defaultHeaders);

    res.writeHead(200, headers);
    res.end("Hello!");
  } else if (req.url === "/progress") {
    const headers = {
      "Content-Type": "text/event-stream",
      Connection: "keep-alive",
      "Cache-Control": "no-cache",
    };
    Object.assign(headers, defaultHeaders);

    res.writeHead(200, headers);

    console.log(`connection was established with ${req.headers.origin}`);

    let i = 0;
    const intervalId = setInterval(() => {
      if (i <= 100) {
        res.write(`data: {"progress": "${i++}%"}\n\n`);
      }
    }, 100);

    req.on("close", () => {
      console.log(`connection with ${req.headers.origin} was closed`);
      clearInterval(intervalId);
    });
  } else {
    res.writeHead(404);
    res.end("Not found");
  }
});

const port = process.env.PORT || 3333;

server.listen(port, host, () => {
  console.log(`Server listening on port ${port}`);
});

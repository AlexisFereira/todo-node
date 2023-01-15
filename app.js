const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res)=> {
  // console.log({
  //   url: req.url,
  //   method: req.method,
  //   headers: req.headers,
  // });
  //process.exit();

  const url = req.url;
  const method = req.method;

  if (url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Enter message</title></head>');
    res.write(
      '<body><form action="/message" method="POST"><input type="text" name="message" /> <button>Submit</button></form></body>'
    );
    res.write('</head>');
    return res.end();
  }

  if (url === '/message' && method === 'POST') {
    const body = [];
    req.on('data', chunk => {
      console.log(chunk);
      body.push(chunk);
    });
    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody);
      const message = parsedBody.split('=')[1];
      //fs.writeFileSync('message.txt', message);
      fs.writeFile('message.txt', message, err => {
        if (err) {
          throw new Error(err);
        }
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
      });
    });
  }

  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>My app</title></head>');
  res.write('<body><h1>Hello from node js server!</h1></body>');
  res.write('</head>');
  res.end();
});

server.listen(3000);

/**
 * The following article provides a great overview
 * of available headers and their role:
 *  https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers
 */

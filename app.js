const http = require('http');
const requesthandler = require('./routes');

const server = http.createServer(requesthandler);

server.listen(3000);

/**
 * The following article provides a great overview
 * of available headers and their role:
 *  https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers
 */

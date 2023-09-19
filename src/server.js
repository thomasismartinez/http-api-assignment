const http = require('http');
const indexHandler = require('./indexResponses.js');
// const cssHandler = require('./cssHandler.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const onRequest = (request, response) => {
  console.log(request.url);

  switch (request.url) {
    case '/':
      indexHandler.getIndex(request, response);
      break;
    case '/style.css':
      indexHandler.getStylesheet(request, response);
      break;
    default:
      indexHandler.getIndex(request, response);
      break;
  }
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1:${port}`);
});

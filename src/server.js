const http = require('http');
const url = require('url');
const query = require('querystring');

const htmlHandler = require('./htmlResponses.js');
const dataHandler = require('./dataResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

// const onRequest = (request, response) => {
//  console.log(request.url);
//
//  switch (request.url) {
//    case '/':
//      htmlHandler.getIndex(request, response);
//      break;
//    case '/style.css':
//      htmlHandler.getStylesheet(request, response);
//      break;
//    case '/success':
//      break;
//    case '/badRequest':
//      break;
//    case '/unauthorized':
//      break;
//    case '/internal':
//      break;
//    case '/notImplemented':
//      break;
//    default:
//      indexHandler.getIndex(request, response);
//      break;
//  }
// };

const urlStruct = {
  '/': htmlHandler.getIndex,
  '/style.css': htmlHandler.getCSS,
  '/success': dataHandler.success,
  '/badRequest': dataHandler.badRequest,
  '/unauthorized': dataHandler.unauthorized,
  '/forbidden': dataHandler.forbidden,
  '/internal': dataHandler.internal,
  '/notImplemented': dataHandler.notImplemented,
  notFound: dataHandler.notFound,
};

// function to handle requests
const onRequest = (request, response) => {
  // first we have to parse information from the url
  const parsedUrl = url.parse(request.url);
  const params = query.parse(parsedUrl.query);
  const acceptedTypes = request.headers.accept.split(',');

  if (urlStruct[parsedUrl.pathname]) {
    return urlStruct[parsedUrl.pathname](request, response, acceptedTypes, params);
  }

  return urlStruct.notFound(request, response, acceptedTypes);

  // return urlStruct[request.method]['/'];
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1:${port}`);
});

const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const stylesheet = fs.readFileSync(`${__dirname}/../client/style.css`);

// get index HTML
const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

// get index CSS
const getStylesheet = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(stylesheet);
  response.end();
};

module.exports.getIndex = getIndex;
module.exports.getStylesheet = getStylesheet;

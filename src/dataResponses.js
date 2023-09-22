const respond = (request, response, status, content, type) => {
  response.writeHead(status, { 'Content-Type': type });
  response.write(content);
  response.end();
};

const badRequest = (request, response, acceptedTypes, params) => {
  // If params exists and is valid, send 200
  // else send 400

  const responseJSON = {
    message: 'missing valid query params set to true',
  };

  if (acceptedTypes[0] === 'text/xml') {
    const xmlString = `<response><message>${responseJSON.message}</message></response`;
    return respond(request, response, 400, xmlString, 'text/xml');
  }

  if (!params.valid || params.valid !== 'true') {
    responseJSON.id = 'badRequestMissingParams';

    return respond(request, response, 400, JSON.stringify(responseJSON), 'application/json');
  }

  responseJSON.message = 'This request has the required parameters';
  return respond(request, response, 200, JSON.stringify(responseJSON), 'application/json');
};

const unauthorized = (request, response, acceptedTypes, params) => {
  // If params exists and is valid, send 200
  // else send 401

  const responseJSON = {
    message: 'missing loggedIn query params set to true',
  };

  if (!params.loggedIn || params.loggedIn !== 'true') {
    responseJSON.id = 'badRequestMissingParams';
    return respond(request, response, 401, JSON.stringify(responseJSON), 'application/json');
  }

  responseJSON.message = 'This request has the required parameters';
  return respond(request, response, 200, JSON.stringify(responseJSON), 'application/json');
};

const noParamsResponse = (request, response, acceptedTypes, responseCode, messageText, idText) => {
  // if xml
  if (acceptedTypes[0] === 'text/xml') {
    const xmlString = `<response>
    <message>${messageText}</message>
    ${idText ? `<id>${idText}</id>` : ''}
    </response`;
    return respond(request, response, responseCode, xmlString, 'text/xml');
  }

  // otherwise json
  const responseJSON = {
    message: messageText,
  };

  if (idText) {
    responseJSON.id = idText;
  }

  return respond(request, response, responseCode, JSON.stringify(responseJSON), 'application/json');
};

const success = (request, response, acceptedTypes) => noParamsResponse(request, response, acceptedTypes, 200, 'This is a successful response');

const forbidden = (request, response, acceptedTypes) => noParamsResponse(request, response, acceptedTypes, 403, 'You do not have access to this content', 'forbidden');

const internal = (request, response, acceptedTypes) => noParamsResponse(request, response, acceptedTypes, 500, 'Internal Server Error. Something went wrong', 'internalError');

const notImplemented = (request, response, acceptedTypes) => noParamsResponse(request, response, acceptedTypes, 501, 'A get request for this page has not been implemented yet', 'notImplemented');

const notFound = (request, response, acceptedTypes) => {
  noParamsResponse(request, response, acceptedTypes, 404, 'Content not found', 'notFound');
  /*
  const responseJSON = {
    message: 'Content not found',
    id:
  };

  if (acceptedTypes[0] === 'text/xml') {
    const xmlString = `<response><message>${responseJSON.message}</message></response`;
    return respond(request, response, 404, xmlString, 'text/xml');
  }

  return respond(request, response, 404, JSON.stringify(responseJSON), 'application/json');
  */
};

module.exports = {
  success,
  badRequest,
  unauthorized,
  notFound,
  forbidden,
  internal,
  notImplemented,
};

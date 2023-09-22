const respond = (request, response, status, content, type) => {
  response.writeHead(status, { 'Content-Type': type });
  response.write(content);
  response.end();
};

// used by responses with no parameters
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

const badRequest = (request, response, acceptedTypes, params) => {
  // if parameters are invalid
  if (!params.valid || params.valid !== 'true') {
    // return failure
    return noParamsResponse(request, response, acceptedTypes, 400, 'missing valid query params set to true', 'badRequestMissingParams');
  }

  // otherwise params are valid, return success
  return noParamsResponse(request, response, acceptedTypes, 200, 'This request has the required parameters');
};

const unauthorized = (request, response, acceptedTypes, params) => {
  // if parameters are invalid
  if (!params.loggedIn || params.loggedIn !== 'true') {
    // return failure
    return noParamsResponse(request, response, acceptedTypes, 401, 'missing loggedIn query params set to true', 'badRequestMissingParams');
  }

  // otherwise params are valid, return success
  return noParamsResponse(request, response, acceptedTypes, 200, 'This request has the required parameters');
};

const forbidden = (request, response, acceptedTypes) => noParamsResponse(request, response, acceptedTypes, 403, 'You do not have access to this content', 'forbidden');

const internal = (request, response, acceptedTypes) => noParamsResponse(request, response, acceptedTypes, 500, 'Internal Server Error. Something went wrong', 'internalError');

const notImplemented = (request, response, acceptedTypes) => noParamsResponse(request, response, acceptedTypes, 501, 'A get request for this page has not been implemented yet', 'notImplemented');

const notFound = (request, response, acceptedTypes) => noParamsResponse(request, response, acceptedTypes, 404, 'Content not found', 'notFound');

module.exports = {
  success,
  badRequest,
  unauthorized,
  notFound,
  forbidden,
  internal,
  notImplemented,
};

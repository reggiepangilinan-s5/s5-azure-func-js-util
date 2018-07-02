'use strict';

var defaultHeaders = {
  'content-type': 'application/json'
};

var toHttpResponse = function toHttpResponse(body, status) {
  var returnResponse = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var headers = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : defaultHeaders;
  return {
    headers: headers,
    status: status,
    body: body,
    returnResponse: returnResponse
  };
};

module.exports = toHttpResponse;
//# sourceMappingURL=toHttpResponse.js.map
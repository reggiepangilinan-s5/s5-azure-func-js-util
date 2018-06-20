'use strict';

var defaultHeaders = {
  'content-type': 'application/json'
};

var toHttpResponse = function toHttpResponse(body, status) {
  var headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultHeaders;
  return {
    headers: headers,
    status: status,
    body: body
  };
};

module.exports = toHttpResponse;
//# sourceMappingURL=toHttpResponse.js.map
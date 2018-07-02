'use strict';

var errors = require('node-http-error-objects');

var _require = require('../../../constants'),
    httpStatusCodes = _require.httpStatusCodes;

var toHttpResponse = require('../toHttpResponse');

var response = function response(error) {
  return toHttpResponse(new errors.BadRequest(error), httpStatusCodes.BadRequest);
};

module.exports = response;
//# sourceMappingURL=badRequest.js.map
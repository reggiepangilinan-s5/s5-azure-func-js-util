'use strict';

var errors = require('node-http-error-objects');

var _require = require('../../../constants'),
    httpStatusCodes = _require.httpStatusCodes;

var toHttpResponse = require('../toHttpResponse');

var response = function response(error) {
  return toHttpResponse(new errors.InternalServerError(error), httpStatusCodes.InternalServerError);
};

module.exports = response;
//# sourceMappingURL=internalServerError.js.map
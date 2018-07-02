'use strict';

var errors = require('node-http-error-objects');

var _require = require('../../../constants'),
    httpStatusCodes = _require.httpStatusCodes;

var toHttpResponse = require('../toHttpResponse');

var response = function response(error) {
  var returnResponse = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return toHttpResponse(new errors.InternalServerError(error), httpStatusCodes.InternalServerError, returnResponse);
};

module.exports = response;
//# sourceMappingURL=internalServerError.js.map
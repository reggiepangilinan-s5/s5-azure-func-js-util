'use strict';

var errors = require('node-http-error-objects');

var _require = require('../../../constants'),
    httpStatusCodes = _require.httpStatusCodes;

var toHttpResponse = require('../toHttpResponse');
/**
 * Returns a NotFound HttpResponse
 *
 * @param {*} error
 * @param {boolean} [returnResponse=false]
 */
var response = function response(error) {
  var returnResponse = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return toHttpResponse(new errors.NotFound(error), httpStatusCodes.NotFound, returnResponse);
};

module.exports = response;
//# sourceMappingURL=notFound.js.map
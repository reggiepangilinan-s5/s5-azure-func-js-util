const errors = require('node-http-error-objects');
const { httpStatusCodes } = require('../../../constants');
const toHttpResponse = require('../toHttpResponse');
/**
 * Returns a Unauthorized HttpResponse
 *
 * @param {*} error
 * @param {boolean} [returnResponse=false]
 */
const response = (error, returnResponse = false) => toHttpResponse(
  new errors.Unauthorized(error),
  httpStatusCodes.Unauthorized,
  returnResponse,
);

module.exports = response;

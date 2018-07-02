const errors = require('node-http-error-objects');
const { httpStatusCodes } = require('../../../constants');
const toHttpResponse = require('../toHttpResponse');
/**
 * Returns a InternalServerError HttpResponse
 *
 * @param {*} error
 * @param {boolean} [returnResponse=false]
 */
const response = (error, returnResponse = false) => toHttpResponse(
  new errors.InternalServerError(error),
  httpStatusCodes.InternalServerError,
  returnResponse,
);

module.exports = response;

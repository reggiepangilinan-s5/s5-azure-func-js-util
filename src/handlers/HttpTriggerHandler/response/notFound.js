const errors = require('node-http-error-objects');
const { httpStatusCodes } = require('../../../constants');
const toHttpResponse = require('../toHttpResponse');
/**
 * Returns a NotFound HttpResponse
 *
 * @param {*} error
 * @param {boolean} [returnResponse=false]
 */
const response = (error, returnResponse = false) => toHttpResponse(
  new errors.NotFound(error),
  httpStatusCodes.NotFound,
  returnResponse,
);

module.exports = response;

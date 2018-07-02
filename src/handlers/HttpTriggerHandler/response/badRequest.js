const errors = require('node-http-error-objects');
const { httpStatusCodes } = require('../../../constants');
const toHttpResponse = require('../toHttpResponse');

const response = (error, returnResponse = false) => toHttpResponse(
  new errors.BadRequest(error),
  httpStatusCodes.BadRequest,
  returnResponse,
);

module.exports = response;

const errors = require('node-http-error-objects');
const { httpStatusCodes } = require('../../../constants');
const toHttpResponse = require('../toHttpResponse');

const response = (error, returnResponse = false) => toHttpResponse(
  new errors.InternalServerError(error),
  httpStatusCodes.InternalServerError,
  returnResponse,
);

module.exports = response;

const errors = require('node-http-error-objects');
const { httpStatusCodes } = require('../../../constants');
const toHttpResponse = require('../toHttpResponse');

const response = error => toHttpResponse(
  new errors.InternalServerError(error),
  httpStatusCodes.InternalServerError,
);

module.exports = response;

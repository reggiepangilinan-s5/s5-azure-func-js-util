const errors = require('node-http-error-objects');
const { httpStatusCodes } = require('../../../constants');
const toHttpResponse = require('../toHttpResponse');

const response = error => toHttpResponse(
  new errors.Unauthorized(error),
  httpStatusCodes.Unauthorized,
);

module.exports = response;

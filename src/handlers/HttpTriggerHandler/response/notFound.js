const errors = require('node-http-error-objects');
const { httpStatusCodes } = require('../../../constants');
const toHttpResponse = require('../toHttpResponse');

const response = error => toHttpResponse(
  new errors.NotFound(error),
  httpStatusCodes.NotFound,
);

module.exports = response;

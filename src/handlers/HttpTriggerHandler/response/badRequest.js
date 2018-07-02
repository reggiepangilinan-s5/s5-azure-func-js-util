const errors = require('node-http-error-objects');
const { httpStatusCodes } = require('../../../constants');
const toHttpResponse = require('../toHttpResponse');

const response = error => toHttpResponse(
  new errors.BadRequest(error),
  httpStatusCodes.BadRequest,
);

module.exports = response;

const validateQueryParams = require('./validateQueryParams/validateQueryParams');
const queryParamDef = require('./validateQueryParams/queryParamDef');
const validateRequestBody = require('./validateRequestBody/validateRequestBody');
const requestBodyProp = require('./validateRequestBody/requestBodyProp');

module.exports = {
  validateQueryParams,
  queryParamDef,
  validateRequestBody,
  requestBodyProp,
};


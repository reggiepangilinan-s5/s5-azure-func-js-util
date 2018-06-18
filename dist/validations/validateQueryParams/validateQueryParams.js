'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('lodash'),
    isFunction = _require.isFunction;

/**
 * Add to param errors list.
 * @param {any} paramErrors
 * @param {any} param
 * @param {any} message
 */


var addParamError = function addParamError(paramErrors, param, message) {
  paramErrors.push({
    param: param,
    message: message
  });
};

/**
 * Check if param is required.
 * @param {any} paramRequired
 * @param {any} paramValue
 * @param {any} paramErrors
 * @param {any} item
 */
var checkIfParamIsRequired = function checkIfParamIsRequired(paramRequired, paramValue, paramErrors, item) {
  if (paramRequired && !paramValue) {
    addParamError(paramErrors, item.name, 'Param [' + item.name + '] is required.');
  }
};

/**
 * Invoke validators defined.
 * @param {any} item
 * @param {any} paramValue
 * @param {any} paramErrors
 */
var invokeValidators = function invokeValidators(item, paramValue, paramErrors) {
  var validatorFunction = item.validator;
  if (validatorFunction) {
    if (isFunction(validatorFunction) && paramValue) {
      var validatorResult = validatorFunction.call(undefined, paramValue);
      // Validators function should always return boolean type
      if (typeof validatorResult !== 'boolean') {
        addParamError(paramErrors, item.name, 'Param [' + item.name + '] validator [' + validatorFunction.name + '] not returning boolean.');
        // Validation failed
      } else if (!validatorResult) {
        addParamError(paramErrors, item.name, 'Validation failed for Param [' + item.name + '] using validator [' + validatorFunction.name + ']');
      }
    } else {
      addParamError(paramErrors, item.name, 'Param [' + item.name + '] validator property is not a function or there is no value to validate.');
    }
  }
};

/**
 * Validate all query string parameters based on the definition
 * @param {any} req
 * @param {any} queryparamsdef
 * [
 *  {
 *      "name": Parameter Name (Case-sensitive),
 *      "required": true / false,
 *      "validator": function to validate should always return bool, otherwise it will fail
 *  }
 * ]
 * @returns
 * {
 *      "allValid": true / false,
 *      "errors" : [
 *                  {
 *                      "param": Parameter Name,
 *                      "message": Error Message
 *                  },
 *                  ...
 *                 ]
 * }
 */
var validateQueryParams = function validateQueryParams(req, queryparamsdef) {
  var paramErrors = [];
  (0, _keys2.default)(queryparamsdef).forEach(function (index) {
    var item = queryparamsdef[index];
    var paramRequired = item.required;
    var paramValue = req.query[item.name];
    // Validate if param is required
    checkIfParamIsRequired(paramRequired, paramValue, paramErrors, item);
    // Invoke validator function if there is one provided
    invokeValidators(item, paramValue, paramErrors);
  });
  return {
    allValid: paramErrors.length <= 0,
    errors: paramErrors
  };
};

module.exports = validateQueryParams;
//# sourceMappingURL=validateQueryParams.js.map
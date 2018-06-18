'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('lodash'),
    isFunction = _require.isFunction;

/**
 * Add to errors list.
 * @param {any} reqBodyErrors
 * @param {any} prop
 * @param {any} message
 */


var addReqBodyError = function addReqBodyError(reqBodyErrors, prop, message) {
  reqBodyErrors.push({
    prop: prop,
    message: message
  });
};

/**
 * Check if prop exists
 * @param {any} reqBodyErrors
 * @param {any} item
 */
var checkifPropExists = function checkifPropExists(reqBodyErrors, item, propValue) {
  if (item && !propValue) {
    addReqBodyError(reqBodyErrors, item.name, 'Property [' + item.name + '] is required.');
  }
};

/**
 * Invoke validators defined.
 * @param {any} item
 * @param {any} propValue
 * @param {any} reqBodyErrors
 */
var invokeValidators = function invokeValidators(item, propValue, reqBodyErrors) {
  var validatorFunction = item.validator;
  if (validatorFunction) {
    if (isFunction(validatorFunction) && propValue) {
      var validatorResult = validatorFunction.call(undefined, propValue);
      // Validators function should always return boolean type
      if (typeof validatorResult !== 'boolean') {
        addReqBodyError(reqBodyErrors, item.name, 'Property [' + item.name + '] validator [' + validatorFunction.name + '] not returning boolean.');
        // Validation failed
      } else if (!validatorResult) {
        addReqBodyError(reqBodyErrors, item.name, 'Validation failed for Property [' + item.name + '] using validator [' + validatorFunction.name + ']');
      }
    } else {
      addReqBodyError(reqBodyErrors, item.name, 'Property [' + item.name + '] validator property is not a function or there is no value to validate.');
    }
  }
};

/**
 * Validate request body based on the definition
 * @param {any} req
 * @param {any} reqbodydefs
 * [
 *  {
 *      "name": Property Name (Case-sensitive),
 *      "validator": function to validate should always return bool, otherwise it will fail
 *  }
 * ]
 * @returns
 * {
 *      "allValid": true / false,
 *      "errors" : [
 *                  {
 *                      "prop": Property Name,
 *                      "message": Error Message
 *                  },
 *                  ...
 *                 ]
 * }
 */
var validateRequestBody = function validateRequestBody(req, reqbodydefs) {
  var reqBodyErrors = [];
  (0, _keys2.default)(reqbodydefs).forEach(function (index) {
    var item = reqbodydefs[index];
    var propValue = req.body[item.name];
    // Validate if prop has value
    checkifPropExists(reqBodyErrors, item, propValue);
    // Invoke validator function if there is one provided
    invokeValidators(item, propValue, reqBodyErrors);
  });
  return {
    allValid: reqBodyErrors.length <= 0,
    errors: reqBodyErrors
  };
};

module.exports = validateRequestBody;
//# sourceMappingURL=validateRequestBody.js.map
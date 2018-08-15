'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('lodash'),
    isFunction = _require.isFunction,
    isNil = _require.isNil,
    isArray = _require.isArray;

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
  if (item && isNil(propValue)) {
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
    if (isFunction(validatorFunction) && !isNil(propValue)) {
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

var handleNonArrayRequestBody = function handleNonArrayRequestBody(reqbodydefs, req) {
  var reqBodyErrors = [];
  (0, _keys2.default)(reqbodydefs).forEach(function (index) {
    var item = reqbodydefs[index];
    var propValue = req.body[item.name];
    var nullable = item.nullable;

    if (nullable) {
      return;
    }
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

var handleArrayRequestBody = function handleArrayRequestBody(req, reqbodydefs) {
  var errors = req.body.map(function (item, itemIndex) {
    var reqBodyErrors = [];
    (0, _keys2.default)(reqbodydefs).forEach(function (index) {
      var definition = reqbodydefs[index];
      var propValue = item[definition.name];
      var nullable = definition.nullable;

      if (nullable) {
        return;
      }
      // Validate if prop has value
      checkifPropExists(reqBodyErrors, definition, propValue);
      // Invoke validator function if there is one provided
      invokeValidators(definition, propValue, reqBodyErrors);
    });
    return {
      itemIndex: itemIndex,
      itemErrors: reqBodyErrors
    };
  });

  return {
    allValid: errors.filter(function (x) {
      return x.itemErrors.length > 0;
    }).length <= 0,
    errors: errors
  };
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
  if (isNil(req.body)) {
    return {
      allValid: false,
      errors: ['Please pass a request body.']
    };
  }
  if (!isArray(req.body)) {
    return handleNonArrayRequestBody(reqbodydefs, req);
  }
  return handleArrayRequestBody(req, reqbodydefs);
};

module.exports = validateRequestBody;
//# sourceMappingURL=validateRequestBody.js.map
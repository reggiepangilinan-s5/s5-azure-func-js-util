const { isFunction } = require('lodash');

/**
 * Add to param errors list.
 * @param {any} paramErrors
 * @param {any} param
 * @param {any} message
 */
const addParamError = (paramErrors, param, message) => {
  paramErrors.push({
    param,
    message,
  });
};

/**
 * Check if param is required.
 * @param {any} paramRequired
 * @param {any} paramValue
 * @param {any} paramErrors
 * @param {any} item
 */
const checkIfParamIsRequired = (paramRequired, paramValue, paramErrors, item) => {
  if (paramRequired && !paramValue) {
    addParamError(paramErrors, item.name, `Param [${item.name}] is required.`);
  }
};

/**
 * Invoke validators defined.
 * @param {any} item
 * @param {any} paramValue
 * @param {any} paramErrors
 */
const invokeValidators = (item, paramValue, paramErrors) => {
  const validatorFunction = item.validator;
  if (validatorFunction) {
    if (isFunction(validatorFunction) && paramValue) {
      const validatorResult = validatorFunction.call(this, paramValue);
      // Validators function should always return boolean type
      if (typeof (validatorResult) !== 'boolean') {
        addParamError(paramErrors, item.name, `Param [${item.name}] validator [${validatorFunction.name}] not returning boolean.`);
        // Validation failed
      } else if (!validatorResult) {
        addParamError(paramErrors, item.name, `Validation failed for Param [${item.name}] using validator [${validatorFunction.name}]`);
      }
    } else {
      addParamError(paramErrors, item.name, `Param [${item.name}] validator property is not a function or there is no value to validate.`);
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
const validateQueryParams = (req, queryparamsdef) => {
  const paramErrors = [];
  Object.keys(queryparamsdef)
    .forEach((index) => {
      const item = queryparamsdef[index];
      const paramRequired = item.required;
      const paramValue = req.query[item.name];
      // Validate if param is required
      checkIfParamIsRequired(paramRequired, paramValue, paramErrors, item);
      // Invoke validator function if there is one provided
      invokeValidators(item, paramValue, paramErrors);
    });
  return {
    allValid: paramErrors.length <= 0,
    errors: paramErrors,
  };
};

module.exports = validateQueryParams;


const { isFunction } = require('lodash');

/**
 * Add to errors list.
 * @param {any} reqBodyErrors
 * @param {any} prop
 * @param {any} message
 */
const addReqBodyError = (reqBodyErrors, prop, message) => {
  reqBodyErrors.push({
    prop,
    message,
  });
};

/**
 * Check if prop exists
 * @param {any} reqBodyErrors
 * @param {any} item
 */
const checkifPropExists = (reqBodyErrors, item, propValue) => {
  if (item && !propValue) {
    addReqBodyError(reqBodyErrors, item.name, `Property [${item.name}] is required.`);
  }
};

/**
 * Invoke validators defined.
 * @param {any} item
 * @param {any} propValue
 * @param {any} reqBodyErrors
 */
const invokeValidators = (item, propValue, reqBodyErrors) => {
  const validatorFunction = item.validator;
  if (validatorFunction) {
    if (isFunction(validatorFunction) && propValue) {
      const validatorResult = validatorFunction.call(this, propValue);
      // Validators function should always return boolean type
      if (typeof (validatorResult) !== 'boolean') {
        addReqBodyError(reqBodyErrors, item.name, `Property [${item.name}] validator [${validatorFunction.name}] not returning boolean.`);
        // Validation failed
      } else if (!validatorResult) {
        addReqBodyError(reqBodyErrors, item.name, `Validation failed for Property [${item.name}] using validator [${validatorFunction.name}]`);
      }
    } else {
      addReqBodyError(reqBodyErrors, item.name, `Property [${item.name}] validator property is not a function or there is no value to validate.`);
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
const validateRequestBody = (req, reqbodydefs) => {
  const reqBodyErrors = [];
  Object.keys(reqbodydefs)
    .forEach((index) => {
      const item = reqbodydefs[index];
      const propValue = req.body[item.name];
      // Validate if prop has value
      checkifPropExists(reqBodyErrors, item, propValue);
      // Invoke validator function if there is one provided
      invokeValidators(item, propValue, reqBodyErrors);
    });
  return {
    allValid: reqBodyErrors.length <= 0,
    errors: reqBodyErrors,
  };
};

module.exports = validateRequestBody;


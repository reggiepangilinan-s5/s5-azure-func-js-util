const { isFunction, isNil, isArray } = require('lodash');

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
  if (item && isNil(propValue)) {
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
    if (isFunction(validatorFunction) && !isNil(propValue)) {
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

const handleNonArrayRequestBody = (reqbodydefs, req) => {
  const reqBodyErrors = [];
  Object.keys(reqbodydefs)
    .forEach((index) => {
      const item = reqbodydefs[index];
      const propValue = req.body[item.name];
      const { nullable } = item;
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
    errors: reqBodyErrors,
  };
};


const handleArrayRequestBody = (req, reqbodydefs) => {
  const errors = req.body.map((item, itemIndex) => {
    const reqBodyErrors = [];
    Object.keys(reqbodydefs)
      .forEach((index) => {
        const definition = reqbodydefs[index];
        const propValue = item[definition.name];
        const { nullable } = definition;
        if (nullable) {
          return;
        }
        // Validate if prop has value
        checkifPropExists(reqBodyErrors, definition, propValue);
        // Invoke validator function if there is one provided
        invokeValidators(definition, propValue, reqBodyErrors);
      });
    return {
      itemIndex,
      itemErrors: reqBodyErrors,
    };
  });

  return {
    allValid: errors.filter(x => x.itemErrors.length > 0).length <= 0,
    errors,
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
const validateRequestBody = (req, reqbodydefs) => {
  if (isNil(req.body)) {
    return {
      allValid: false,
      errors: ['Please pass a request body.'],
    };
  }
  if (!isArray(req.body)) {
    return handleNonArrayRequestBody(reqbodydefs, req);
  }
  return handleArrayRequestBody(req, reqbodydefs);
};

module.exports = validateRequestBody;

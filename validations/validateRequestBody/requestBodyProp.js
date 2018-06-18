"use strict";

/**
 * Create a new request body definition
 * @param {any} name
 * @param {any} validator (optional)
 * @return {requestBodyProp} Object
 */
var requestBodyProp = function requestBodyProp(name) {
  var validator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  return {
    name: name,
    validator: validator
  };
};

module.exports = requestBodyProp;
//# sourceMappingURL=requestBodyProp.js.map
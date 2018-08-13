"use strict";

/**
 * Create a new request body definition
 * @param {any} name
 * @param {any} validator (optional)
 * @param {any} nullable (optional) When his value is set to true validator will not be executed
 * @return {requestBodyProp} Object
 */
var requestBodyProp = function requestBodyProp(name) {
  var validator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var nullable = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  return {
    name: name,
    validator: validator,
    nullable: nullable
  };
};

module.exports = requestBodyProp;
//# sourceMappingURL=requestBodyProp.js.map
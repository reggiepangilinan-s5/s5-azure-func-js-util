"use strict";

/**
 * Create a new query param definition
 * @param {any} name
 * @param {any} required
 * @param {any} validator (optional)
 * @return {queryParamDef} Object
 */
var queryParamDef = function queryParamDef(name, required) {
  var validator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  return {
    name: name,
    required: required,
    validator: validator
  };
};

module.exports = queryParamDef;
//# sourceMappingURL=queryParamDef.js.map
/**
 * Create a new query param definition
 * @param {any} name
 * @param {any} required
 * @param {any} validator (optional)
 * @return {queryParamDef} Object
 */
const queryParamDef = (name, required, validator = null) => ({
  name,
  required,
  validator,
});

module.exports = queryParamDef;


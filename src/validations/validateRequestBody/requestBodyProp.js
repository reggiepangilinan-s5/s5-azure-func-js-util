/**
 * Create a new request body definition
 * @param {any} name
 * @param {any} validator (optional)
 * @return {requestBodyProp} Object
 */
const requestBodyProp = (name, validator = null) => ({
  name,
  validator,
});

module.exports = requestBodyProp;


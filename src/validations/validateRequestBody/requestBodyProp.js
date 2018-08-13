/**
 * Create a new request body definition
 * @param {any} name
 * @param {any} validator (optional)
 * @param {any} nullable (optional) When his value is set to true validator will not be executed
 * @return {requestBodyProp} Object
 */
const requestBodyProp = (name, validator = null, nullable = false) => ({
  name,
  validator,
  nullable,
});

module.exports = requestBodyProp;


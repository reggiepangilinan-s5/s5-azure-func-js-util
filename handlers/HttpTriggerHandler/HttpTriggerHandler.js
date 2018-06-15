const errors = require('node-http-error-objects');
const { requestMethodShouldBe, specfifyHttpMethod } = require('../../messages/server');
const { validateQueryParams } = require('../../validations');
const { validateRequestBody } = require('../../validations');

class HttpTriggerHandler {
  constructor() {
    this.httpMethod = null;
    this.queryParamsDef = null;
    this.requestBodyDef = null;
    this.mainFunction = null;
  }
  setHttpMethod(httpMethod) {
    this.httpMethod = httpMethod;
    return this;
  }
  setQueryParamsDefinition(queryParamsDef) {
    this.queryParamsDef = queryParamsDef;
    return this;
  }
  setRequestBodyDefinition(requestBodyDef) {
    this.requestBodyDef = requestBodyDef;
    return this;
  }
  listen(mainFunction) {
    this.mainFunction = mainFunction;
    const handler = this;
    return async (context, req) => {
      try {
        if (!handler.httpMethod) {
          return new errors.BadRequest(specfifyHttpMethod);
        }
        if (req.method !== handler.httpMethod) {
          return new errors.BadRequest(requestMethodShouldBe + handler.httpMethod);
        }
        if (handler.queryParamsDef) {
          const validationResult = validateQueryParams(req, handler.queryParamsDef);
          if (!validationResult.allValid) {
            return new errors.BadRequest(validationResult.errors);
          }
        }
        if (handler.requestBodyDef) {
          const validationResult = validateRequestBody(req, handler.requestBodyDef);
          if (!validationResult.allValid) {
            return new errors.BadRequest(validationResult.errors);
          }
        }
        return await handler.mainFunction.call(handler.mainFunction, context, req);
      } catch (error) {
        return new errors.InternalServerError({ exception: error.message, stack: error.stack });
      }
    };
  }
}
module.exports = HttpTriggerHandler;

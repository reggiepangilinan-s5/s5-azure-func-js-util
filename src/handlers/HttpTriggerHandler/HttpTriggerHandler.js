const { requestMethodShouldBe, specfifyHttpMethod } = require('../../messages/server');
const { validateQueryParams } = require('../../validations');
const { validateRequestBody } = require('../../validations');
const { httpStatusCodes } = require('../../constants');
const toHttpResponse = require('./toHttpResponse');
const badRequest = require('./response/badRequest');
const internalServerError = require('./response/internalServerError');

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
          return badRequest(specfifyHttpMethod);
        }
        if (req.method !== handler.httpMethod) {
          return badRequest(requestMethodShouldBe + handler.httpMethod);
        }
        if (handler.queryParamsDef) {
          const validationResult = validateQueryParams(req, handler.queryParamsDef);
          if (!validationResult.allValid) {
            return badRequest(validationResult.errors);
          }
        }
        if (handler.requestBodyDef) {
          const validationResult = validateRequestBody(req, handler.requestBodyDef);
          if (!validationResult.allValid) {
            return badRequest(validationResult.errors);
          }
        }
        const result = await handler.mainFunction.call(handler.mainFunction, context, req);
        if (result.returnResponse) {
          return JSON.stringify(result);
        }
        return toHttpResponse(
          JSON.stringify(result),
          httpStatusCodes.Ok,
        );
      } catch (error) {
        return internalServerError({ exception: error.message, stack: error.stack });
      }
    };
  }
}
module.exports = HttpTriggerHandler;

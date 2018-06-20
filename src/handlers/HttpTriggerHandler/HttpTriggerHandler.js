const errors = require('node-http-error-objects');
const { requestMethodShouldBe, specfifyHttpMethod } = require('../../messages/server');
const { validateQueryParams } = require('../../validations');
const { validateRequestBody } = require('../../validations');
const { httpStatusCodes } = require('../../constants');
const toHttpResponse = require('./toHttpResponse');

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
          return toHttpResponse(
            new errors.BadRequest(specfifyHttpMethod),
            httpStatusCodes.BadRequest,
          );
        }
        if (req.method !== handler.httpMethod) {
          return toHttpResponse(
            new errors.BadRequest(requestMethodShouldBe + handler.httpMethod),
            httpStatusCodes.BadRequest,
          );
        }
        if (handler.queryParamsDef) {
          const validationResult = validateQueryParams(req, handler.queryParamsDef);
          if (!validationResult.allValid) {
            return toHttpResponse(
              new errors.BadRequest(validationResult.errors),
              httpStatusCodes.BadRequest,
            );
          }
        }
        if (handler.requestBodyDef) {
          const validationResult = validateRequestBody(req, handler.requestBodyDef);
          if (!validationResult.allValid) {
            return toHttpResponse(
              new errors.BadRequest(validationResult.errors),
              httpStatusCodes.BadRequest,
            );
          }
        }
        const result = await handler.mainFunction.call(handler.mainFunction, context, req);
        return toHttpResponse(
          JSON.parse(JSON.stringify(result)),
          httpStatusCodes.Ok,
        );
      } catch (error) {
        return toHttpResponse(
          new errors.InternalServerError({ exception: error.message, stack: error.stack }),
          httpStatusCodes.InternalServerError,
        );
      }
    };
  }
}
module.exports = HttpTriggerHandler;

'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('../../messages/server'),
    requestMethodShouldBe = _require.requestMethodShouldBe,
    specfifyHttpMethod = _require.specfifyHttpMethod;

var _require2 = require('../../validations'),
    validateQueryParams = _require2.validateQueryParams;

var _require3 = require('../../validations'),
    validateRequestBody = _require3.validateRequestBody;

var _require4 = require('../../constants'),
    httpStatusCodes = _require4.httpStatusCodes;

var toHttpResponse = require('./toHttpResponse');
var badRequest = require('./response/badRequest');
var internalServerError = require('./response/internalServerError');

var HttpTriggerHandler = function () {
  function HttpTriggerHandler() {
    (0, _classCallCheck3.default)(this, HttpTriggerHandler);

    this.httpMethod = null;
    this.queryParamsDef = null;
    this.requestBodyDef = null;
    this.mainFunction = null;
  }

  (0, _createClass3.default)(HttpTriggerHandler, [{
    key: 'setHttpMethod',
    value: function setHttpMethod(httpMethod) {
      this.httpMethod = httpMethod;
      return this;
    }
  }, {
    key: 'setQueryParamsDefinition',
    value: function setQueryParamsDefinition(queryParamsDef) {
      this.queryParamsDef = queryParamsDef;
      return this;
    }
  }, {
    key: 'setRequestBodyDefinition',
    value: function setRequestBodyDefinition(requestBodyDef) {
      this.requestBodyDef = requestBodyDef;
      return this;
    }
  }, {
    key: 'listen',
    value: function listen(mainFunction) {
      var _this = this;

      this.mainFunction = mainFunction;
      var handler = this;
      return function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(context, req) {
          var validationResult, _validationResult, result;

          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.prev = 0;

                  if (handler.httpMethod) {
                    _context.next = 3;
                    break;
                  }

                  return _context.abrupt('return', badRequest(specfifyHttpMethod));

                case 3:
                  if (!(req.method !== handler.httpMethod)) {
                    _context.next = 5;
                    break;
                  }

                  return _context.abrupt('return', badRequest(requestMethodShouldBe + handler.httpMethod));

                case 5:
                  if (!handler.queryParamsDef) {
                    _context.next = 9;
                    break;
                  }

                  validationResult = validateQueryParams(req, handler.queryParamsDef);

                  if (validationResult.allValid) {
                    _context.next = 9;
                    break;
                  }

                  return _context.abrupt('return', badRequest(validationResult.errors));

                case 9:
                  if (!handler.requestBodyDef) {
                    _context.next = 13;
                    break;
                  }

                  _validationResult = validateRequestBody(req, handler.requestBodyDef);

                  if (_validationResult.allValid) {
                    _context.next = 13;
                    break;
                  }

                  return _context.abrupt('return', badRequest(_validationResult.errors));

                case 13:
                  _context.next = 15;
                  return handler.mainFunction.call(handler.mainFunction, context, req);

                case 15:
                  result = _context.sent;

                  if (!result.returnResponse) {
                    _context.next = 18;
                    break;
                  }

                  return _context.abrupt('return', (0, _stringify2.default)(result));

                case 18:
                  return _context.abrupt('return', toHttpResponse((0, _stringify2.default)(result), httpStatusCodes.Ok));

                case 21:
                  _context.prev = 21;
                  _context.t0 = _context['catch'](0);
                  return _context.abrupt('return', internalServerError({ exception: _context.t0.message, stack: _context.t0.stack }));

                case 24:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, _this, [[0, 21]]);
        }));

        return function (_x, _x2) {
          return _ref.apply(this, arguments);
        };
      }();
    }
  }]);
  return HttpTriggerHandler;
}();

module.exports = HttpTriggerHandler;
//# sourceMappingURL=HttpTriggerHandler.js.map
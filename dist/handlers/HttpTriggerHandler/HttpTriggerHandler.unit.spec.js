'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HttpTriggerHandler = require('./HttpTriggerHandler');

var _require = require('../../constants'),
    httpMethods = _require.httpMethods;

var _require2 = require('../../validations'),
    queryParamDef = _require2.queryParamDef;

var fakeContext = {};
var fakeRequest = {
  method: httpMethods.GET,
  query: {}
};
var fakeRequestWithQueryParams = {
  method: httpMethods.GET,
  query: { fakeParam: 'fakevalue' }
};

var fakeQueryRequiredParamsDefs = [queryParamDef('fakeParam', true)];

var fakeQueryParamsDefs = [queryParamDef('fakeParam', false)];

describe('utils/handlers/HttpTriggerHandler', function () {
  test('Should execute function to be called once passing `context` and `req`', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var mockFunction, handler, actual, expected;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            mockFunction = jest.fn();

            mockFunction.mockReturnValue(true);
            handler = new HttpTriggerHandler().setHttpMethod(httpMethods.GET).listen(mockFunction);
            _context.next = 5;
            return handler(fakeContext, fakeRequest);

          case 5:
            actual = _context.sent;
            expected = true;

            expect(mockFunction.mock.calls.length).toBe(1);
            expect(mockFunction).toBeCalledWith(fakeContext, fakeRequest);
            expect(actual).toBe(expected);

          case 10:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  })));
  test('Should not execute function when httpMethod has not been set', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
    var mockFunction, handler, result, actual, expected;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            mockFunction = jest.fn();
            handler = new HttpTriggerHandler().listen(mockFunction);
            _context2.next = 4;
            return handler(fakeContext, fakeRequest);

          case 4:
            result = _context2.sent;
            actual = result.errorCode;
            expected = 400;

            expect(mockFunction.mock.calls.length).toBe(0);
            expect(actual).toBe(expected);

          case 9:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  })));

  test('Should not execute function when incorrect httpMethod has been set', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
    var mockFunction, handler, result, actual, expected;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            mockFunction = jest.fn();
            handler = new HttpTriggerHandler().setHttpMethod(httpMethods.POST).listen(mockFunction);
            _context3.next = 4;
            return handler(fakeContext, fakeRequest);

          case 4:
            result = _context3.sent;
            actual = result.errorCode;
            expected = 400;

            expect(mockFunction.mock.calls.length).toBe(0);
            expect(actual).toBe(expected);

          case 9:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  })));

  test('Should execute function to be called with query parameter definitions', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
    var mockFunction, handler, actual, expected;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            mockFunction = jest.fn();

            mockFunction.mockReturnValue(true);
            handler = new HttpTriggerHandler().setHttpMethod(httpMethods.GET).setQueryParamsDefinition(fakeQueryRequiredParamsDefs).listen(mockFunction);
            _context4.next = 5;
            return handler(fakeContext, fakeRequestWithQueryParams);

          case 5:
            actual = _context4.sent;
            expected = true;

            expect(mockFunction.mock.calls.length).toBe(1);
            expect(mockFunction).toBeCalledWith(fakeContext, fakeRequestWithQueryParams);
            expect(actual).toBe(expected);

          case 10:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  })));

  test('Should not execute function failing the query params definitions', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
    var mockFunction, handler, result, actual, expected;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            mockFunction = jest.fn();

            mockFunction.mockReturnValue(true);
            handler = new HttpTriggerHandler().setHttpMethod(httpMethods.GET).setQueryParamsDefinition(fakeQueryRequiredParamsDefs).listen(mockFunction);
            _context5.next = 5;
            return handler(fakeContext, fakeRequest);

          case 5:
            result = _context5.sent;
            actual = result.errorCode;
            expected = 400;

            expect(mockFunction.mock.calls.length).toBe(0);
            expect(actual).toBe(expected);

          case 10:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  })));

  test('Should execute function query params definitions not required.', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6() {
    var mockFunction, handler, actual, expected;
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            mockFunction = jest.fn();

            mockFunction.mockReturnValue(true);
            handler = new HttpTriggerHandler().setHttpMethod(httpMethods.GET).setQueryParamsDefinition(fakeQueryParamsDefs).listen(mockFunction);
            _context6.next = 5;
            return handler(fakeContext, fakeRequest);

          case 5:
            actual = _context6.sent;
            expected = true;

            expect(mockFunction.mock.calls.length).toBe(1);
            expect(mockFunction).toBeCalledWith(fakeContext, fakeRequest);
            expect(actual).toBe(expected);

          case 10:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  })));
});
//# sourceMappingURL=HttpTriggerHandler.unit.spec.js.map
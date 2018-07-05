"use strict";

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var newServiceBusMessage = function newServiceBusMessage(body) {
  var customProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  return {
    body: (0, _stringify2.default)(body),
    customProperties: customProps ? (0, _extends3.default)({}, customProps) : customProps
  };
};

module.exports = newServiceBusMessage;
//# sourceMappingURL=newServiceBusMessage.js.map
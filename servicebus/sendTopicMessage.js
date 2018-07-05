'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var azure = require('azure');

var sendTopicMessage = function sendTopicMessage(topic, message) {
  var connection = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  return new _promise2.default(function (resolve, reject) {
    var serviceBusService = azure.createServiceBusService(connection);
    serviceBusService.sendTopicMessage(topic, message, function (error) {
      if (error) {
        reject(error);
      } else {
        resolve({ success: true });
      }
    });
  });
};

module.exports = sendTopicMessage;
//# sourceMappingURL=sendTopicMessage.js.map
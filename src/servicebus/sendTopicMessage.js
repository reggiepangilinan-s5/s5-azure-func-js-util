const azure = require('azure');

const sendTopicMessage = (topic, message, connection = null) =>
  new Promise(((resolve, reject) => {
    const serviceBusService = azure.createServiceBusService(connection);
    serviceBusService.sendTopicMessage(topic, message, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve({ success: true });
      }
    });
  }));

module.exports = sendTopicMessage;

const newServiceBusMessage = (body, customProps = null) => ({
  body: JSON.stringify(body),
  customProperties: customProps ? { ...customProps } : customProps,
});

module.exports = newServiceBusMessage;

const defaultHeaders = {
  'content-type': 'application/json',
};

const toHttpResponse = (body, status, headers = defaultHeaders, customResponse = false) => ({
  headers,
  status,
  body,
  customResponse,
});

module.exports = toHttpResponse;

const defaultHeaders = {
  'content-type': 'application/json',
};

const toHttpResponse = (body, status, returnResponse = false, headers = defaultHeaders) => ({
  headers,
  status,
  body,
  returnResponse,
});

module.exports = toHttpResponse;

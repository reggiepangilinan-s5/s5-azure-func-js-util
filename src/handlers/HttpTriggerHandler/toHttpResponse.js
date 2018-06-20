const defaultHeaders = {
  'content-type': 'application/json',
};

const toHttpResponse = (body, status, headers = defaultHeaders) => ({
  headers,
  status,
  body,
});

module.exports = toHttpResponse;

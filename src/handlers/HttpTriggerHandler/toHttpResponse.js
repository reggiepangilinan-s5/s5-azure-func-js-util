const defaultHeaders = {
  'content-type': 'application/json',
};

const toHttpResponse = (body, status, headers = defaultHeaders, returnResponse = false) => ({
  headers,
  status,
  body,
  returnResponse,
});

module.exports = toHttpResponse;

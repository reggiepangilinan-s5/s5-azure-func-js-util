const HttpTriggerHandler = require('./HttpTriggerHandler');
const { httpMethods } = require('../../constants');
const { queryParamDef } = require('../../validations');

const fakeContext = {
};
const fakeRequest = {
  method: httpMethods.GET,
  query: {},
};
const fakeRequestWithQueryParams = {
  method: httpMethods.GET,
  query: { fakeParam: 'fakevalue' },
};

const fakeQueryRequiredParamsDefs = [
  queryParamDef('fakeParam', true),
];

const fakeQueryParamsDefs = [
  queryParamDef('fakeParam', false),
];

describe('utils/handlers/HttpTriggerHandler', () => {
  test('Should execute function to be called once passing `context` and `req`', async () => {
    const mockFunction = jest.fn();
    mockFunction.mockReturnValue(true);
    const handler = new HttpTriggerHandler().setHttpMethod(httpMethods.GET).listen(mockFunction);
    const actual = await handler(fakeContext, fakeRequest);
    const expected = true;
    expect(mockFunction.mock.calls.length).toBe(1);
    expect(mockFunction).toBeCalledWith(fakeContext, fakeRequest);
    expect(actual).toBe(expected);
  });
  test('Should not execute function when httpMethod has not been set', async () => {
    const mockFunction = jest.fn();
    const handler = new HttpTriggerHandler().listen(mockFunction);
    const result = await handler(fakeContext, fakeRequest);
    const actual = result.errorCode;
    const expected = 400;
    expect(mockFunction.mock.calls.length).toBe(0);
    expect(actual).toBe(expected);
  });

  test('Should not execute function when incorrect httpMethod has been set', async () => {
    const mockFunction = jest.fn();
    const handler = new HttpTriggerHandler().setHttpMethod(httpMethods.POST).listen(mockFunction);
    const result = await handler(fakeContext, fakeRequest);
    const actual = result.errorCode;
    const expected = 400;
    expect(mockFunction.mock.calls.length).toBe(0);
    expect(actual).toBe(expected);
  });

  test('Should execute function to be called with query parameter definitions', async () => {
    const mockFunction = jest.fn();
    mockFunction.mockReturnValue(true);
    const handler = new HttpTriggerHandler()
      .setHttpMethod(httpMethods.GET)
      .setQueryParamsDefinition(fakeQueryRequiredParamsDefs)
      .listen(mockFunction);
    const actual = await handler(fakeContext, fakeRequestWithQueryParams);
    const expected = true;
    expect(mockFunction.mock.calls.length).toBe(1);
    expect(mockFunction).toBeCalledWith(fakeContext, fakeRequestWithQueryParams);
    expect(actual).toBe(expected);
  });

  test('Should not execute function failing the query params definitions', async () => {
    const mockFunction = jest.fn();
    mockFunction.mockReturnValue(true);
    const handler = new HttpTriggerHandler()
      .setHttpMethod(httpMethods.GET)
      .setQueryParamsDefinition(fakeQueryRequiredParamsDefs)
      .listen(mockFunction);
    const result = await handler(fakeContext, fakeRequest);
    const actual = result.errorCode;
    const expected = 400;
    expect(mockFunction.mock.calls.length).toBe(0);
    expect(actual).toBe(expected);
  });

  test('Should execute function query params definitions not required.', async () => {
    const mockFunction = jest.fn();
    mockFunction.mockReturnValue(true);
    const handler = new HttpTriggerHandler()
      .setHttpMethod(httpMethods.GET)
      .setQueryParamsDefinition(fakeQueryParamsDefs)
      .listen(mockFunction);
    const actual = await handler(fakeContext, fakeRequest);
    const expected = true;
    expect(mockFunction.mock.calls.length).toBe(1);
    expect(mockFunction).toBeCalledWith(fakeContext, fakeRequest);
    expect(actual).toBe(expected);
  });
});

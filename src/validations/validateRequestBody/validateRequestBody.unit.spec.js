const validateRequestBody = require('./validateRequestBody');
const requestBodyProp = require('./requestBodyProp');
const { isValidDate } = require('../../validations');

const fakeRequest = {
  body: {
    storeId: 'STR001',
    vendorId: 'VND001',
    priceFamily: 'PRC001',
    dateFrom: '2018-03-11',
    dateTo: '2018-03-17',
    ignoreThis: 0,
  },
};

const invalidValidator = () => 1 + 1;
const invalidValidatorWithParam = param => `${param} notboolean`;

describe('utils/validations/validateRequestBody', () => {
  test('Should pass if req body complied with the definition. All required and All Valid Values', () => {
    const reqBodyDefs = [
      requestBodyProp('storeId'),
      requestBodyProp('vendorId'),
      requestBodyProp('priceFamily'),
      requestBodyProp('dateFrom', isValidDate),
      requestBodyProp('dateTo', isValidDate),
      requestBodyProp('ignoreThis', null, true),
    ];
    const result = validateRequestBody(fakeRequest, reqBodyDefs);
    expect(result.allValid).toBe(true);
    expect(result.errors.length).toBe(0);
  });
  test('Should fail if req body did not comply with the definition. Invalid validators passed.', () => {
    const reqBodyDefs = [
      requestBodyProp('storeid'),
      requestBodyProp('vendorId', invalidValidatorWithParam),
      requestBodyProp('priceFamily', invalidValidator),
      requestBodyProp('dateFrom', isValidDate),
      requestBodyProp('dateTo', invalidValidatorWithParam),
      requestBodyProp('ignoreThis', null, false),
      requestBodyProp('NONEXISTENT'),
    ];
    const result = validateRequestBody(fakeRequest, reqBodyDefs);
    expect(result.allValid).toBe(false);
    expect(result.errors.length).toBe(5);
  });
});

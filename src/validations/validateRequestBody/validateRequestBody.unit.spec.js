const moment = require('moment');
const validateRequestBody = require('./validateRequestBody');
const requestBodyProp = require('./requestBodyProp');

const fakeRequest = {
  body: {
    storeId: 'STR001',
    vendorId: 'VND001',
    priceFamily: 'PRC001',
    dateFrom: '2018-03-11',
    dateTo: '2018-03-17',
    zeroValue: 0,
    ignoreThisToo: null,
  },
};

const fakeRequestArray = {
  body: [
    {
      storeId: 'STR001',
      vendorId: 'VND001',
      priceFamily: 'PRC001',
      dateFrom: '2018-03-11',
      dateTo: '2018-03-17',
      zeroValue: 0,
      ignoreThisToo: null,
    },
    {
      storeId: 'STR002',
      vendorId: 'VND002',
      priceFamily: 'PRC002',
      dateFrom: '2018-03-11',
      dateTo: '2018-03-17',
      zeroValue: 0,
      ignoreThisToo: null,
    },
  ],
};

const zeroValueValidator = value => value >= 0;
const isValidDate = date => moment(date, 'YYYY-MM-DD').isValid();
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
      requestBodyProp('zeroValue', zeroValueValidator, true),
      requestBodyProp('ignoreThisToo', null, true),
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
      requestBodyProp('zeroValue', zeroValueValidator, true),
      requestBodyProp('ignoreThisToo', null, true),
      requestBodyProp('NONEXISTENT'),
    ];
    const result = validateRequestBody(fakeRequest, reqBodyDefs);
    expect(result.allValid).toBe(false);
    expect(result.errors.length).toBe(5);
  });

  test('Should fail if req body is not passed', () => {
    const reqBodyDefs = [
      requestBodyProp('storeid'),
      requestBodyProp('vendorId', invalidValidatorWithParam),
      requestBodyProp('priceFamily', invalidValidator),
      requestBodyProp('dateFrom', isValidDate),
      requestBodyProp('dateTo', invalidValidatorWithParam),
      requestBodyProp('zeroValue', null, false),
      requestBodyProp('ignoreThisToo', null, true),
      requestBodyProp('NONEXISTENT'),
    ];
    const result = validateRequestBody({ body: null }, reqBodyDefs);
    expect(result.allValid).toBe(false);
    expect(result.errors.length).toBe(1);
  });

  test('Should fail if req body is empty', () => {
    const reqBodyDefs = [
      requestBodyProp('storeid'),
      requestBodyProp('vendorId', invalidValidatorWithParam),
      requestBodyProp('priceFamily', invalidValidator),
      requestBodyProp('dateFrom', isValidDate),
      requestBodyProp('dateTo', invalidValidatorWithParam),
      requestBodyProp('zeroValue', null, false),
      requestBodyProp('ignoreThisToo', null, true),
      requestBodyProp('NONEXISTENT'),
    ];
    const result = validateRequestBody({ body: {} }, reqBodyDefs);
    expect(result.allValid).toBe(false);
  });

  test('Should pass if req body array complied with the definition. All required and All Valid Values', () => {
    const reqBodyDefs = [
      requestBodyProp('storeId'),
      requestBodyProp('vendorId'),
      requestBodyProp('priceFamily'),
      requestBodyProp('dateFrom', isValidDate),
      requestBodyProp('dateTo', isValidDate),
      requestBodyProp('zeroValue', zeroValueValidator, true),
      requestBodyProp('ignoreThisToo', null, true),
    ];
    const result = validateRequestBody(fakeRequestArray, reqBodyDefs);
    expect(result.allValid).toBe(true);
  });

  test('Should fail if req body did not comply with the definition. Invalid validators passed.', () => {
    const reqBodyDefs = [
      requestBodyProp('storeid'),
      requestBodyProp('vendorId', invalidValidatorWithParam),
      requestBodyProp('priceFamily', invalidValidator),
      requestBodyProp('dateFrom', isValidDate),
      requestBodyProp('dateTo', invalidValidatorWithParam),
      requestBodyProp('zeroValue', zeroValueValidator, false),
      requestBodyProp('ignoreThisToo', null, true),
      requestBodyProp('NONEXISTENT'),
    ];
    const result = validateRequestBody(fakeRequestArray, reqBodyDefs);
    expect(result.allValid).toBe(false);
  });
});

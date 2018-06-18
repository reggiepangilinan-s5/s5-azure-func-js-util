const validateQueryParams = require('./validateQueryParams');
const queryParamDef = require('./queryParamDef');
const { isValidDate } = require('../../validations');

const fakeRequest = {
  query: {
    storeId: 'STR001',
    vendorId: 'VND001',
    priceFamily: 'PRC001',
    dateFrom: '2018-03-11',
    dateTo: '2018-03-17',
  },
};

const invalidValidator = () => 1 + 1;
const invalidValidatorWithParam = param => `${param} notboolean`;

describe('utils/validations/validateQueryParams', () => {
  test('Should pass if params complied with the definition. All required and All Valid Values', () => {
    const queryParamsDef = [
      queryParamDef('storeId', true),
      queryParamDef('vendorId', true),
      queryParamDef('priceFamily', true),
      queryParamDef('dateFrom', true, isValidDate),
      queryParamDef('dateTo', true, isValidDate),
    ];
    const result = validateQueryParams(fakeRequest, queryParamsDef);
    expect(result.allValid).toBe(true);
    expect(result.errors.length).toBe(0);
  });

  test('Should pass if params complied with the definition. Some required and All Valid Values', () => {
    const queryParamsDef = [
      queryParamDef('storeId', true),
      queryParamDef('vendorId', true),
      queryParamDef('priceFamily', true),
      queryParamDef('dateFrom', false, isValidDate),
      queryParamDef('dateTo', false, isValidDate),
    ];
    const result = validateQueryParams(fakeRequest, queryParamsDef);
    expect(result.allValid).toBe(true);
    expect(result.errors.length).toBe(0);
  });

  test('Should fail if params did not comply with the definition. Required params was not provided and invalid case.', () => {
    const queryParamsDef = [
      queryParamDef('storeid', true),
      queryParamDef('vendorId', true, invalidValidatorWithParam),
      queryParamDef('priceFamily', true, invalidValidator),
      queryParamDef('dateFrom', false, isValidDate),
      queryParamDef('dateTo', true, invalidValidatorWithParam),
      queryParamDef('NONEXISTENT', true),
    ];
    const result = validateQueryParams(fakeRequest, queryParamsDef);
    expect(result.allValid).toBe(false);
    expect(result.errors.length).toBe(5);
  });
});

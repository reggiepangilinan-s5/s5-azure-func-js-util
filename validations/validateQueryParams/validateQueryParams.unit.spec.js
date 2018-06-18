'use strict';

var validateQueryParams = require('./validateQueryParams');
var queryParamDef = require('./queryParamDef');

var _require = require('../../validations'),
    isValidDate = _require.isValidDate;

var fakeRequest = {
  query: {
    storeId: 'STR001',
    vendorId: 'VND001',
    priceFamily: 'PRC001',
    dateFrom: '2018-03-11',
    dateTo: '2018-03-17'
  }
};

var invalidValidator = function invalidValidator() {
  return 1 + 1;
};
var invalidValidatorWithParam = function invalidValidatorWithParam(param) {
  return param + ' notboolean';
};

describe('utils/validations/validateQueryParams', function () {
  test('Should pass if params complied with the definition. All required and All Valid Values', function () {
    var queryParamsDef = [queryParamDef('storeId', true), queryParamDef('vendorId', true), queryParamDef('priceFamily', true), queryParamDef('dateFrom', true, isValidDate), queryParamDef('dateTo', true, isValidDate)];
    var result = validateQueryParams(fakeRequest, queryParamsDef);
    expect(result.allValid).toBe(true);
    expect(result.errors.length).toBe(0);
  });

  test('Should pass if params complied with the definition. Some required and All Valid Values', function () {
    var queryParamsDef = [queryParamDef('storeId', true), queryParamDef('vendorId', true), queryParamDef('priceFamily', true), queryParamDef('dateFrom', false, isValidDate), queryParamDef('dateTo', false, isValidDate)];
    var result = validateQueryParams(fakeRequest, queryParamsDef);
    expect(result.allValid).toBe(true);
    expect(result.errors.length).toBe(0);
  });

  test('Should fail if params did not comply with the definition. Required params was not provided and invalid case.', function () {
    var queryParamsDef = [queryParamDef('storeid', true), queryParamDef('vendorId', true, invalidValidatorWithParam), queryParamDef('priceFamily', true, invalidValidator), queryParamDef('dateFrom', false, isValidDate), queryParamDef('dateTo', true, invalidValidatorWithParam), queryParamDef('NONEXISTENT', true)];
    var result = validateQueryParams(fakeRequest, queryParamsDef);
    expect(result.allValid).toBe(false);
    expect(result.errors.length).toBe(5);
  });
});
//# sourceMappingURL=validateQueryParams.unit.spec.js.map
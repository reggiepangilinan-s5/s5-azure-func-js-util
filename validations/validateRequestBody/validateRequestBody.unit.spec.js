'use strict';

var moment = require('moment');
var validateRequestBody = require('./validateRequestBody');
var requestBodyProp = require('./requestBodyProp');

var fakeRequest = {
  body: {
    storeId: 'STR001',
    vendorId: 'VND001',
    priceFamily: 'PRC001',
    dateFrom: '2018-03-11',
    dateTo: '2018-03-17',
    zeroValue: 0,
    ignoreThisToo: null
  }
};

var fakeRequestArray = {
  body: [{
    storeId: 'STR001',
    vendorId: 'VND001',
    priceFamily: 'PRC001',
    dateFrom: '2018-03-11',
    dateTo: '2018-03-17',
    zeroValue: 0,
    ignoreThisToo: null
  }, {
    storeId: 'STR002',
    vendorId: 'VND002',
    priceFamily: 'PRC002',
    dateFrom: '2018-03-11',
    dateTo: '2018-03-17',
    zeroValue: 0,
    ignoreThisToo: null
  }]
};

var zeroValueValidator = function zeroValueValidator(value) {
  return value >= 0;
};
var isValidDate = function isValidDate(date) {
  return moment(date, 'YYYY-MM-DD').isValid();
};
var invalidValidator = function invalidValidator() {
  return 1 + 1;
};
var invalidValidatorWithParam = function invalidValidatorWithParam(param) {
  return param + ' notboolean';
};

describe('utils/validations/validateRequestBody', function () {
  test('Should pass if req body complied with the definition. All required and All Valid Values', function () {
    var reqBodyDefs = [requestBodyProp('storeId'), requestBodyProp('vendorId'), requestBodyProp('priceFamily'), requestBodyProp('dateFrom', isValidDate), requestBodyProp('dateTo', isValidDate), requestBodyProp('zeroValue', zeroValueValidator, true), requestBodyProp('ignoreThisToo', null, true)];
    var result = validateRequestBody(fakeRequest, reqBodyDefs);
    expect(result.allValid).toBe(true);
    expect(result.errors.length).toBe(0);
  });
  test('Should fail if req body did not comply with the definition. Invalid validators passed.', function () {
    var reqBodyDefs = [requestBodyProp('storeid'), requestBodyProp('vendorId', invalidValidatorWithParam), requestBodyProp('priceFamily', invalidValidator), requestBodyProp('dateFrom', isValidDate), requestBodyProp('dateTo', invalidValidatorWithParam), requestBodyProp('zeroValue', zeroValueValidator, true), requestBodyProp('ignoreThisToo', null, true), requestBodyProp('NONEXISTENT')];
    var result = validateRequestBody(fakeRequest, reqBodyDefs);
    expect(result.allValid).toBe(false);
    expect(result.errors.length).toBe(5);
  });

  test('Should fail if req body is not passed', function () {
    var reqBodyDefs = [requestBodyProp('storeid'), requestBodyProp('vendorId', invalidValidatorWithParam), requestBodyProp('priceFamily', invalidValidator), requestBodyProp('dateFrom', isValidDate), requestBodyProp('dateTo', invalidValidatorWithParam), requestBodyProp('zeroValue', null, false), requestBodyProp('ignoreThisToo', null, true), requestBodyProp('NONEXISTENT')];
    var result = validateRequestBody({ body: null }, reqBodyDefs);
    expect(result.allValid).toBe(false);
    expect(result.errors.length).toBe(1);
  });

  test('Should fail if req body is empty', function () {
    var reqBodyDefs = [requestBodyProp('storeid'), requestBodyProp('vendorId', invalidValidatorWithParam), requestBodyProp('priceFamily', invalidValidator), requestBodyProp('dateFrom', isValidDate), requestBodyProp('dateTo', invalidValidatorWithParam), requestBodyProp('zeroValue', null, false), requestBodyProp('ignoreThisToo', null, true), requestBodyProp('NONEXISTENT')];
    var result = validateRequestBody({ body: {} }, reqBodyDefs);
    expect(result.allValid).toBe(false);
  });

  test('Should pass if req body array complied with the definition. All required and All Valid Values', function () {
    var reqBodyDefs = [requestBodyProp('storeId'), requestBodyProp('vendorId'), requestBodyProp('priceFamily'), requestBodyProp('dateFrom', isValidDate), requestBodyProp('dateTo', isValidDate), requestBodyProp('zeroValue', zeroValueValidator, true), requestBodyProp('ignoreThisToo', null, true)];
    var result = validateRequestBody(fakeRequestArray, reqBodyDefs);
    expect(result.allValid).toBe(true);
  });

  test('Should fail if req body did not comply with the definition. Invalid validators passed.', function () {
    var reqBodyDefs = [requestBodyProp('storeid'), requestBodyProp('vendorId', invalidValidatorWithParam), requestBodyProp('priceFamily', invalidValidator), requestBodyProp('dateFrom', isValidDate), requestBodyProp('dateTo', invalidValidatorWithParam), requestBodyProp('zeroValue', zeroValueValidator, false), requestBodyProp('ignoreThisToo', null, true), requestBodyProp('NONEXISTENT')];
    var result = validateRequestBody(fakeRequestArray, reqBodyDefs);
    expect(result.allValid).toBe(false);
  });
});
//# sourceMappingURL=validateRequestBody.unit.spec.js.map
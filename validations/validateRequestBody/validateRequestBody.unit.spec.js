'use strict';

var validateRequestBody = require('./validateRequestBody');
var requestBodyProp = require('./requestBodyProp');

var _require = require('../../validations'),
    isValidDate = _require.isValidDate;

var fakeRequest = {
  body: {
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

describe('utils/validations/validateRequestBody', function () {
  test('Should pass if req body complied with the definition. All required and All Valid Values', function () {
    var reqBodyDefs = [requestBodyProp('storeId'), requestBodyProp('vendorId'), requestBodyProp('priceFamily'), requestBodyProp('dateFrom', isValidDate), requestBodyProp('dateTo', isValidDate)];
    var result = validateRequestBody(fakeRequest, reqBodyDefs);
    expect(result.allValid).toBe(true);
    expect(result.errors.length).toBe(0);
  });
  test('Should fail if req body did not comply with the definition. Invalid validators passed.', function () {
    var reqBodyDefs = [requestBodyProp('storeid'), requestBodyProp('vendorId', invalidValidatorWithParam), requestBodyProp('priceFamily', invalidValidator), requestBodyProp('dateFrom', isValidDate), requestBodyProp('dateTo', invalidValidatorWithParam), requestBodyProp('NONEXISTENT')];
    var result = validateRequestBody(fakeRequest, reqBodyDefs);
    expect(result.allValid).toBe(false);
    expect(result.errors.length).toBe(5);
  });
});
//# sourceMappingURL=validateRequestBody.unit.spec.js.map
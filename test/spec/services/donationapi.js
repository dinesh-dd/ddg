'use strict';

describe('Service: DonationApi', function () {

  // load the service's module
  beforeEach(module('gePantApp'));

  // instantiate service
  var DonationApi;
  beforeEach(inject(function (_DonationApi_) {
    DonationApi = _DonationApi_;
  }));

  it('should do something', function () {
    expect(!!DonationApi).toBe(true);
  });

});

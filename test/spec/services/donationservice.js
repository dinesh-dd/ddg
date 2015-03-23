'use strict';

describe('Service: DonationService', function () {

  // load the service's module
  beforeEach(module('gePantApp'));

  // instantiate service
  var DonationService;
  beforeEach(inject(function (_DonationService_) {
    DonationService = _DonationService_;
  }));

  it('should do something', function () {
    expect(!!DonationService).toBe(true);
  });

});

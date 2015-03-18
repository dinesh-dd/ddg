'use strict';

describe('Service: MemberApi', function () {

  // load the service's module
  beforeEach(module('gePantApp'));

  // instantiate service
  var MemberApi;
  beforeEach(inject(function (_MemberApi_) {
    MemberApi = _MemberApi_;
  }));

  it('should do something', function () {
    expect(!!MemberApi).toBe(true);
  });

});

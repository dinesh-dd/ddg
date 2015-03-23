'use strict';

describe('Service: PreloadService', function () {

  // load the service's module
  beforeEach(module('gePantApp'));

  // instantiate service
  var PreloadService;
  beforeEach(inject(function (_PreloadService_) {
    PreloadService = _PreloadService_;
  }));

  it('should do something', function () {
    expect(!!PreloadService).toBe(true);
  });

});

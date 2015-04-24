'use strict';

describe('Controller: LoginerrorCtrl', function () {

  // load the controller's module
  beforeEach(module('gePantApp'));

  var LoginerrorCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LoginerrorCtrl = $controller('LoginerrorCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});

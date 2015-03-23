'use strict';

describe('Controller: CollectorprofileCtrl', function () {

  // load the controller's module
  beforeEach(module('gePantApp'));

  var CollectorprofileCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CollectorprofileCtrl = $controller('CollectorprofileCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});

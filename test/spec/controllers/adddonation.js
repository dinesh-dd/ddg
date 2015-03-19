'use strict';

describe('Controller: AdddonationCtrl', function () {

  // load the controller's module
  beforeEach(module('gePantApp'));

  var AdddonationCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdddonationCtrl = $controller('AdddonationCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});

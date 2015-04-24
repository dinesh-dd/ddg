'use strict';

describe('Controller: CollectorsCtrl', function () {

  // load the controller's module
  beforeEach(module('gePantApp'));

  var CollectorsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CollectorsCtrl = $controller('CollectorsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});

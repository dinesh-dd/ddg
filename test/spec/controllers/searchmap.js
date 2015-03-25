'use strict';

describe('Controller: SearchmapCtrl', function () {

  // load the controller's module
  beforeEach(module('gePantApp'));

  var SearchmapCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SearchmapCtrl = $controller('SearchmapCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});

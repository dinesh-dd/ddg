'use strict';

describe('Controller: HelpCtrl', function () {

  // load the controller's module
  beforeEach(module('gePantApp'));

  var TopnavCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TopnavCtrl = $controller('HelpCtrl', {
      $scope: scope
    });
  }));

  it('help list should contain the 6 nav values', function () {
    expect(scope.navs.length).toBe(6);
  });
});

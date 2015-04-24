'use strict';

describe('Controller: LogindonationCtrl', function () {

  // load the controller's module
  beforeEach(module('gePantApp'));

  var LogindonationCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LogindonationCtrl = $controller('LogindonationCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});

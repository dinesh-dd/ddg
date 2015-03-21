'use strict';

describe('Controller: DonationrequestCtrl', function () {

  // load the controller's module
  beforeEach(module('gePantApp'));

  var DonationrequestCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DonationrequestCtrl = $controller('DonationrequestCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});

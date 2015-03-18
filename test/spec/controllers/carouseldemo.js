'use strict';

describe('Controller: CarouselDemoCtrl', function () {

  // load the controller's module
  beforeEach(module('gePantApp'));

  var CarouseldemoctrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CarouseldemoctrlCtrl = $controller('CarouselDemoCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.slides.length).toBe(4);
  });
});

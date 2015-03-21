'use strict';

describe('Directive: panelStepStatus', function () {

  // load the directive's module
  beforeEach(module('gePantApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<panel-step-status></panel-step-status>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the panelStepStatus directive');
  }));
});

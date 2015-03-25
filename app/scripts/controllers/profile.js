'use strict';

/**
 * @ngdoc function
 * @name gePantApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the gePantApp
 */
angular.module('gePantApp')
  .controller('ProfileCtrl', function ($scope,$state,$rootScope,UserService) {
    	$scope.$state = $state;
  });

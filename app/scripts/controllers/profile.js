'use strict';

/**
 * @ngdoc function
 * @name gePantApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the gePantApp
 */
angular.module('gePantApp')
  .controller('ProfileCtrl', function ($scope,$state) {
    	//insert the $state in the profile
    	$scope.$state = $state;
    	$scope.notification = true;
  });

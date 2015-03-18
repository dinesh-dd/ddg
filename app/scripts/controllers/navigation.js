'use strict';

/**
 * @ngdoc function
 * @name gePantApp.controller:NavigationCtrl
 * @description
 * # NavigationCtrl
 * Controller of the gePantApp
 */
angular.module('gePantApp')
  	.controller('NavigationCtrl', function ($scope) {
    	$scope.userLogedIn = false;
    	$scope.user = {
    			Name:'dinesh'
    	};
    	$scope.setUserLogin= function(isLoggedIn){
    		$scope.userLogedIn = isLoggedIn;
    	};
  	});

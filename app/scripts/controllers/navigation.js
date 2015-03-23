'use strict';

/**
 * @ngdoc function
 * @name gePantApp.controller:NavigationCtrl
 * @description
 * # NavigationCtrl
 * Controller of the gePantApp
 */
angular.module('gePantApp')
  	.controller('NavigationCtrl',[ '$scope','$rootScope','UserService', function ($scope,$rootScope,UserService) {
		$scope.setLanguage = function(language){
		  	UserService.setLanguage(language); 
		}
  	}]);

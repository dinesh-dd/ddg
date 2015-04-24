'use strict';

/**
 * @ngdoc function
 * @name gePantApp.controller:LoginerrorCtrl
 * @description
 * # LoginerrorCtrl
 * Controller of the gePantApp
 */
angular.module('gePantApp')
	.controller('LoginerrorCtrl', function ($scope,modalService) {
		$scope.openLoginModal= function(){
            modalService.openModal('login','LoginCtrl');
        }    
	});

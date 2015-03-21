'use strict';

/**
 * @ngdoc function
 * @name gePantApp.controller:LogoutCtrl
 * @description
 * # LogoutCtrl
 * Controller of the gePantApp
 */
angular.module('gePantApp')
  .controller('LogoutCtrl', function ($scope,$rootScope,$state,$cookieStore,UserService,$timeout) {
    	$scope.u={};
    	var logout = function(){
            $rootScope.user = {
            	userLogedIn : false
            }

            $timeout(function() {
                $scope.modalInstance.close();
                $state.go('home');
            }, 1000);
    	}
	    
    	$scope.logout =function(){
    		UserService.logout({});
    		$cookieStore.remove("token");
   //  		angular.forEach($cookies, function (v, k) {
			//     $cookieStore.remove("token");
			// });
			logout();
    	}
  });

'use strict';

/**
 * @ngdoc function
 * @name gePantApp.controller:LogoutCtrl
 * @description
 * # LogoutCtrl
 * Controller of the gePantApp
 */
angular.module('gePantApp')
  .controller('LogoutCtrl', function ($scope,$rootScope,$state,$cookieStore,UserService,$timeout,Facebook,$modalInstance) {
        $scope.modalInstance = $modalInstance;
    	$scope.u={};
    	var logout = function(){
            var language = $rootScope.user.language;
            $rootScope.user = {
            	userLogedIn : false,
                language:language
            }

            $timeout(function() {
                $scope.modalInstance.close();
                $state.go('home');
            }, 1000);
    	}
	    
    	$scope.logout =function(){
    		UserService.logout({});
    		$cookieStore.remove("token");
			logout();
            Facebook.logout();
    	}

  });

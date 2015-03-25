'use strict';

/**
 * @ngdoc function
 * @name gePantApp.controller:EditprofileCtrl
 * @description
 * # EditprofileCtrl
 * Controller of the gePantApp
 */
angular.module('gePantApp')
  .controller('EditprofileCtrl', function ($scope,$rootScope,UserService) {
  		$scope.profileStatus = '';
    	$scope.editProfile = function(){
            $scope.profileStatus = 'trying';
    		console.log('inside update profile');
            var request = {
                success:function(){
                    $scope.profileStatus = 'success';
                },
                error:function(){
                    $scope.profileStatus = 'error';
                },
                data:{
                    'user[username]':$rootScope.user.name,
                    'user[street_address]':$rootScope.user.street_address,
                    'user[latitude]':34.720274,
                    'user[longitude]':-82.387006,
                    'user[pledge]':$rootScope.user.pledge,
                    'user[objective]':$rootScope.user.objective,
                    'user[organization_name]':$rootScope.user.organization_name
                }
            }
    		UserService.editProfile(request);
    	}
  });

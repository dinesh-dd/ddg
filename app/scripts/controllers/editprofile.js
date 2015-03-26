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
        //TODO have to set the watch here
        var u = $rootScope.user;
        $scope.u = {
            'name':u.name,
            'street_address':u.street_address,
            'pledge':u.pledge,
            'objective':u.objective,
            'organization_name':u.organization_name,
            'type':u.type
        };
        console.log($scope.u);
    	$scope.editProfile = function(){
            $scope.profileStatus = 'trying';
    		console.log('inside update profile');
            var request = {
                success:function(){
                    //TODO check for the sucess
                    $rootScope.user.name = $scope.u.name;
                    $rootScope.user.street_address = $scope.u.street_address;
                    $rootScope.user.pledge = $scope.u.pledge;
                    $rootScope.user.objective= $scope.u.objective;
                    $rootScope.user.organization_name= $scope.u.organization_name;
                    $scope.profileStatus = 'success';
                },
                error:function(){
                    $scope.profileStatus = 'error';
                },
                data:{
                    'user[username]':$scope.u.name,
                    'user[street_address]':$scope.u.street_address,
                    'user[latitude]':34.720274,
                    'user[longitude]':-82.387006,
                    'user[pledge]':$scope.u.pledge,
                    'user[objective]':$scope.u.objective,
                    'user[organization_name]':$scope.u.organization_name
                }
            }
    		UserService.editProfile(request);
    	}
  });

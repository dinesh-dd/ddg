'use strict';

/**
 * @ngdoc function
 * @name gePantApp.controller:ProfilesettingCtrl
 * @description
 * # ProfilesettingCtrl
 * Controller of the gePantApp
 */
angular.module('gePantApp')
  .controller('ProfilesettingCtrl', function ($scope,UserService,$rootScope) {
    	$scope.setttingStatus = '';
        
    	$scope.updateSettings = function(){
            $scope.setttingStatus = 'trying';
    		console.log('inside update');
            var request = {
                success:function(){
                    $scope.setttingStatus = 'success';
                },
                error:function(){
                    $scope.setttingStatus = 'error';
                },
                data:{
                    email_setting:$rootScope.user.email_setting
                }
            }
    		UserService.updateSetting(request);
    	}
  });
'use strict';

/**
 * @ngdoc function
 * @name gePantApp.controller:ChangepasswordCtrl
 * @description
 * # ChangepasswordCtrl
 * Controller of the gePantApp
 */
angular.module('gePantApp')
    .controller('ChangepasswordCtrl', function($scope,$timeout,UserService) {
    	
    	$scope.status = "";
    	
    	$scope._setStatus = function(status){
    		$scope.status = status;
        	$timeout(function(){
        		$scope.status = "";	
        	},5000);
    	}

    	$scope.changePassword = function(){ 
    		console.info('Inside the forgotPassword');
    		$scope.status = "trying";
	        UserService.changePassword({
	            success: function(response) {
	            	console.log('inside the success');
	            	$scope._setStatus("success");
	            },
	            error: function(response) {
	            	console.log('inside the error');
	                $scope._setStatus("error");
	            },
	            data:{
	            	'user[current_password]':$scope.u.oldPassword,
	            	'user[password]':$scope.u.newPassword,
	            	'user[password_confirmation]':$scope.u.confirmPassword
	            }
	        });
	    }

    });

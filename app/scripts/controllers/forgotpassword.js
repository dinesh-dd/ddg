'use strict';

/**
 * @ngdoc function
 * @name gePantApp.controller:ForgotpasswordCtrl
 * @description
 * # ForgotpasswordCtrl
 * Controller of the gePantApp
 */
angular.module('gePantApp')
    .controller('ForgotpasswordCtrl', function($scope,$timeout,UserService) {
    	
    	$scope.status = "";
    	
    	$scope._setStatus = function(status){
    		$scope.status = status;
        	$timeout(function(){
        		$scope.status = "";	
        	},5000);
    	}

    	$scope.forgotPassword = function(){ 
    		console.info('Inside the forgotPassword');
    		$scope.status = "trying";
	        UserService.forgotPassword({
	            success: function(response) {
	            	console.log('inside the success');
	            	$scope._setStatus("success");
	            },
	            error: function(response) {
	            	console.log('inside the error');
	                $scope._setStatus("error");
	            },
	            data:{
	            	email:$scope.u.email
	            }
	        });
	    }

    });

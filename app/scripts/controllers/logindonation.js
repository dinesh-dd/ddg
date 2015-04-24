'use strict';

/**
 * @ngdoc function
 * @name gePantApp.controller:LogindonationCtrl
 * @description
 * # LogindonationCtrl
 * Controller of the gePantApp
 */
angular.module('gePantApp')
	.controller('LogindonationCtrl',['$scope','UserService','$timeout','$state','Facebook','$rootScope','modalService',function($scope,UserService,$timeout,$state,Facebook,$rootScope,modalService) {
		$scope.u={};
	    var functions = {
		    trying: function() {
	            $scope.status = 'trying', 
	            $scope.loginError = !1;
	        },
	        success: function(response) {
	            var user = response.data.profileData;
	            if (user.type=="Collector"){
	            	$scope.status = 'collectorError';	
	            } else {
	            	$scope.status = 'success';
	            	UserService.setUser(user);
	            }
	        },
	        error: function() {
	            $scope.status = 'error';
	            $scope.loginError = !0;
	        }
        };

        
        //login 
    	$scope.tryLogin =function(){
    		debugger;
    		console.error('yes i m here');
    		functions.trying();
            var user = {
                data : {
                    "email":$scope.u.email,
                    "password":$scope.u.password
                }
            };
            var b = angular.extend(user, functions);
    		UserService.login(b);
    	}

        //login with facebook 
        $scope.tryFbLogin = function() {
            functions.trying();
            Facebook.login(function(response) {
                if (response.status == "connected") {
                    console.log(response);
                     var user = {
                        data : {
                            'user[fb_auth_token]':response.authResponse.accessToken,
                        }
                    };
                    var b = angular.extend(user, functions);
                    UserService.loginByFacebook(b); 
                } else {
                    functions.error();  
                }
            },{scope: 'email'});
        }

      //functions related to facebook
      $scope.getLoginStatus = function() {
        Facebook.getLoginStatus(function(response) {
            if(response.status === 'connected') {
                $scope.fbloggedIn = true;
            } else {
                $scope.fbloggedIn = false;
            }
        });
      };

      $scope.me = function() {
          Facebook.api('/me', function(response) {
              $scope.user = response;
          });
      };
    }]);


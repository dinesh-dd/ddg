'use strict';

/**
 * @ngdoc function
 * @name gePantApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the gePantApp
 */
angular.module('gePantApp')
	.controller('LoginCtrl',['$scope','UserService','$timeout','$state','Facebook','$rootScope','$modalInstance','modalService',function($scope,UserService,$timeout,$state,Facebook,$rootScope,$modalInstance,modalService) {
        $scope.modal= function(name){
            switch(name){
                case 'signup':
                    modalService.openModal(name,'SignupCtrl');        
                    break;
                case 'forgotpassword':
                    modalService.openModal(name,'ForgotpasswordCtrl');        
                    break;
            }
        }
        $scope.modalInstance = $modalInstance;
		$scope.u={};
	    var functions = {
		    trying: function() {
	            $scope.status = 'trying', 
	            $scope.loginError = !1;
	        },
	        success: function(b) {
	            $scope.status = 'success';

                //set the root scope data
                UserService.setUser(b.data.profileData);

                //remove the modal after sometimeout
	            $timeout(function() {
                    $scope.modalInstance.close();
                    $timeout(function() {
                        //go to profile view after sometime
                        $state.go('profile');
                    },200);
	            }, 1000);
	        },
	        error: function() {
	            $scope.status = 'error';
	            $scope.loginError = !0;
	        }
        };
    	// console.log('this is inside the login controller'+ $scope.u);

        /**
         * @method gotoSignUp 
         * function to go to login state 
         */
        $scope.changeModal= function(name){
            console.log('inside goto signup');
            $scope.$close();
            setTimeout(function() {
                $scope.modal(name);    
            }, 400);
        };
      
        //login 
    	$scope.tryLogin =function(){
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
                    var user = {
                        data : {
                            'user[fb_auth_token]':response.authResponse.accessToken,
                            'user[language]':$rootScope.user.language,
                            'user[type]':'Doner',
                        }
                    };
                    var b = angular.extend(user, functions);
                    UserService.signUpByFacebook(b); 
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


'use strict';

/**
 * @ngdoc function
 * @name gePantApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the gePantApp
 */
angular.module('gePantApp')
    // .controller('LoginCtrl',["$scope", "$rootScope", "UserService", "$modalInstance", "$timeout", function($scope, $rootScope, UserService, $modalInstance, $timeout) {
    // 	$scope.u = {}, $scope.status;
    //     var f = {trying: function() {
    //             $scope.status = "trying", $scope.loginError = !1
    //         },success: function(b) {
    //             $scope.status = "success", e(function() {
    //                 d.close(b)
    //             }, 1e3)
    //         },error: function() {
    //             $scope.status = "error", $scope.loginError = !0
    //         }};
    //     $scope.tryLogin = function() {
    //         f.trying();
    //         var b = angular.extend($scope.u, f);
    //         c.login(b)
    //     }, $scope.tryFbLogin = function() {
    //         f.trying(), c.loginByFacebook(f)
    //     }
    // }]);
	.controller('LoginCtrl',['$scope','UserService','$timeout','$location','$state','Facebook',function($scope,UserService,$timeout,$location,$state,Facebook) {
		$scope.u={};
        console.log($scope);
        console.log();
	    var functions = 
	    {
		    trying: function() {
	            $scope.status = 'trying', 
	            $scope.loginError = !1;
	        },
	        success: function(b) {
	        	console.log('inside the success');
	            $scope.status = 'success';
	            $timeout(function() {
                    $scope.modalInstance.close();
                    $timeout(function() {
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
      
      //login api 
    	$scope.tryLogin =function(){
    		functions.trying();
    		var b = angular.extend($scope.u, functions);
    		UserService.login(b);
    	}

      //login with facebook 
      $scope.tryFbLogin = function() {
            functions.trying();
            // UserService.loginByFacebook(functions);
            Facebook.login(function(response) {
                if (response.status == "connected") {
                    console.log(response);
                    functions.success();  
                } else {
                    functions.error();  
                }
            });
      }

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


// .config(function(FacebookProvider) {
//      // Set your appId through the setAppId method or
//      // use the shortcut in the initialize method directly.
//      FacebookProvider.init('YOUR_APP_ID');
//   })

  // .controller('authenticationCtrl', function($scope, Facebook) {

  //   $scope.login = function() {
  //     // From now on you can use the Facebook service just as Facebook api says
  //     Facebook.login(function(response) {
  //       // Do something with response.
  //     });
  //   };

  //   $scope.getLoginStatus = function() {
  //     Facebook.getLoginStatus(function(response) {
  //       if(response.status === 'connected') {
  //         $scope.loggedIn = true;
  //       } else {
  //         $scope.loggedIn = false;
        // }
  //     });
  //   };

  //   $scope.me = function() {
  //     Facebook.api('/me', function(response) {
  //       $scope.user = response;
  //     });
  //   };
  // });
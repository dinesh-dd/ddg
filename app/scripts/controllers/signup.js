'use strict';

/**
 * @ngdoc function
 * @name gePantApp.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the gePantApp
 */
angular.module('gePantApp')
    .controller('SignupCtrl', ['$scope', 'UserService', '$timeout', '$location', '$state', 'Facebook','$rootScope', function($scope, UserService, $timeout, $location, $state, Facebook,$rootScope) {
        $scope.u = {}
        $scope.u.type = 'Doner';
       	
       	 //FIXME remove this fixed data as soon as possible
        $scope.u.name = 'dinesh';
        $scope.u.email = 'dinesh@complitech.net';
        $scope.u.password = '12345678aA';
       
        var functions = {
            trying: function() {
                $scope.status = 'trying',
                $scope.loginError = !1;
            },
            success: function(b) {
                $scope.status = 'success';
                //set the root scope data
                $rootScope.user = b.data.profileData;
                $rootScope.user.userLogedIn = true;

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
        
        //signup
        //FIXME set the language here
        $scope.createAccount = function() {
            functions.trying();
            var user = {
                data : {
                    "user[username]":$scope.u.name,
                    "user[language]":'English',
                    "user[type]":$scope.u.type,
                    "user[organization_name]":$scope.u.orgnr,
                    "user[email]":$scope.u.email,
                    "user[password]":$scope.u.password
                }
            };
            var b = angular.extend(user, functions);
            UserService.createUser(b);
        }

        //Facebook Login
        $scope.tryFbLogin = function() {
            functions.trying();
            Facebook.login(function(response) {
                if (response.status == "connected") {
                    var user = {
                        data : {
                            'user[fb_auth_token]':response.authResponse.accessToken,
                            'user[language]':'English',
                            'user[type]':'Doner'
                        }
                    };
                    var b = angular.extend(user, functions);
                    UserService.loginByFacebook(b); 
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
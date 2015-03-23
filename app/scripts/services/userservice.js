'use strict';

/**
 * @ngdoc service
 * @name gePantApp.UserService
 * @description
 * # UserService
 * Service in the gePantApp.
 */
angular.module('gePantApp')
	.service("UserService", ["MemberApi","$rootScope","$window", function(MemberApi,$rootScope,$window) {
        var validateUser = function(user,response,d){
            //TODO check for the user errors
            console.log('validation of user');
            if(response.result.rstatus==0){
                return user.error(response, d);
            } else {
                return user.success(response, d);    
            }
        }
        var setLanguage = function(language){
            debugger;   
            var returnLanguage = null;
            switch(language){
                case 'en-US':
                case 'English':
                    returnLanguage = 'English';
                    break;
                case 'sv':
                case 'Swidish':
                    returnLanguage = 'Swidish';
                    break;
                default:
                    returnLanguage = 'English';
                    break;
            }
            $rootScope.user.language = returnLanguage;
        }
        var c = {};
        return c = {
            setLanguage: setLanguage,
            setUser:function(user){
                if ( typeof user == "object" ){
                    //TODO set the object here 
                } else {
                    $rootScope.user = {
                        userLogedIn:false
                    } 
                    // setLanguage($window.navigator.language);
                    setLanguage('sv');
                }
            },
        	login: function(user) {
                typeof user  == "object"  && MemberApi.login(user.data,user, function(a, d) {
                  	validateUser(user,a,d);
                }, user.error)
            },
            session: function(user){
                typeof user  == "object"  && MemberApi.current({},user, function(a, d) {
                    validateUser(user,a,d);
                }, user.error)
            },
            loginByFacebook: function(user) {
                typeof user  == "object"  && MemberApi.loginByFacebook(user.data,user,function(a, d) {
                    validateUser(user,a,d);
                }, user.error)
            },
            createUser:function(user){
                typeof user  == "object"  && MemberApi.create(user.data,user, function(a, d) {
                    validateUser(user,a,d);
                }, user.error)
            },
            logout:function(user){
                typeof user  == "object"  && MemberApi.logout(user, function(a, d) {
                    console.log('getting success in logout');
                }, user.error);
            }
        }
    }]);
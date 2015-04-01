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
            signUpByFacebook:function(user) {
                typeof user  == "object"  && MemberApi.signUpByFacebook(user.data,user,function(a, d) {
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
            },
            updateSetting:function(user){
                typeof user  == "object"  && MemberApi.updateSetting(user.data,user, function(a, d) {
                    validateUser(user,a,d);
                }, user.error)
            },
            editProfile:function(user){
                typeof user  == "object"  && MemberApi.editProfile(user.data,user, function(a, d) {
                    validateUser(user,a,d);
                }, user.error)  
            },
            language_setting:function(user){
                typeof user  == "object"  && MemberApi.language_setting(user.data,user, function(a, d) {
                    validateUser(user,a,d);
                }, user.error)  
            }
        }
    }]);
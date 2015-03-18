'use strict';

/**
 * @ngdoc service
 * @name gePantApp.UserService
 * @description
 * # UserService
 * Service in the gePantApp.
 */
angular.module('gePantApp')
  // .service("UserService", ["MemberApi", "Facebook", "_", function(a, b) {
  //       var c = {};
  //       return c = {isChecked: function() {
  //               return "undefined" != typeof c.isLogged()
  //           },isLogged: function() {
  //               return c.IsValidAndExists
  //           },state: function() {
  //               return c.isChecked() ? c.isLogged() ? "connected" : "disconnected" : "unknown"
  //           },refresh: function() {
  //               a.current(function(a) {
  //                   angular.extend(c, a), "function" == typeof arguments && func(a)
  //               })
  //           },login: function(user) {
  //               "object" == typeof user && a.login(user, function(a, d) {
  //               	//if user exists then return success	
  //               	user.success(a, d);
  //                   // a.IsValidAndExists ? (user.preventUserRefresh || (c = angular.extend(c, a)), user.success && user.success(a, d)) : user.error && user.error(a, d)
  //               }, user.error)
  //           },loginByFacebook: function(d) {
  //               b.login({error: d.error,success: function(b) {
  //                       log(b.authResponse.accessToken);
  //                       var e = {properties: d.properties || {}};
  //                       e.properties.accessToken = b.authResponse.accessToken, a.loginByFacebook(e, function(a, b) {
  //                           a.IsValidAndExists ? (d.preventUserRefresh || (c = angular.extend(c, a)), d.success && d.success(a, b)) : d.error && d.error(a, b)
  //                       }, d.error)
  //                   }})
  //           },logout: function(b) {
  //               var c = "function" == typeof b ? b : "object" == typeof b ? b.success : function() {
  //               };
  //               a.logout(function(a, b) {
  //                   c(a, b)
  //               })
  //           }}
  //   }]);
	.service("UserService", ["MemberApi","Facebook", function(MemberApi,Facebook) {
        var c = {};
        return c = {
        	login: function(user) {
                typeof user  == "object"  && MemberApi.login(user, function(a, d) {
                	user.success(a, d);
                 // // a.IsValidAndExists ? (user.preventUserRefresh || (c = angular.extend(c, a)), user.success && user.success(a, d)) : user.error && user.error(a, d)
                }, user.error)
            },
            loginByFacebook: function(user) {
                // return user.success();
                Facebook.login(function(response) {
                        console.log('this is inside the rsponse');
                        console.log(response);
                        // log(response.authResponse.accessToken);
                        return user.success();
                        // var e = {properties: d.properties || {}};
                        // e.properties.accessToken = b.authResponse.accessToken, a.loginByFacebook(e, function(a, b) {
                        //     a.IsValidAndExists ? (d.preventUserRefresh || (c = angular.extend(c, a)), d.success && d.success(a, b)) : d.error && d.error(a, b)
                        // }, d.error)
                })
            }
        }
    }]);
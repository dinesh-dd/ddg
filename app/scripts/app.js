'use strict';
// var apiUrl  = 'http://192.168.1.35/WorkSpace/OfficeWork/GPent/GePant/app/api/'
/**
 * @ngdoc overview
 * @name gePantApp
 * @description
 * # gePantApp
 *
 * Main module of the application.
 */
angular
    .module('gePantApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'ui.router',
        'ui.bootstrap',
        'ncy-angular-breadcrumb',
        'facebook',
        'ngCookies',
        'frapontillo.bootstrap-switch'
    ])
    .run(function($rootScope) {
        $rootScope.user = {
            userLogedIn:false
        }
    })
    .run(function(UserService,$rootScope) {
        console.log('inside the enter');
        var response = {
            success : function(response){
                console.log('success');
                $rootScope.user = response.data.profileData;
                $rootScope.user.userLogedIn = true;
            },
            error : function(response){
                console.log('failure');
                $rootScope.user = {
                    userLogedIn:false
                }
            }
        }
        UserService.session(response)
    })
    .config(['$animateProvider',function ($animateProvider) {
        $animateProvider.classNameFilter(/carousel/);
    }])
    .config(function(FacebookProvider) {
        FacebookProvider.init('782192585167151');
    })
    .config(function($httpProvider) {
        $httpProvider.defaults.headers.post  = {'Content-Type': 'application/x-www-form-urlencoded'};
    });
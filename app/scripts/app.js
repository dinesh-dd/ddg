'use strict';
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
		'toggle-switch',
		'underscore',
		'LocalStorageModule',
		'pascalprecht.translate'
		//'frapontillo.bootstrap-switch',
	])

	.run(function(UserService) {
		UserService.setUser();
	})
	.run(function(UserService,$rootScope,$cookieStore) {
		console.log($cookieStore.get("token"));
		console.log('Entering the app');
		var response = {
			success : function(response){
				console.log('success on session');
				console.log(response.data.profileData);
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

	.config(function($translateProvider) {
		$translateProvider.useStaticFilesLoader({
			prefix: './languages/',
			suffix: '.json'
		});
		$translateProvider.preferredLanguage('en');
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

var mergedParams = [];

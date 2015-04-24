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
	])

	/**
	 * set the breadcrumb from here
	 */
	.run(function($rootScope,modalService) {
		function findName(currentLink){
			var linkMap = {
				'om-gepant.hur-funkar-det':'help.navigation.howWork',
				'om-gepant.vill-du-donera-pant':'help.navigation.wantToDonate',
				'om-gepant.vill-du-samla-pant':'help.navigation.collectPledge',
				'om-gepant.varfoer-ge-pant':'help.navigation.whyGive',
				'om-gepant.vilka-aer-vi':'help.navigation.whoWe',
				'om-gepant.press':'help.navigation.press',
				'profile.setting':'navigation.setting',
				'profile.edit':'navigation.editProfile',
				'profile.collections':'navigation.collections',
				'profile.donations':'navigation.donations',
				'profile.donationRequest':'navigation.donationRequest'
			}
			return linkMap[currentLink] || '';
		}
		$rootScope.$on('$stateChangeStart', 
        	function(event, toState, toParams, fromState, fromParams){ 
              	console.log('current state text is::'+$rootScope.currentLink);
              	$rootScope.currentLink = findName(toState.name);
        	});
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
		$httpProvider.defaults.transformRequest = function(data){
			if(data === undefined){
				return data;
			} else if (typeof(data.data) == 'object') {
	        	data.data = $.param(data.data);
	        	return data.data;
	        } else {
	        	return data;
	        }
	    }
	});



//Globle variables 
var mergedParams = [];
var languageCode = {
    'English':'en',
    'Swedish':'sv'
}
function setImageFullPath(imagePath){
	if(imagePath){
		return GLOBALS.url+ imagePath;
	} else {
		return 'images/avtar.jpg';
	}
}
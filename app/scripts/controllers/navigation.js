'use strict';

/**
 * @ngdoc function
 * @name gePantApp.controller:NavigationCtrl
 * @description
 * # NavigationCtrl
 * Controller of the gePantApp
 */
angular.module('gePantApp')
  	.controller('NavigationCtrl',[ '$scope','$rootScope','UserService','$translate', function ($scope,$rootScope,UserService,$translate) {
	    var languageCode = {
            'English':'en',
            'Swidish':'sv'
        }

    	$scope.setLanguage = function(language){
            $translate.use(languageCode[language]);
		  	UserService.setLanguage(language); 
    		var request = {
    			success:function(){
    				console.log('getting success in changing the data')
    			},
    			error:function(){
    				console.log('getting error in changing the data')
    			},
    			data:{
    				'user[language]':$rootScope.user.language
    			}
    		}
            if($rootScope.user.userLogedIn){
                UserService.language_setting(request);    
            }
    	}

  	}]);

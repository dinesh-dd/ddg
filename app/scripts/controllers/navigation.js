'use strict';

/**
 * @ngdoc function
 * @name gePantApp.controller:NavigationCtrl
 * @description
 * # NavigationCtrl
 * Controller of the gePantApp
 */
angular.module('gePantApp')
  	.controller('NavigationCtrl',[ '$scope','$rootScope','UserService','$translate','$timeout','modalService', function ($scope,$rootScope,UserService,$translate,$timeout,modalService) {
        $scope.modal= function(name){
            switch(name){
                case 'login':
                    modalService.openModal(name,'LoginCtrl');        
                    break;
                case 'signup':
                    modalService.openModal(name,'SignupCtrl');        
                    break;
                case 'logout':
                    modalService.openModal(name,'LogoutCtrl');        
                    break;
            }
        }
        $scope.loadStatus = '';
        function setIcon(icon){
            $scope.loadStatus = icon;
            $timeout(function(){   
                $scope.loadStatus = "";
            },2000);
        }
    	$scope.setLanguage = function(language){
            if ($rootScope.user.language == language){
                return;
            }
            var previousLang = $rootScope.user.language;
            console.log(previousLang);
            $scope.loadStatus = 'loading';
		  	UserService.setLanguage(language); 
    		var request = {
    			success:function(){
                    setIcon('success');
                    $translate.use(languageCode[language]);
    				console.log('getting success in changing the data');
    			},
    			error:function(){
                    setIcon('error');
                    console.log(previousLang);
                    UserService.setLanguage(previousLang); 
    				console.error('getting error in changing the data');
    			},
    			data:{
    				'user[language]':$rootScope.user.language
    			}
    		}
            if($rootScope.user.userLogedIn){
                UserService.language_setting(request);    
            } else {
                setIcon('success');
            }
    	}

  	}]);

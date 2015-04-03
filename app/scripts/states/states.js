'use strict';

angular.module('gePantApp')
.config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $urlRouterProvider.when('/om-gepant','om-gepant/omGepant');
        $stateProvider
        .state('app', {
            url: '',
            abstract: true,
            resolve: {
                user: function($http,$rootScope,UserService) {
                    // //return $http.get('http://httpbin.org/delay/5');
                    var request = {
                        success: function(response){
                            $rootScope.user = response.data.data.profileData;
                            $rootScope.user.userLogedIn = true;
                            UserService.setLanguage($rootScope.user.language);
                            return response.data.data.profileData;
                        },
                        error:function(){
                            $rootScope.user = {
                                userLogedIn:false
                            }
                            UserService.setLanguage(null);
                            return null;
                        }
                    }; 
                    return $http.get(GLOBALS.apiUrl+'session_data.json')
                        .then(  
                            function(response){ 
                                 return validateResponse(request,response);
                            }, 
                            function(){ 
                                return request.error;
                            }
                        );
                }
            }
        })
        .state('home', {
            parent:'app',
            url: '/',
            views: {
                'page@': { templateUrl: 'views/home.html' },
                'nav-right@': { 
                    templateUrl : 'views/navigation/navigation.html'
                }
            }
        })

        //collector profile view
        .state('collector', {
            url: '/collector/:id',
            parent:'app',
            views: {
                'page@': { 
                    templateUrl: 'views/collectorProfile.html',
                    controller:'CollectorprofileCtrl'
                 },
                'nav-right@': { 
                    templateUrl : 'views/navigation/navigation.html',
                }
            },
            resolve: {
                collector: function($http,$rootScope,$stateParams) {
                    var request = {
                        success: function(response){
                            return response.data.data.profileData;
                        },
                        error:function(){
                            return null;
                        }
                    }; 
                    return $http({
                            method: "POST",
                            url:GLOBALS.apiUrl+"collector_profile.json",
                            data: 'user[id]='+$stateParams.id
                        }).then(  
                            function(response){
                                return validateResponse(request,response);
                            }, 
                            function(){ 
                                return request.error;
                            }
                        );
                }
            }
        })

        //--------------Model--------------
        .state('modal', {
            abstract: true,
            parent:'home',
            url: 'pop/',
            onEnter: ['$modal', '$state', function($modal, $state) {
                console.log('Open modal');
                $modal.open({
                  template: '<div ui-view="modal"></div>',
                  controller:'PopcontrollerCtrl'
                }).result.finally(function() {
                  $state.go('home');
              });
            }]
          })

          .state('login', {
            url: 'login/',
            parent: 'modal',
            views: {
              'modal@': {
                templateUrl: 'views/login.html',
                controller:'LoginCtrl',
              }
            }
          })

        .state('logout', {
            url: 'logout/',
            parent: 'modal',
            views: {
              'modal@': {
                templateUrl: 'views/logout.html',
                controller:'LogoutCtrl'
              }
            }
        })

        .state('signup', {
            url: 'signup/',
            parent: 'modal',
            views: {
              'modal@': {
                templateUrl: 'views/signup.html',
                controller:'SignupCtrl'
              }
            }
        })
        
        .state('addDonation', {
            url: 'addDonation/',
            parent: 'modal',
            views: {
              'modal@': {
                templateUrl: 'views/addDonation.html',
                controller:'AdddonationCtrl'
              }
            }
        })
      });
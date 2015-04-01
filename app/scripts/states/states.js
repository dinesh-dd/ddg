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
                user: function($http,$rootScope) {
                    //return $http.get('http://httpbin.org/delay/5');
                    function setUser(response){
                        debugger;
                        if(typeof(response) == 'object' &&  response.data.result.rstatus != 0){
                            $rootScope.user = response.data.data.profileData;
                            $rootScope.user.userLogedIn = true;
                            console.log($rootScope.user);
                            return response.data.data.profileData;
                        } else {
                            $rootScope.user = {
                                userLogedIn:false
                            }
                            console.log($rootScope.user);
                            return null;
                        }
                    }
                    return $http.get(GLOBALS.apiUrl+'session_data.json')
                        .then(  
                                function(response){ 
                                    return setUser(response);
                                }, 
                                function(){ 
                                    return setUser(null);
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
            url: '/collector',
            views: {
                'page@': { 
                    templateUrl: 'views/collectorProfile.html',
                    controller:'CollectorprofileCtrl'
                 },
                'nav-right@': { 
                    templateUrl : 'views/navigation/navigation.html',
                }
            } 
        })

        //--------------Model--------------
        //TODO add the service for the model
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
angular.module('gePantApp')
.config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $urlRouterProvider.when('/om-gepant','om-gepant/omGepant');
        $stateProvider
        .state('home', {
            url: '/',
            views: {
                'page': { templateUrl: 'views/home.html' },
                'nav-right': { 
                    templateUrl : 'views/navigation/navigation.html',
                }
            },
            onEnter:function(UserService,$rootScope) {
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
            }
        })

        //Login section
        //TODO add the service for the model        
        .state('modal', {
            abstract: true,
            parent: 'home',
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
            // onExit:['$modalInsance',function($moodalInstance){
            //     console.log('on exit');
            // }]
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
        
        //add new donation
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
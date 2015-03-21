angular.module('gePantApp')
.config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider
        .state('home', {
            url: '/',
            views: {
                'page': { templateUrl: 'views/home.html' },
                'nav-right': { templateUrl : 'views/navigation/navigation.html' }
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
              }
            }
        })

        .state('signup', {
            url: 'signup/',
            parent: 'modal',
            views: {
              'modal@': {
                templateUrl: 'views/signup.html',
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
              }
            }
        })

        //profile view 
        .state('profile', {
            url: '/m',
            views: {
                'page': { templateUrl: 'views/profile/profile.html' },
                'nav-right': { templateUrl : 'views/navigation/navigation.html' }
            }
        })
      });
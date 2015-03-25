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
            }
        })

        //collector profile view
        .state('collector', {
            url: '/collector',
            views: {
                'page': { 
                    templateUrl: 'views/collectorProfile.html',
                    controller:'CollectorprofileCtrl'
                 },
                'nav-right': { 
                    templateUrl : 'views/navigation/navigation.html',
                }
            } 
        })

        // .state('pop', {
        //     url: '',
        //     // views: {
        //     //     'modal': { templateUrl: 'views/home.html' },
        //     // }
        // })
        //Login section
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
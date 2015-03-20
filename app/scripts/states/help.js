angular.module('gePantApp').config(function($stateProvider ) {
        $stateProvider  
        .state('om-gepant', {
            url: '/om-gepant',
            views: {
                'page': { 
                    templateUrl: 'views/om-gepant/help.html' ,
                    controller: 'HelpCtrl'
                },
                'nav-right': { templateUrl : 'views/navigation/navigation.html' }
            }
        })
        .state('om-gepant.omGepant', {
            url: '/omGepant',
            templateUrl: 'views/om-gepant/omGepant.html',
            ncyBreadcrumb: {
                label: ' '
            }
        })
        .state('om-gepant.hur-funkar-det', {
            url: '/hur-funkar-det',
            templateUrl: 'views/om-gepant/hur-funkar-det.html',
            ncyBreadcrumb: {
                label: 'hur-funkar-det'
            }
        })
        .state('om-gepant.vill-du-donera-pant', {
            url: '/vill-du-donera-pant',
            templateUrl: 'views/om-gepant/vill-du-donera-pant.html',
            ncyBreadcrumb: {
                label: 'vill-du-donera-pant'
            }
        })
        .state('om-gepant.vill-du-samla-pant', {
            url: '/vill-du-samla-pant',
            templateUrl: 'views/om-gepant/vill-du-samla-pant.html',
            ncyBreadcrumb: {
                label: 'vill-du-samla-pant'
            }
        })
        .state('om-gepant.varfoer-ge-pant', {
            url: '/varfoer-ge-pant',
            templateUrl: 'views/om-gepant/varfoer-ge-pant.html',
            ncyBreadcrumb: {
                label: 'varfoer-ge-pant'
            }
        })
        .state('om-gepant.vilka-aer-vi', {
            url: '/vilka-aer-vi',
            templateUrl: 'views/om-gepant/vilka-aer-vi.html',
            ncyBreadcrumb: {
                label: 'vilka-aer-vi'
            }
        })
        .state('om-gepant.press', {
            url: '/press',
            templateUrl: 'views/om-gepant/press.html',
            ncyBreadcrumb: {
                label: 'press'
            }
        });
    })
   
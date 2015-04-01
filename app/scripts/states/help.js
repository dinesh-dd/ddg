angular.module('gePantApp').config(function($stateProvider ) {
        $stateProvider  
        .state('om-gepant', {
            url: '/om-gepant',
            parent:'app',
            views: {
                'page@': { 
                    templateUrl: 'views/om-gepant/help.html' ,
                    controller: 'HelpCtrl'
                },
                'nav-right@': { templateUrl : 'views/navigation/navigation.html' }
            }
        })
        .state('om-gepant.omGepant', {
            url: '/omGepant',
            templateUrl: 'views/om-gepant/omGepant.html'
        })
        .state('om-gepant.hur-funkar-det', {
            url: '/hur-funkar-det',
            templateUrl: 'views/om-gepant/hur-funkar-det.html'
        })
        .state('om-gepant.vill-du-donera-pant', {
            url: '/vill-du-donera-pant',
            templateUrl: 'views/om-gepant/vill-du-donera-pant.html'
        })
        .state('om-gepant.vill-du-samla-pant', {
            url: '/vill-du-samla-pant',
            templateUrl: 'views/om-gepant/vill-du-samla-pant.html'
        })
        .state('om-gepant.varfoer-ge-pant', {
            url: '/varfoer-ge-pant',
            templateUrl: 'views/om-gepant/varfoer-ge-pant.html'
        })
        .state('om-gepant.vilka-aer-vi', {
            url: '/vilka-aer-vi',
            templateUrl: 'views/om-gepant/vilka-aer-vi.html'
        })
        .state('om-gepant.press', {
            url: '/press',
            templateUrl: 'views/om-gepant/press.html'
        });
    })
   
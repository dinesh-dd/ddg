angular.module('gePantApp').config(function($stateProvider) {
        $stateProvider 
        //FIXME Before going to profile should download some data
        .state('profile', {
            url: '/profile',
            views: {
                'page': {
                    templateUrl: 'views/profile/profile.html',
                    controller:'ProfileCtrl'
                },
                'nav-right': { templateUrl : 'views/navigation/navigation.html' }
            }
        })
        .state('profile.setting', {
            url: '/setting',
            templateUrl: 'views/profile/setting.html'
        })
        .state('profile.edit', {
            url: '/edit',
            templateUrl: 'views/profile/edit.html'
        })
        .state('profile.collections', {
            url: '/collections',
            templateUrl: 'views/profile/collections.html',
            controller:'CollectionsCtrl'
        })
        .state('profile.donations', {
            url: '/donations',
            templateUrl: 'views/profile/donations.html',
            controller:'DonationsCtrl'
        })
        .state('profile.donationRequest', {
            url: '/donationRequests',
            templateUrl: 'views/profile/donationrequest.html',
            controller:'DonationrequestCtrl'
        })
    })
   
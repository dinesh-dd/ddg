'use strict';

angular.module('gePantApp').config(function($stateProvider) {
        $stateProvider 
        .state('profile', {
            url: '/profile',
            parent:'app',
            views: {
                'page@': {
                    templateUrl: 'views/profile/profile.html',
                    controller:'ProfileCtrl'
                },
                'nav-right@': { templateUrl : 'views/navigation/navigation.html' }
            }
        })
        .state('profile.setting', {
            url: '/setting',
            templateUrl: 'views/profile/setting.html',
            controller:'ProfilesettingCtrl'
        })
        .state('profile.edit', {
            url: '/edit',
            templateUrl: 'views/profile/edit.html',
            controller:'EditprofileCtrl'
        })
        .state('profile.collections', {
            url: '/collections',
            templateUrl: 'views/profile/collections.html',
            controller:'CollectionsCtrl'
        })
        .state('profile.donations', {
            url: '/donations',
            templateUrl: 'views/profile/donations.html',
            controller:'DonationsCtrl',
            resolve: {
                donations: function($http) {
                    var request = {
                        success: function(response){
                            return response.data.data.profileData;
                        },
                        error:function(){
                            return null;
                        },
                        data:{
                            page_no:1,
                            limit:10
                        }
                    }; 
                    return $http({
                            method: "POST",
                            url:GLOBALS.apiUrl+"list_of_donations.json",
                            data: $.param(data)
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
        .state('profile.donationRequest', {
            url: '/donationRequests',
            templateUrl: 'views/profile/donationrequest.html',
            controller:'DonationrequestCtrl'
        })
    })
   
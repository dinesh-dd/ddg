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
            controller:'CollectionsCtrl',
            resolve: {
                donations: function($http) {
                    //request object
                    var request = {
                        success: function(response){
                            var donations = {
                                total_page : response.data.total_page,
                                donations : response.data.data.donations
                            }
                            return donations;
                        },
                        error:function(){
                            return null;
                        },
                        data:{
                            page:1,
                            limit:GLOBALS.pageLimit
                        }
                    };

                    //call api  
                    return $http({
                            method: "POST",
                            url:GLOBALS.apiUrl+"my_collections.json",
                            data: $.param(request.data)
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
        .state('profile.donations', {
            url: '/donations',
            templateUrl: 'views/profile/donations.html',
            controller:'DonationsCtrl',
            resolve: {
                donations: function($http) {
                    //request object
                    var request = {
                        success: function(response){
                            var donations = {
                                total_page : response.data.total_page,
                                donations : response.data.data.donations
                            }
                            return donations;
                        },
                        error:function(){
                            return null;
                        },
                        data:{
                            page_no:1,
                            limit:GLOBALS.pageLimit
                        }
                    };

                    //call api  
                    return $http({
                            method: "POST",
                            url:GLOBALS.apiUrl+"list_of_donations.json",
                            data: $.param(request.data)
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
            controller:'DonationrequestCtrl',
            resolve: {
                donations: function($http,DonationApi) {
                    //request object
                    var request = {
                        success: function(response){
                            var donations = {
                                total_page : response.data.total_page,
                                donations : response.data.data.donations
                            }
                            return donations;
                        },
                        error:function(){
                            return null;
                        },
                        data:{
                            page:1,
                            limit:GLOBALS.pageLimit
                        }
                    };

                    //call api  
                    return $http({
                            method: "POST",
                            url:GLOBALS.apiUrl+"donation_requests.json",
                            data: $.param(request.data)
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
    })
   
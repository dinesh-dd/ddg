'use strict';

/**
 * @ngdoc service
 * @name gePantApp.DonationService
 * @description
 * # DonationService
 * Service in the gePantApp.
 */
angular.module('gePantApp')
  .service('DonationService',function(DonationApi,UserService) {
        var c = {};
        return c = {
            findCollectors:function(request){
            	if( request.data.latitude != null){
            		DonationApi.searchCollector(request.data,request, function(response) {
	                	UserService.validateResponse(request,response)
	              }, request.error);	
            	}
            },
            submitRating:function(request){
                DonationApi.submitRating(request.data,request,function(response) {
                    UserService.validateResponse(request,response)
                }, request.error);  
            },
            addDonation:function(request){
                DonationApi.addDonation(request,function(response) {
                    UserService.validateResponse(request,response)
                }, request.error);  
            }
        }
    });

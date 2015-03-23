'use strict';

/**
 * @ngdoc service
 * @name gePantApp.DonationService
 * @description
 * # DonationService
 * Service in the gePantApp.
 */
angular.module('gePantApp')
  .service('DonationService',["DonationApi",function(DonationApi) {
  		  var validateResponse = function(request,response){
            if(response.result.rstatus==0){
                return request.error(response);
            } else {
                return request.success(response);    
            }
        }
        var c = {};
        return c = {
            findCollectors:function(request){
            	if( request.data.lat!= null || request.data.lang != null ){
            		DonationApi.searchCollector(request.data,request, function(respones) {
	                	validateResponse(request)
	              }, request.error);	
            	}
            },
           	getCollector:function(id){
           		if( id!= null ){
            		DonationApi.collector(request.data,request, function(respones) {
	                	validateResponse(request)
	                }, request.error);	
            	}
           	},
           	collectors:function(){
           		//find the collectors
           	},
           	doners:function(){
           		//find the doners
           	},
           	donationRequests:function(){
           		//find the donation requests
           	},
           	donationResponse:function(){
           		//respones to donation requests
           	}
        }
    }]);

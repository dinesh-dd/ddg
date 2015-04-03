'use strict';

/**
 * @ngdoc function
 * @name gePantApp.controller:DonationsCtrl
 * @description
 * # DonationsCtrl
 * Controller of the gePantApp
 */
angular.module('gePantApp')
  .controller('DonationsCtrl', function ($scope,donations,$http) {
  	$scope.donations= donations.donations;
  	$scope.firstLoadError = false;
  	$scope.zeroLength = false;
  	$scope.totalItems = donations.total_page;
	$scope.currentPage = 1;
	$scope.loadingStatus = '';
  	if($scope.donations==null){
  		$scope.loadingStatus = "error";
  	} else if($scope.donations.length==0){
  		$scope.loadingStatus = "zero";
  	}

	$scope.pageChanged = function() {
		$scope.loadingStatus = 'loading'
		var request = {
                        success: function(response){
                        	$scope.loadingStatus = ''
                            $scope.donations = response.data.data.donations;
                        },
                        error:function(){
                        	$scope.loadingStatus = 'error'
                            return null;
                        },
                        data:{
                            page_no:$scope.currentPage,
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
	};
   //  $scope.donations = [
   //  	{
   //  		thing:{
			// 	PlasticBag:2,
			// 	PaperBag:10,
			// 	RefuseSack:0
			// }, 
			// collector_Name : 'Dinesh Dabhi',
			// collector_image : 'http://creativepool.com/marketing/images/minions-1.jpg', 
			// //when status is pending upper two values not be there 
			// location : 'location string',
			// created_at : new Date(),
			// status : 'accepted'
   //  	},
   //  ]
  });

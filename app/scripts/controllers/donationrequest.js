'use strict';

/**
 * @ngdoc function
 * @name gePantApp.controller:DonationrequestCtrl
 * @description
 * # DonationrequestCtrl
 * Controller of the gePantApp
 */
angular.module('gePantApp')
  .controller('DonationrequestCtrl', function ($scope,donations,$http) {
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
                        },
                        data:{
                            page:$scope.currentPage,
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
	};

    function respondDonation(status,id){
    	//TODO remove this from the list and goto next page or previous page if page has no more data		    	
    	
    	var request = {
            success: function(response){
            	$scope.loadingStatus = ''
                $scope.donations = response.data.data.donations;
            },
            error:function(){
            	$scope.loadingStatus = 'error'
            },
            data:{
                id:id,
                status:status
            }
        };
        //call api  
        return $http({
            method: "POST",
            url:GLOBALS.apiUrl+"respond_to_requests.json",
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

    $scope.accept = function(id){
    	console.log('accepted'+id);
    	respondDonation('accepted',id);
    }

    $scope.decline = function(id){
    	console.log('decline'+id)
    	respondDonation('rejected',id);
    }

  });

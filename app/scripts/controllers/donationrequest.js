'use strict';

/**
 * @ngdoc function
 * @name gePantApp.controller:DonationrequestCtrl
 * @description
 * # DonationrequestCtrl
 * Controller of the gePantApp
 */
angular.module('gePantApp')
  .controller('DonationrequestCtrl', function ($scope,donations,$http,_,$timeout,UserService) {
  	$scope.donations= donations.donations;
  	$scope.firstLoadError = false;
  	$scope.zeroLength = false;
  	$scope.totalItems = donations.total_page*GLOBALS.pageLimit;
    console.log($scope.totalItems);
  	$scope.perPage = GLOBALS.pageLimit;
	  $scope.currentPage = 1;
    $scope.loadingStatus = '';
	  $scope.loadAccept = '';
  	if($scope.donations==null){
  		$scope.loadingStatus = "error";
  	} else if($scope.donations.length==0){
  		$scope.loadingStatus = "zero";
  	} else {
  		$scope.donations  = _.map($scope.donations, function(element) { 
		    return _.extend({}, element, {loading:''});
		});
  	}
  	console.log($scope.donations);

  	$scope.setPage = function (pageNo) {
	    $scope.currentPage = pageNo;
	    $scope.pageChanged();
	};

	$scope.pageChanged = function() {
		$scope.loadingStatus = 'loading'
		var request = {
	        success: function(response){
	        	  $scope.loadingStatus = ''
	            $scope.donations = response.data.data.donations;
	            $scope.totalItems = response.data.total_page*GLOBALS.pageLimit;
              _.each($scope.donations,function(value){
                  value.doner_image = setImageFullPath(value.doner_image);
              });
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
                return UserService.validateResponse(request,response);
            }, 
            function(){ 
                return request.error();
            }
        );
	};

    function respondDonation(status,id,index){
    	//TODO remove this from the list and goto next page or previous page if page has no more data
    	$scope.loadAccept = "loading";
    	function setStatus(status){
    		$scope.loadAccept = status;
    		$timeout(function(){
    			$scope.loadAccept = '';
    		},3000);
    	}
    	var request = {
            success: function(response){
            	setStatus('success');
            	$scope.donations.splice(index, 1);
            	//remove one item from total items
            	$scope.totalItems = $scope.totalItems -1;
            	debugger;
            	if($scope.donations.length == 0 ){
	            	if ($scope.totalItems==0){
	            		//set messag that there is no items
	            		$scope.loadingStatus = 'zero';
	            	} else {
	            		//set the current page again
	            		$scope.setPage($scope.currentPage);
	            	}
            	}
            },
            error:function(){
            	setStatus('error');
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
                return UserService.validateResponse(request,response);
            }, 
            function(){ 
                return request.error();
            }
        );
    }

    $scope.accept = function(id,index){
    	console.log('accepted'+id + 'index'+ index);
    	respondDonation('accepted',id,index);
    }

    $scope.decline = function(id,index){
    	console.log('decline'+id)
    	respondDonation('rejected',id,index);
    }

  });

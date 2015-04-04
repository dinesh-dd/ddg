'use strict';

/**
 * @ngdoc function
 * @name gePantApp.controller:CollectionsCtrl
 * @description
 * # CollectionsCtrl
 * Controller of the gePantApp
 */
angular.module('gePantApp')
  .controller('CollectionsCtrl', function ($scope,donations,$http) {
  	$scope.donations= donations.donations;
  	$scope.firstLoadError = false;
  	$scope.zeroLength = false;
    $scope.perPage = GLOBALS.pageLimit;
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
                page:$scope.currentPage,
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
                return request.error();
            }
        );
	};
  });

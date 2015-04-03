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
  	// $scope.collections = [
   //  	{
   //  		thing:{
			// 	PlasticBag:10,
			// 	PaperBag:0,
			// 	RefuseSack:10
			// }, 
			// donar_name: 'Dinesh Dabhi',
			// donar_image : 'http://creativepool.com/marketing/images/minions-1.jpg', 
			// location : 'Ahmedabad naroda, Gujarat, India',
			// created_at : new Date(),
   //  	},
   //  ]
  });

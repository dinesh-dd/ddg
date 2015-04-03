'use strict';

/**
 * @ngdoc function
 * @name gePantApp.controller:CollectorprofileCtrl
 * @description
 * # CollectorprofileCtrl
 * Controller of the gePantApp
 */
angular.module('gePantApp')
  .controller('CollectorprofileCtrl', function ($scope,collector,DonationService,$stateParams,$timeout) {
    $scope.collector = collector;
    $scope.ratingStatus = null;
    if(collector){
        $scope.loadStatus = 'success';    
    } else {
        $scope.loadStatus = 'error';    
    }    

    $scope.userRate = {
	    rate : 2,
	    isReadOnly : true
	};
	  
	$scope.myRate = {
	    rate : 4,
	    isReadOnly : false
	};

    $scope.setStar = function(){
        function setIcon(icon){
            $scope.ratingStatus = icon;
            $timeout(function(){   
                $scope.ratingStatus = "";
            },2000);
        }
        $scope.ratingStatus = "loading";
        DonationService.submitRating({
            success:function(){
                setIcon("success");
                console.info('got success');
            },
            error:function(){
                setIcon("error");
                console.error('got error');  
            },
            data:{collector_id:$stateParams.id,rating:$scope.collector.myStar}
        })
    }

  });

'use strict';

/**
 * @ngdoc function
 * @name gePantApp.controller:CollectorprofileCtrl
 * @description
 * # CollectorprofileCtrl
 * Controller of the gePantApp
 */
angular.module('gePantApp')
  .controller('CollectorprofileCtrl', function ($scope,collector,DonationService,$stateParams,$timeout,modalService,$location) {
    $scope.collector = collector;
    $scope.showDonate = $location.search().showDonate;
    console.log('showDonate  '+$scope.showDonate);
    $scope.modal= function(){
        GLOBALS.collectorID = {
            name:collector.name,
            location:collector.street_address,
            image:collector.image,
            id:$stateParams.id
        }; 
        modalService.openModal('addDonation','AdddonationCtrl');        
    }
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
            data:{collector_id:$stateParams.id,rating:$scope.collector.my_rating}
        })
    }

  });

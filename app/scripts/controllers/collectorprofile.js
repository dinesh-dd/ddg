'use strict';

/**
 * @ngdoc function
 * @name gePantApp.controller:CollectorprofileCtrl
 * @description
 * # CollectorprofileCtrl
 * Controller of the gePantApp
 */
angular.module('gePantApp')
  .controller('CollectorprofileCtrl', function ($scope) {
    $scope.collector = {
        id:123,
    	name:'Dinesh Dabhi',
    	pledge:'1000',
    	objective:'This is the objective of mine',
    	star:3.5,
    	location:'Ahmedbabad, Gujarat, India',
    	Organization: 'Being Human',
    	myStar : 1,
    	image : 'http://creativepool.com/marketing/images/minions-1.jpg', 
    };
    $scope.userRate = {
	    rate : 2,
	    isReadOnly : true
	};
	  
	$scope.myRate = {
	    rate : 4,
	    isReadOnly : false
	};

    $scope.setStar = function(){
        //TODO intigrate api to set the start here 
        console.log('submit star');
        console.log($scope.collector.myStar);
    }

  });

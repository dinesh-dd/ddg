'use strict';

/**
 * @ngdoc function
 * @name gePantApp.controller:DonationrequestCtrl
 * @description
 * # DonationrequestCtrl
 * Controller of the gePantApp
 */
angular.module('gePantApp')
  .controller('DonationrequestCtrl', function ($scope) {
    $scope.donations = [
    	{
    		id: 1, 
			thing:{
				PlasticBag:10,
				PaperBag:10,
				RefuseSack:10
			},
			donar_name: 'Dinesh Dabhi',
			imageUrl:'http://creativepool.com/marketing/images/minions-1.jpg', 
			location : 'Ahmedabad naroda',
			created_at : new Date()
    	},
    	{
    		id: 1, 
			thing:{
				PlasticBag:10,
				PaperBag:10,
				RefuseSack:10
			},
			donar_name: 'Dinesh Dabhi',
			imageUrl:'http://creativepool.com/marketing/images/minions-1.jpg', 
			location : 'Ahmedabad naroda',
			created_at : new Date()
    	},
    	{
    		id: 1, 
			thing:{
				PlasticBag:10,
				PaperBag:10,
				RefuseSack:10
			},
			donar_name: 'Dinesh Dabhi',
			imageUrl:'http://creativepool.com/marketing/images/minions-1.jpg', 
			location : 'Ahmedabad naroda',
			created_at : new Date()
    	}
    ];
    
    $scope.accept = function(){
    	console.log('accepted')
    }

    $scope.decline = function(){
    	console.log('decline')
    }

  });

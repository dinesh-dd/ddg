'use strict';

/**
 * @ngdoc function
 * @name gePantApp.controller:DonationsCtrl
 * @description
 * # DonationsCtrl
 * Controller of the gePantApp
 */
angular.module('gePantApp')
  .controller('DonationsCtrl', function ($scope) {
    $scope.donations = [
    	{
    		thing:{
				PlasticBag:2,
				PaperBag:10,
				RefuseSack:0
			}, 
			collector_Name : 'Dinesh Dabhi',
			collector_image : 'http://creativepool.com/marketing/images/minions-1.jpg', 
			//when status is pending upper two values not be there 
			location : 'location string',
			created_at : new Date(),
			status : 'accepted'
    	},
    	{
    		thing:{
				PlasticBag:2,
				PaperBag:10,
				RefuseSack:0
			},
			//when status is pending upper two values not be there 
			location : 'location string',
			created_at : new Date(),
			status : 'panding'
    	},
    	{
    		thing:{
				PlasticBag:2,
				PaperBag:10,
				RefuseSack:0
			}, 
			collector_Name : 'Dinesh Dabhi',
			collector_image : '', 
			//when status is pending upper two values not be there 
			location : 'location string',
			created_at : new Date(),
			status : 'accepted'
    	}
    ]
  });

'use strict';

/**
 * @ngdoc function
 * @name gePantApp.controller:CollectionsCtrl
 * @description
 * # CollectionsCtrl
 * Controller of the gePantApp
 */
angular.module('gePantApp')
  .controller('CollectionsCtrl', function ($scope) {
  	$scope.collections = [
    	{
    		thing:{
				PlasticBag:10,
				PaperBag:0,
				RefuseSack:10
			}, 
			donar_name: 'Dinesh Dabhi',
			donar_image : 'http://creativepool.com/marketing/images/minions-1.jpg', 
			location : 'Ahmedabad naroda, Gujarat, India',
			created_at : new Date(),
    	},
    	{
    		thing:{
				PlasticBag:2,
				PaperBag:10,
				RefuseSack:0
			}, 
			donar_name: 'Dinesh Dabhi',
			donar_image : 'http://creativepool.com/marketing/images/minions-1.jpg', 
			location : 'location',
			created_at : new Date(),
    	},
    	{
    		thing:{
				PlasticBag:2,
				PaperBag:10,
				RefuseSack:0
			}, 
			donar_name: 'Dinesh Dabhi',
			donar_image: '', 
			location: 'location',
			created_at: new Date(),
    	}
    ]
  });

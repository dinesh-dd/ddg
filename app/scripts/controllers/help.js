'use strict';

/**
 * @ngdoc function
 * @name gePantApp.controller:HelpCtrl
 * @description
 * # HelpCtrl
 * Controller of the gePantApp
 */
angular.module('gePantApp')
  	.controller('HelpCtrl', function ($scope) {
  		$scope.navs = [
  			{
  				link:'om-gepant.hur-funkar-det',
  				text:'Hur funkar det?',
  			},
  			{
  				link:'om-gepant.vill-du-donera-pant',
  				text:'Vill du donera pant?',
  			},
  			{
  				link:'om-gepant.vill-du-samla-pant',
  				text:'Vill du samla pant?',
  			},
  			{
  				link:'om-gepant.varfoer-ge-pant',
  				text:'Varför ge pant?',
  			},
  			{
  				link:'om-gepant.vilka-aer-vi',
  				text:'Vilka är vi?',
  			},
  			{
  				link:'om-gepant.press',
  				text:'Press',
  			}
  		];
	});

'use strict';

/**
 * @ngdoc function
 * @name gePantApp.controller:HelpCtrl
 * @description
 * # HelpCtrl
 * Controller of the gePantApp
 */
angular.module('gePantApp')
  	.controller('HelpCtrl', function ($scope,$rootScope,$filter,$state,$timeout) {

      $timeout(function(){
          $rootScope.currentLink = findName($state.$current.name);
          console.log($rootScope.currentLink);
      },300);

      function findName(currentState){
          var single_object = $filter('filter')($scope.navs, function (d) {return d.link == currentState;})[0];
          return single_object ? single_object.text : '';
      }

  		$scope.navs = [
  			{
  				link:'om-gepant.hur-funkar-det',
          text:'help.navigation.howWork'
  			},
  			{
  				link:'om-gepant.vill-du-donera-pant',
          text:'help.navigation.wantToDonate'
  			},
  			{
  				link:'om-gepant.vill-du-samla-pant',
          text:'help.navigation.collectPledge'
  			},
  			{
  				link:'om-gepant.varfoer-ge-pant',
          text:'help.navigation.whyGive'
  			},
  			{
  				link:'om-gepant.vilka-aer-vi',
          text:'help.navigation.whoWe'
  			},
  			{
  				link:'om-gepant.press',
          text:'help.navigation.press'
  			}
  		];
	});
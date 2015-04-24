'use strict';

/**
 * @ngdoc function
 * @name gePantApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the gePantApp
 */
angular.module('gePantApp')
  .controller('ProfileCtrl', function ($scope,$state,$rootScope,UserService,modalService) {
  		$scope.modal = function(name) {
            switch (name) {
                case 'addDonation':
                    modalService.openModal(name, 'AdddonationCtrl');
                    break;
            }
        }
    	$scope.$state = $state;
  });

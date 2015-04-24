'use strict';

/**
 * @ngdoc function
 * @name gePantApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the gePantApp
 */
angular.module('gePantApp')
    .controller('HomeCtrl', function($scope,modalService,$rootScope,_,$location) {
        $scope.modal = function(name) {
            switch (name) {
                case 'signup':
                    modalService.openModal(name, 'SignupCtrl');
                    break;
                case 'addDonation':
                    modalService.openModal(name, 'AdddonationCtrl');
                    break;
            }
        }
        $scope.gotoCollector = function(id){
            var state= "collector/"+id;
            $location.path(state).search('showDonate','true');
        }
    });

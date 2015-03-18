'use strict';
/**
 * @ngdoc function
 * @name gePantApp.controller:CarouseldemoctrlCtrl
 * @description
 * # CarouseldemoctrlCtrl
 * Controller of the gePantApp
 */
angular.module('gePantApp')
.controller('CarouselDemoCtrl', function($scope) {
    $scope.myInterval = 5000;
    $scope.slides = [
    		{
                text: 'More',
                class:'',
                image:'images/slider-image.png',
    		},
    		{
                text: 'More',
                class:'blue',
                image:'images/slider-image.png',
    		},
    		{
                text: 'More',
                class:'yellow',
                image:'images/slider-image.png',
    		},
    		{
                text: 'More',
                class:'blackblue',
                image:'images/slider-image.png',
    		}
    ];
});

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
    $scope.myInterval = 500000;
    $scope.slides = [
    		{
                text: 'More',
                class:'',
                video:"images/mov.mp4",
                image:'images/slider-image.png',
    		},
    		{
                text: 'More',
                class:'blue',
                video:"images/mov.mp4",
                image:'images/slider-image.png',
    		},
    		{
                text: 'More',
                class:'yellow',
                video:"images/mov.mp4",
                image:'images/slider-image.png',
    		},
    		{
                text: 'More',
                class:'blackblue',
                video:"images/mov.mp4",
                image:'images/slider-image.png',
    		}
    ];
});

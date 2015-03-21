'use strict';

/**
 * @ngdoc directive
 * @name gePantApp.directive:autoscale
 * @description
 * # autoscale
 */
angular.module('gePantApp')
  .directive('autoscale', ['$window', function(a) {
        return {
            restrict: 'AC',
            link: function(b, c, d) {
                b.params = {}, b.calcParams = function() {
                    b.params.fromWidth = angular.isUndefined(d.autoscaleFromWidth) ? 0 : Math.floor(d.autoscaleFromWidth), b.params.toWidth = angular.isUndefined(d.autoscaleToWidth) ? 0 : Math.floor(d.autoscaleToWidth), b.params.max = angular.isUndefined(d.autoscaleMax) ? 1 : Math.floor(d.autoscaleMax), b.params.min = angular.isUndefined(d.autoscaleMin) ? 0 : Math.floor(d.autoscaleMin), 0 === b.params.toWidth && d.autoscale > 0 && (b.params.toWidth = Math.floor(d.autoscale)), b.params.diff = b.params.toWidth - b.params.fromWidth, b.params.winWidth = a.innerWidth, b.params.scale = b.params.winWidth / b.params.diff, b.params.max > 0 && b.params.scale > b.params.max && (b.params.scale = b.params.max), b.params.scale < b.params.min && (b.params.scale = b.params.min);
                    var e = 'scale(' + b.params.scale + ')';
                    angular.element(c).css({
                        '-webkit-transform': e,
                        '-moz-transform': e,
                        '-o-transform': e,
                        '-ms-transform': e,
                        transform: e,
                        '-webkit-transform-origin': '0 0',
                        '-moz-transform-origin': '0 0',
                        '-o-transform-origin': '0 0',
                        '-ms-transform-origin': '0 0',
                        'transform-origin': '0 0'
                    })
                }, b.calcParams(), angular.element(a).bind('resize', function() {
                    b.calcParams(), b.$apply()
                })
            }
        }
    }])

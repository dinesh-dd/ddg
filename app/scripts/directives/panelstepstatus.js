'use strict';

/**
 * @ngdoc directive
 * @name gePantApp.directive:panelStepStatus
 * @description
 * # panelStepStatus
 */
// angular.module('gePantApp')
// 	.directive('panelStepStatus', function() {
// 	    return {
// 	        restrict: "A",
// 	        scope: {
// 	            stepData: "=panelStepStatus",
// 	        },
// 	        template: '<span class="icon fa fa-fw" ng-class="classes"></span>',
// 	        link: function(a, b) {
// 	                angular.element(b).addClass("status-icon"),
// 	                a.classes = "",
// 	                a.$watch("[stepData.open,stepData.validated,stepData.validate()]",
// 	                function() {
// 	                        a.stepData.validated ? a.classes = a.stepData.validate() ? "fa-check" : "fa-exclamation" : a.stepData.loading ? a.classes = "fa-refresh loadicon" : (a.classes = "fa-plus", a.stepData.open && (a.classes += " open"))
// 	                }, !0)
// 	        }
// 	    }
// 	})
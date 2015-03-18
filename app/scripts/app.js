'use strict';
// var apiUrl  = 'http://192.168.1.35/WorkSpace/OfficeWork/GPent/GePant/app/api/'
/**
 * @ngdoc overview
 * @name gePantApp
 * @description
 * # gePantApp
 *
 * Main module of the application.
 */
angular
    .module('gePantApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'ui.router',
        'ui.bootstrap',
        'ncy-angular-breadcrumb',
        'facebook'
    ])
    .config(['$animateProvider',function ($animateProvider) {
        $animateProvider.classNameFilter(/carousel/);
    }])
    .config(function(FacebookProvider) {
        FacebookProvider.init('782192585167151');
    })
    
    
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

// //FIXME directive not working
// .directive('panelStepStatus', function() {
//     return {
//         restrict: "A",
//         scope: {
//             stepData: "=panelStepStatus",
//         },
//         template: '<span class="icon fa fa-fw" ng-class="classes"></span>',
//         link: function(a, b) {
//                 angular.element(b).addClass("status-icon"),
//                 a.classes = "",
//                 a.$watch("[stepData.open,stepData.validated,stepData.validate()]",
//                 function() {
//                         a.stepData.validated ? a.classes = a.stepData.validate() ? "fa-check" : "fa-exclamation" : a.stepData.loading ? a.classes = "fa-refresh loadicon" : (a.classes = "fa-plus", a.stepData.open && (a.classes += " open"))
//                 }, !0)
//         }
//     }
// })

//     .directive("bagSummary", function() {
//         return {
//             restrict: "A",
//             scope: {
//                 bagSummary: "=",
//                 imgSrc: "@",
//                 label: "@",
//                 labelSingle: "@",
//                 labelPlural: "@"
//             },
//             template: '\n    <span class="icons svg" style="left:-{{(bagsToArray().length-1)/2*10}}px">\n      <span ng-repeat="i in bagsToArray()" class="icon">\n        <span class="icon-inner" style="left:{{i*10}}px" round>\n          <img ng-src="{{imgSrc}}" alt="" />\n        </span>\n      </span>\n    </span>\n    <span class="bag-label"><strong>{{getCount()}}</strong> {{getLabel()}}</span>\n    ',
//             link: function(a, b, c) {
//                 a.max = angular.isUndefined(c.max) ? 999 : Math.floor(c.max), a.bagsToArray = function() {
//                     for (var b = [], c = 0; c < a.bagSummary && 10 > c; c++)
//                         b.push(c);
//                     return b
//                 }, a.getCount = function() {
//                     return a.bagSummary < a.max ? a.bagSummary : a.max + "+"
//                 }, a.getLabel = function() {
//                     return angular.isUndefined(a.labelSingle) && (a.labelSingle = a.label), angular.isUndefined(a.labelPlural) && (a.labelPlural = a.label), a.bagSummary > 1 ? a.labelPlural : a.labelSingle
//                 }
//             }
//         }
//     })
//     .directive("bagsSummary", function() {
//         return {
//             restrict: "A",
//             replace: !0,
//             scope: {
//                 bagsSmall: "=",
//                 bagsMedium: "=",
//                 bagsLarge: "=",
//                 imgSrcSmall: "@",
//                 imgSrcMedium: "@",
//                 imgSrcLarge: "@",
//                 labelSmall: "@",
//                 labelSmallSingle: "@",
//                 labelSmallPlural: "@",
//                 labelMedium: "@",
//                 labelMediumSingle: "@",
//                 labelMediumPlural: "@",
//                 labelLarge: "@",
//                 labelLargeSingle: "@",
//                 labelLargePlural: "@"
//             },
//             template: '\n    <div class="bags-summary row">\n      <div bag-summary="bagsSmall"\n        class="bag-summary bag-summary-small" \n        ng-class="getColClass()" \n        ng-show="bagsSmall>0"\n        img-src="{{imgSrcSmall}}"\n        label="{{labelSmall}}" label-single="{{labelSmallSingle}}" label-plural="{{labelSmallPlural}}" \n      ></div>\n      <div bag-summary="bagsMedium"\n        class="bag-summary bag-summary-medium" \n        ng-class="getColClass()" \n        ng-show="bagsMedium>0"\n        img-src="{{imgSrcMedium}}"\n        label="{{labelMedium}}" label-single="{{labelMediumSingle}}" label-plural="{{labelMediumPlural}}" \n      ></div>\n      <div bag-summary="bagsLarge"\n        class="bag-summary bag-summary-large" \n        ng-class="getColClass()" \n        ng-show="bagsLarge>0"\n        img-src="{{imgSrcLarge}}"\n        label="{{labelLarge}}" label-single="{{labelLargeSingle}}" label-plural="{{labelLargePlural}}" \n      ></div>\n    </div>\n    ',
//             link: function(a) {
//                 a.getColClass = function() {
//                     return "col-xs-4"
//                 }
//             }
//         }
//     })
//     .directive("counter", function() {
//         return {
//             restrict: "A",
//             scope: {
//                 value: "=value"
//             },
//             template: '<a href="javascript:;" class="counter-minus" ng-class="minusClass" ng-click="minus()">{{minusText}}</a>                  <input type="text" class="counter-field" ng-class="inputClass" ng-model="value" ng-change="changed()" to-number>                  <a  href="javascript:;" class="counter-plus" ng-class="plusClass" ng-click="plus()">{{plusText}}</a>',
//             link: function(a, b, c) {
//                 if (angular.isUndefined(a.value))
//                     throw "Missing the value attribute on the counter directive.";
//                 var d = angular.isUndefined(c.min) ? null : parseInt(c.min),
//                     e = angular.isUndefined(c.max) ? null : parseInt(c.max),
//                     f = angular.isUndefined(c.step) ? 1 : parseInt(c.step);
//                 a.minusText = angular.isUndefined(c.minusText) ? "-" : c.minusText, a.plusText = angular.isUndefined(c.plusText) ? "+" : c.plusText, a.inputClass = c.inputClass, a.minusClass = c.minusClass, a.plusClass = c.plusClass, b.addClass("counter-container"), a.readonly = angular.isUndefined(c.readonly);
//                 var g = function(b) {
//                     a.value = parseInt(b)
//                 };
//                 g(a.value), a.minus = function() {
//                     return d && (a.value <= d || a.value - f <= d) || 0 === d && a.value < 1 ? (g(d), !1) : (g(a.value - f), void 0)
//                 }, a.plus = function() {
//                     return e && (a.value >= e || a.value + f >= e) ? (g(e), !1) : (g(a.value + f), void 0)
//                 }, a.changed = function() {
//                     return a.value || g(0), /[0-9]/.test(a.value) ? g(a.value) : g(a.min), d && (a.value <= d || a.value - f <= d) ? (g(d), !1) : e && (a.value >= e || a.value + f >= e) ? (g(e), !1) : (g(a.value), void 0)
//                 }
//             }
//         }
//     })
//     .directive("hrefDynamic", ["$window", "$route", function(a) {
//         return {
//             restrict: "A",
//             scope: {
//                 hrefDynamic: "@"
//             },
//             link: function(b, c) {
//                 b.$on("$routeChangeStart", function() {
//                     var d = String(b.hrefDynamic).split("/"),
//                         e = String(a.location.hash).split("/");
//                     mergedParams = [];
//                     for (var f in e)
//                         mergedParams.push(d[f] && "*" != d[f] ? d[f] : e[f]);
//                     angular.element(c).attr("href", mergedParams.join("/"))
//                 })
//             }
//         }
//     }])
//     .directive("ngValidFunc", function() {
//         return {
//             require: "ngModel",
//             scope: {
//                 ngValidFunc: "&"
//             },
//             link: function(a, b, c, d) {
//                 d.$parsers.unshift(function() {
//                     return d.$setValidity("custom", a.ngValidFunc()), b.val()
//                 })
//             }
//         }
//     })
//     .directive("round", function() {
//         return {
//             restrict: "A",
//             transclude: !0,
//             template: '<div class="round">\n                 <div class="round-format"><img src="/css/images/format-round.png" alt="" /></div>\n                 <div class="round-inner" ng-transclude></div>\n               </div>'
//         }
//     })
//     .directive("setNgAnimate", ["$animate", function(a) {
//         return {
//             link: function(b, c, d) {
//                 b.$watch(function() {
//                     return b.$eval(d.setNgAnimate, b)
//                 }, function(b) {
//                     a.enabled(!!b, c)
//                 })
//             }
//         }
//     }])
//     .directive("stepData", ["$window", function() {
//         return {
//             restrict: "A",
//             require: "^form",
//             scope: {
//                 stepData: "="
//             },
//             link: function(a, b, c, d) {
//                 angular.isUndefined(a.stepData) || (a.stepData.form = d, a.stepData.validate = function(b) {
//                     b && (a.stepData.validated = !0, a.stepData.loading = !1);
//                     var c = !0;
//                     return _.isObject(a.stepData.form) && (c = c && a.stepData.form.$valid), _.isFunction(a.stepData.customValidation) && (c = c && a.stepData.customValidation()), c
//                 })
//             }
//         }
//     }])
//     .directive("toNumber", function() {
//         return {
//             require: "ngModel",
//             link: function(a, b, c, d) {
//                 d.$parsers.push(function(a) {
//                     if (void 0 == a)
//                         return "";
//                     var b = a.replace(/[^0-9]/g, "");
//                     return parseFloat(b) || (b = "0"), b = String(parseFloat(b)), b != a && (d.$setViewValue(b), d.$render()), b
//                 })
//             }
//         }
//     });

'use strict';

/**
 * @ngdoc service
 * @name gePantApp.PreloadService
 * @description
 * # PreloadService
 * Service in the gePantApp.
 */
angular.module('gePantApp')
    .service('PreloadService', ["$templateCache", "$http", function(a, b) {
        function c(c) {
            b.get(c).success(function(b) {
                a.put(c, b)
            })
        }

        function d(a) {
            if ("object" != typeof a)
                return c(a);
            for (var b = 0; b < a.length; b++)
                c(a[b])
        }

        function e(a) {
            return "object" == typeof a ? d(a) : "string" == typeof a ? c(a) : void 0
        }
        return {
            preloadByUrl: c,
            preloadByArray: d,
            preload: e
        }
    }]);

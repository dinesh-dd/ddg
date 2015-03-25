'use strict';

/**
 * @ngdoc service
 * @name gePantApp.GeoLocation
 * @description
 * # GeoLocation
 * Service in the gePantApp.
 */
angular.module('gePantApp')
    .service("GeoLocation", ["localStorageService", "$http", "_", function(a, b, c) {
        function d() {}
        function e(d) {
            var e = a.get("geo");
            c.isObject(e) && "success" === e.status ? c.isFunction(d) && d(e) : b.get("http://ip-api.com/json").then(function(b) {
                a.add("geo", b.data), c.isFunction(d) && d(b.data)
            })
        }
        return {
            autodetect: d,
            byIP: e
        }
    }])

'use strict';
var initted = !1;
/**
 * @ngdoc service
 * @name gePantApp.MapService
 * @description
 * # MapService
 * Service in the gePantApp.
 */
angular.module('gePantApp')
    .service('MapService', ["$window", "$http", "_", function(a, b, c) {
        function d(a, d) {
            var e = {
                address: a,
                region: GLOBALS.map.region,
                components: GLOBALS.map.components,
                sensor: !1
            };
            return c.isObject(a) && (e = c.extend(e, a)), b.get("http://maps.googleapis.com/maps/api/geocode/json", {
                params: e
            }).then(function(a) {
                return c.isFunction(d) ? d(a) : a
            })
        }

        function e(a) {
            if (c.each(a.address_components, function(b) {
                    c.each(b.types, function(c) {
                        a[c] = b.long_name
                    })
                }), a.postal_code && a.postal_code.length >= 5) {
                var b = a.postal_code.replace(/[^0-9]/g, "");
                a.formatted_address_postal = b.substring(0, 3) + " " + b.substring(3), a.postal_town && (a.formatted_address_postal += ", " + a.postal_town)
            }
            return (a.route || a.street_address) && (a.formatted_address_street = a.street_address || a.route, a.formatted_address_street += " ", a.street_number && (a.formatted_address_street += a.street_number)), a
        }

        function f(a) {
            return c.map(a, e)
        }

        function g(a, b) {
            a = c.isObject(a) ? a : document.getElementById(a) || document.querySelector(a);
            var d, e = {
                geometry: null,
                center: null,
                lat: null,
                lng: null,
                zoom: 12,
                scrollwheel: !1,
                streetViewControl: !1,
                scaleControl: !0,
                rotateControl: !1,
                minZoom: 8
            };
            if (b = c.extend(e, b), c.isObject(b.geometry)) {
                var f = b.geometry,
                    g = f.location,
                    h = new google.maps.LatLng(g.lat, g.lng);
                d = new google.maps.Map(a, b);
                var i = new google.maps.LatLng(f.viewport.northeast.lat, f.viewport.northeast.lng),
                    j = new google.maps.LatLng(f.viewport.southwest.lat, f.viewport.southwest.lng),
                    k = new google.maps.LatLngBounds(j, i);
                d.fitBounds(k)
            } else if (c.isObject(h))
                d = new google.maps.Map(a, b);
            else {
                if (!c.isNumber(b.lat) || !c.isNumber(b.lng))
                    throw "MapService: Missing center positions";
                b.center = new google.maps.LatLng(b.lat, b.lng), d = new google.maps.Map(a, b)
            }
            return d
        }

        function h(a) {
            var b = {
                position: null,
                lat: null,
                lng: null,
                map: null,
                title: ""
            };
            if (a = c.extend(b, a), !c.isNumber(a.lat) || !c.isNumber(a.lng))
                throw "MapService: Missing positions";
            return a.position = new google.maps.LatLng(a.lat, a.lng), console.log(a), new google.maps.Marker(a)
        }
        return initted = !1,
            function(b) {
                a.mapServiceInit = function() {
                    initted = !0
                };
                var c, d = "google-maps-sdk",
                    e = b.getElementsByTagName("script")[0];
                b.getElementById(d) || (c = b.createElement("script"), c.type = "text/javascript", c.src = "http://maps.googleapis.com/maps/api/js?sensor=false&libraries=geometry&callback=mapServiceInit", e.parentNode.insertBefore(c, e))
            }(document), {
                searchAddress: d,
                formatAddress: e,
                formatAddresses: f,
                setMap: g,
                setMapMarker: h
            }
    }]);

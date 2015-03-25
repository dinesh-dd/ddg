'use strict';

/**
 * @ngdoc function
 * @name gePantApp.controller:SearchmapCtrl
 * @description
 * # SearchmapCtrl
 * Controller of the gePantApp
 */
angular.module('gePantApp')
    .controller('SearchmapCtrl', ["$scope", "$http", "MapService", "GeoLocation", "localStorageService", function($scope, b, c, d) {
        $scope.mapCollapse = !0, 
        $scope.mapCanvas = document.getElementById("start-map"), 
        $scope.map = {}, 
        $scope.geo = {}, 
        d.byIP(function(b) {
            $scope.geo = b
        }), 
        $scope.getLocation = function($scope) {
            return c.searchAddress($scope, function($scope) {
                console.log($scope);
                var b = [];
                return _.each($scope.data.results, function($scope) {
                    console.log($scope), b.push($scope)
                }), b
            })
        }, 
        $scope.setLocation = function() {
            var b = $scope.myPlace.geometry,
                c = b.location,
                d = new google.maps.LatLng(c.lat, c.lng);
            $scope.map = new google.maps.Map($scope.mapCanvas, {
                center: d,
                zoom: 12,
                scrollwheel: !1,
                streetViewControl: !1,
                scaleControl: !0,
                rotateControl: !0,
                minZoom: 8
            });
            var e = new google.maps.LatLng(b.viewport.northeast.lat, b.viewport.northeast.lng),
                f = new google.maps.LatLng(b.viewport.southwest.lat, b.viewport.southwest.lng),
                g = new google.maps.LatLngBounds(f, e);
            $scope.map.fitBounds(g);
            var h = google.maps.geometry.spherical.computeDistanceBetween(e, f),
                i = new google.maps.Circle({
                    center: d,
                    radius: h / 2,
                    fillColor: "lime",
                    fillOpacity: .2,
                    strokeWeight: 0,
                    editable: !0
                });
            i.setMap($scope.map), $scope.mapCollapse = !1
        }
    }]);

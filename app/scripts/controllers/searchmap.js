'use strict';

/**
 * @ngdoc function
 * @name gePantApp.controller:SearchmapCtrl
 * @description
 * # SearchmapCtrl
 * Controller of the gePantApp
 */
angular.module('gePantApp')
    .controller('SearchmapCtrl', ["$scope", "$http", "MapService", "GeoLocation", "localStorageService","DonationService" ,function($scope, b, c, d,e,DonationService) {
        $scope.mapCollapse = !0, 
        $scope.mapCanvas = document.getElementById("start-map"), 
        $scope.map = {}, 
        $scope.geo = {}, 
        d.byIP(function(b) {
            $scope.geo = b
        }), 
        $scope.getLocation = function($scope) {
            return c.searchAddress($scope, function($scope) {
                var b = [];
                return _.each($scope.data.results, function($scope) {
                    b.push($scope)
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
            i.setMap($scope.map), $scope.mapCollapse = !1, 
            setMarkers();
        }
        function setMarkers(){
            var request = {
                //TODO set the loadin indicator for api call
                //TODO set the multiple marker and remove the infowindow of other marker
                //TODO set the marker with image
                //TODO on infowindow click open the profile
                success : function(response){
                    var collectors = response.data.collectors;
                    console.log(collectors);
                    var infowindow = new google.maps.InfoWindow();
                    var marker;
                    // GLOBALS.markers.length = 0;
                    // function clearMarkers() {
                    //     for (var i = 0; i < markers.length; i++) {
                    //         GLOBALS.markers[i].setMap(null);
                    //     }
                    //     GLOBALS.markers.length = 0;
                    // }
                    // function closeOtherMarkers(){
                    //     for (var i = 0; i < markers.length; i++) {
                    //         GLOBALS.markers[i].setMap(null);
                    //     }
                    //     GLOBALS.markers.length = 0;
                    // }
                    // cMarker
                    for (var i = 0; i < collectors.length; i++) {
                        marker = new google.maps.Marker({
                            position: new google.maps.LatLng(collectors[i]['latitude'], collectors[i]['longitude']),
                            map: $scope.map
                        });
                        GLOBALS.markers.push(marker); 
                        var name = collectors[i].name;
                        var location = collectors[i].location;
                        var image = collectors[i].image || 'images/avtar.jpg'

                        var contentString = '<div class="content_gg" id="content_gg">'+
                        '<a class="imageContent" style="background-image:url('+image+')">'+
                        '</a>\
                        <div class="nameContent">\
                            <a class="name">\
                                '+name+'\
                            </a>\
                        <div class="distance">\
                            '+location+'\
                        </div>\
                        </div>'+
                        '</div>';

                        google.maps.event.addListener(marker, 'click', (function(marker, i) {
                            return function() {
                                infowindow.setContent(contentString);
                                infowindow.open($scope.map, marker);
                            }
                        })(marker, i));
                    }
                }, 
                error: function(response){
                    console.error(response)
                },
                data:{
                    latitude:60.1282423,
                    longitude:18.645962,
                    page:1,
                    limit:100
                }
            }
            DonationService.findCollectors(request)
        }
    }]);

'use strict';

/**
 * @ngdoc function
 * @name gePantApp.controller:SearchmapCtrl
 * @description
 * # SearchmapCtrl
 * Controller of the gePantApp
 */
angular.module('gePantApp')
    .controller('SearchmapCtrl', ["$scope", "$http", "MapService", "GeoLocation", "localStorageService","DonationService","$timeout",function($scope, b, c, d,e,DonationService,$timeout) {
        var lat = null;
        var lng = null;
        $scope.mapCollapse = !0, 
        $scope.mapCanvas = document.getElementById("start-map"), 
        $scope.map = {}, 
        $scope.geo = {},
        $scope.firstTime = 0;
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
            lat = b.viewport.northeast.lat;
            lng = b.viewport.northeast.lng;
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
            i.setMap($scope.map), $scope.mapCollapse = !1;
            setMarkers();
            google.maps.event.addListenerOnce($scope.map, 'idle', function() {
                google.maps.event.trigger($scope.map, 'resize');
                $timeout(function() {
                    $scope.map.setCenter(new google.maps.LatLng(b.viewport.northeast.lat, b.viewport.northeast.lng));
                }, 200);
            });
        }
        function setMarkers(){
            $scope.loadingLocations = true;
            var request = {
                success : function(response){
                    $scope.loadingLocations = false;
                    var collectors = response.data.collectors;
                    console.log(collectors);
                    var infowindow = new google.maps.InfoWindow();
                    var marker;
                    var pinIcon = new google.maps.MarkerImage(
                        "images/pin.png",
                        null, /* size is determined at runtime */
                        null, /* origin is 0,0 */
                        null, /* anchor is bottom center of the scaled image */
                        new google.maps.Size(40, 56)
                    );
                    for (var i = 0; i < collectors.length; i++) {
                        marker = new google.maps.Marker({
                            position: new google.maps.LatLng(collectors[i]['latitude'], collectors[i]['longitude']),
                            map: $scope.map,
                            icon:pinIcon
                        });
                        var name = collectors[i].name;
                        var location = collectors[i].location;
                        var image = setImageFullPath(collectors[i].image);
                        var id = collectors[i].id;


                        var contentString = '<div class="content_gg" id="content_gg">'+
                        '<a class="imageContent" href="#/collector/'+id+'?showDonate=true" style="background-image:url('+image+')">'+
                        '</a>\
                        <div class="nameContent">\
                            <a class="name" href="#/collector/'+id+'?showDonate=true">\
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
                    $scope.loadingLocations = false;
                    console.error(response)
                },
                data:{
                    latitude:lat,
                    longitude:lng,
                    page:1,
                    limit:100
                }
            }
            DonationService.findCollectors(request)
        }
    }]);

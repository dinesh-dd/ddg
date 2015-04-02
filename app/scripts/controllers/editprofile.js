'use strict';

/**
 * @ngdoc function
 * @name gePantApp.controller:EditprofileCtrl
 * @description
 * # EditprofileCtrl
 * Controller of the gePantApp for updating the profile
 */
angular.module('gePantApp')
  .controller('EditprofileCtrl', function ($scope,$rootScope,UserService,MapService,_,$timeout,$http,fileUpload) {
  		$scope.profileStatus = '';
        $scope.u = {};
        angular.copy($rootScope.user,$scope.u);
        $timeout(function() {
            var b = { position: null,lat: $scope.u.latitude,lng: $scope.u.longitude,map: null,title: "" };
            MapService.setMapCenterWithMarker('map-adw',b);
        }, 5000);
        /** 
         * @method editProfile
         * function to edit the profile by calling userservice
         */
    	$scope.editProfile = function(){
            $scope.profileStatus = 'trying';
            var request = {
                success:function(){
                    angular.copy($scope.u,$rootScope.user);
                    $scope.profileStatus = 'success';
                },
                error:function(){
                    $scope.profileStatus = 'error';
                },
                data:{
                    'user[username]':$scope.u.name,
                    'user[street_address]':$scope.u.street_address.formatted_address_street,
                    'user[latitude]':$scope.u.latitude,
                    'user[longitude]':$scope.u.longitude,
                    'user[pledge]':$scope.u.pledge,
                    'user[objective]':$scope.u.objective,
                    'user[organization_name]':$scope.u.organization_name,
                    'user[contact_no]':$scope.u.contact_no,
                    'user[postal_code]':$scope.u.postal_code.formatted_address_postal,
                }
            }

            var file = $scope.myFile;
            var uploadUrl = GLOBALS.apiUrl+"edit_profile.json?"+$.param(request.data);
            fileUpload.uploadFileToUrl(file, uploadUrl);

            //THis is the data for the form 
            // $http.post({
            //     method: "POST",
            //     url:GLOBALS.apiUrl+"edit_profile.json",
            //     data:$.param(request.data)
            // }).then(request.success,request.error)
    		// UserService.editProfile(request);
    	},

        
        $scope.getPostalCode = function(a) {
            return a = a.replace(/[^0-9]/g, ""),
            MapService.searchAddress(a, function(b) {
                var UserService = MapService.formatAddresses(b.data.results);
                return UserService = _.filter(UserService, function(b) {
                    return b.postal_code && b.postal_code.substring(0, a.length) === a
                }), UserService = _.sortBy(UserService, function(a) {
                    return a.formatted_address_postal
                })
            })
        },
        
        $scope.setPostalCode = function() {
            MapService.setMap("map-adw", {
                geometry: $scope.u.postal_code.geometry
            }), $scope.u.postalCode = $scope.u.postal_code.postal_code, $scope.u.city = $scope.u.postal_code.postal_town, $timeout(function() {
                document.getElementById("adw-address").focus()
            }, 100)
        },
        
        $scope.getStreet = function(b) {
            return MapService.searchAddress({
                address: b,
                components: GLOBALS.map.components + "|postal_code:" + $scope.u.postal_code.postal_code
            }, function($scope) {
                var b = MapService.formatAddresses($scope.data.results);
                return b = _.filter(b, function($scope) {
                    return _.isString($scope.formatted_address_street)
                }), b = _.sortBy(b, function($scope) {
                    return $scope.formatted_address_street
                })
            })
        },

        $scope.setStreet = function() {
            //set the lat long here for the user
            $scope.u.latitude = $scope.u.street_address.geometry.location.lat
            $scope.u.longitude =  $scope.u.street_address.geometry.location.lng
            console.log($scope.u);
            var b = MapService.formatAddress($scope.u.street_address);
            var map = MapService.setMap("map-adw", b);
            var b = { position: null,lat: $scope.u.latitude,lng: $scope.u.longitude,map: map,title: "" };
            MapService.setMapMarker(b);
        }
  })


.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}])
.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(file, uploadUrl){
        var fd = new FormData();
        fd.append('file', file);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(){
        })
        .error(function(){
        });
    }
}]);
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
        $scope.u.contact_no = parseInt($scope.u.contact_no);
        $timeout(function() {
            var b = { position: null,lat: $scope.u.latitude,lng: $scope.u.longitude,map: null,title: "" };
            MapService.setMapCenterWithMarker('map-adw',b);
        }, 5000);
        /** 
         * @method editProfile
         * function to edit the profile by calling userservice
         */
    	$scope.editProfile = function(){
            debugger;
            var postal_code = form.postalCode.value; //( $scope.u.postal_code && typeof($scope.u.postal_code)=='object'?$scope.u.postal_code.formatted_address_postal:$scope.u.postal_code)
            var street_address =form.address.value;// ( $scope.u.street_address &&  typeof($scope.u.street_address)=='object'?$scope.u.street_address.formatted_address:$scope.u.street_address);
            $scope.profileStatus = 'trying';
            if(postal_code){
                if(!street_address){
                    console.warn('please enter street_address');
                    setStatus('warn');
                    return;
                }
            } else {
                $scope.u.latitude = '';
                $scope.u.longitude = '';
            }
            function setStatus(status){
                $scope.profileStatus = status;                
                $timeout(function() {
                    $scope.profileStatus = ''
                }, 2000);
            }
            var request = {
                success:function(response){
                    angular.copy($scope.u,$rootScope.user);
                    setStatus('success');
                    UserService.setUser(response.data.profileData);
                    console.log($rootScope.user);
                },
                error:function(){
                    setStatus('error');
                },
                data:
                {
                    'user[username]':$scope.u.name,
                    'user[street_address]':street_address,
                    'user[postal_code]':postal_code,
                    'user[latitude]':$scope.u.latitude,
                    'user[longitude]':$scope.u.longitude,
                    'user[pledge]':$scope.u.pledge,
                    'user[objective]':$scope.u.objective,
                    'user[organization_name]':$scope.u.organization_name,
                    'user[contact_no]':$scope.u.contact_no,
                }
            }

            var file = $scope.myFile;
            var uploadUrl = GLOBALS.apiUrl+"edit_profile.json";
            fileUpload.uploadFileToUrl(file, uploadUrl,request);
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
            console.log($scope.u.postal_code.geometry);
            MapService.setMap("map-adw", {
                geometry: $scope.u.postal_code.geometry
            }), 
            $scope.u.postalCode = $scope.u.postal_code.postal_code, 
            $scope.u.city = $scope.u.postal_code.postal_town, 
            $timeout(function() {
                document.getElementById("adw-address").focus()
            }, 100)
        },
        
        $scope.getStreet = function(b) {
            return MapService.searchAddress({
                address: b,
                components: GLOBALS.map.components + "|postal_code:" + (typeof($scope.u.postal_code)=='object'?$scope.u.postal_code.postal_code:$scope.u.postal_code)
            }, function(response) {
                var b = MapService.formatAddresses(response.data.results);
                return b = _.filter(b, function(response) {
                    return _.isString(response.formatted_address_street)
                }), b = _.sortBy(b, function(response) {
                    return response.formatted_address_street
                })
            })
        },

        $scope.setStreetValidation=function(){
            if (form.postalCode.value==""){ 
                console.log('inside the change');
                var b = {   
                    position: null,
                    lat:41.60362105469328,
                    lng:-34.969780249999985,
                    map: map,
                    title: "" 
                };
                var map = MapService.setMap("map-adw", b);
                form.address.value = "";
            }
        },

        $scope.setStreet = function() {
            //set the lat long here for the user
            $scope.u.latitude = $scope.u.street_address.geometry.location.lat;
            $scope.u.longitude =  $scope.u.street_address.geometry.location.lng;
            var b = MapService.formatAddress($scope.u.street_address);
            var map = MapService.setMap("map-adw", b);
            var b = {   
                position: null,
                lat: $scope.u.latitude,
                lng: $scope.u.longitude,
                map: map,
                title: "" 
            };
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
.service('fileUpload',function ($http,_,UserService) {
    this.uploadFileToUrl = function(file, uploadUrl,request){
        var fd = new FormData();
        file = file || '';
        fd.append('user[image]', file);
        _.each(request.data,function(value,key){
            console.log(value);
            var value = value || '';
            fd.append(key, value);
        })
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(response){
            UserService.validateResponse(request,response);
        })
        .error(function(){
            request.error();
        });
    }
});
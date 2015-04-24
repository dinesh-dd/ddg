'use strict';

/**
 * @ngdoc function
 * @name gePantApp.controller:AdddonationCtrl
 * @description
 * # AdddonationCtrl
 * Controller of the gePantApp
 */
angular.module('gePantApp')
    .controller('AdddonationCtrl', ["$scope", "$rootScope", "UserService", "PreloadService", "$timeout", "$interval", "MapService", "_", "DonationApi", "$route", "$location","DonationService", function($scope, b, UserService, e, f, g, h, i, j, k, l,DonationService) {
        var d = $scope.modalInstance;
        $scope.map1 = null;
        k.current = {
            params: {
                param1: null
            }
        };
        e.preload(["views/add-wizard/0-what.html",
                "views/add-wizard/1-who.html",
                "views/add-wizard/2-where.html",
                "views/add-wizard/3-whose.html",
                "views/add-wizard/4-summary.html",
                "views/add-wizard/5-saved.html"
            ]),
            $scope.acceptTest = !0, $scope.donation = {
                bagsSmall: 0,
                bagsMedium: 0,
                bagsLarge: 0,
                acceptTerms: !1,
                collector_s:GLOBALS.collectorID,
            }, 
            $scope.applyUser = function() {
                return i.extend($scope.donation, {
                    contactName: b.user.name,
                    contactEmail: b.user.email,
                    contactTelephone: b.user.contact_no,
                    address: b.user.street_address,
                    postalcode: b.user.PostalCode,
                    city: b.user.City,
                    lat: b.user.latitude,
                    lng: b.user.longitude,
                    geojson: "",
                    postalCodeGeo: b.user.postal_code,
                    streetGeo: b.user.street_address
                })
            }, 
            $scope.$watch("user", function() {
                $scope.applyUser()
            }, !0), 
            $scope.$watch("donation", null, !0), 
            $scope.stepData = {
                what: {
                    customValidation: function() {
                        return $scope.donation.bagsSmall + $scope.donation.bagsMedium + $scope.donation.bagsLarge > 0
                    },
                    addBag: function(b) {
                        switch (b) {
                            case "small":
                            case 1:
                                return $scope.donation.bagsSmall++;
                            case "medium":
                            case 2:
                                return $scope.donation.bagsMedium++;
                            case "large":
                            case 3:
                                return $scope.donation.bagsLarge++
                        }
                    }
                },
                who: {
                    tab: "",
                    login: {}
                },
                where: {
                    setData: function() {
                        console.log('setting the data here ');
                        i.extend($scope.donation.postalCodeGeo, $scope.donation.streetGeo)
                    },
                    getPostalCode: function(a) {
                        return a = a.replace(/[^0-9]/g, ""),
                        h.searchAddress(a, function(b) {
                            var UserService = h.formatAddresses(b.data.results);
                            return UserService = i.filter(UserService, function(b) {
                                return b.postal_code && b.postal_code.substring(0, a.length) === a
                            }), UserService = i.sortBy(UserService, function(a) {
                                return a.formatted_address_postal
                            })
                        })
                    },
                    setPostalCode: function() {
                        h.setMap("map-adw", {
                            geometry: $scope.donation.postalCodeGeo.geometry
                        }), 
                        $scope.donation.postalCode = $scope.donation.postalCodeGeo.postal_code, 
                        $scope.donation.city = $scope.donation.postalCodeGeo.postal_town, 
                        f(function() {
                            document.getElementById("adw-address").focus()
                        }, 100)
                    },
                    getStreet: function(b) {
                        var postalcode = typeof($scope.donation.postalCodeGeo)=="string"?$scope.donation.postalCodeGeo : $scope.donation.postalCodeGeo.postal_code;
                        return h.searchAddress({
                            address: b,
                            components: GLOBALS.map.components + "|postal_code:" + postalcode
                        },
                        function($scope) {
                            var b = h.formatAddresses($scope.data.results);
                            return b = i.filter(b, function($scope) {
                                return i.isString($scope.formatted_address_street)
                            }), b = i.sortBy(b, function($scope) {
                                return $scope.formatted_address_street
                            })
                        })
                    },
                    setStreetValidation:function(me){
                        debugger;
                        var form = document.getElementById('whereForm');
                        console.log('inside the change' )
                        if (form.postalCode.value==""){ 
                            console.log('inside the change');
                            var b = {   
                                position: null,
                                lat:41.60362105469328,
                                lng:-34.969780249999985,
                                map: null,
                                title: "" 
                            };
                            form.address.value = "";
                            var map = h.setMap("map-adw", b);
                        }
                    },
                    setStreetFirstTime:function(){
                        if(b.user.userLogedIn == false){
                            return;
                        }
                        f(function() {
                            var b = { 
                                position: null,
                                lat: $scope.donation.lat,
                                lng: $scope.donation.lng,
                                map: null,
                                title: "" 
                            };
                            h.setMapCenterWithMarker('map-adw1',b);
                        }, 5000);
                    },
                    reloadMap:function(){
                        if(b.user.userLogedIn == false){
                            return;
                        }
                        if($scope.map1){
                            return;
                        }
                        f(function(){
                            var b = { 
                                position: null,
                                lat: $scope.donation.lat,
                                lng: $scope.donation.lng,
                                map: null,
                                title: "" 
                            };
                            $scope.map1 = h.setMapCenterWithMarker('map-adw',b);    
                            h.setMapCenterWithMarker('map-adw1',b);    
                        },200);
                    },
                    setStreet: function() {
                        var b = h.formatAddress($scope.donation.streetGeo);
                        $scope.setMap("map-adw", b), 
                        $scope.donation.address = b.formatted_address, 
                        $scope.donation.postalCode = b.postal_code, 
                        $scope.donation.city = b.postal_town
                    }
                },
                whose: {
                    pages:0,
                    currentPage:1,
                    isLoading:'',
                    limit:1,
                    isFirstCall:true,
                    collectors : [],
                    next:function(){
                        if(this.currentPage+1<=this.pages){
                            this.getCollectors(this.currentPage+1);    
                        }
                    }, 
                    previous:function(){
                        if(this.currentPage-1>0){
                            this.getCollectors(this.currentPage-1);    
                        }
                    },
                    select:function(id){
                        var me = this;
                        i.each(me.collectors,function(value){
                            if(value.id==id){
                                $scope.donation.collector_s.id= id;
                                $scope.donation.collector_s.name= value.name;
                                $scope.donation.collector_s.image= value.image;
                                $scope.donation.collector_s.location= value.location;
                            }
                        })
                    },
                    getCollectors: function(pageNumber){
                        console.log(this.collector_s);
                        var lat = 0;
                        var lng = 0;
                        var me = this;
                        debugger;
                        if (typeof($scope.donation.streetGeo) == 'object' ) {
                            lat = $scope.donation.streetGeo.geometry.location.lat;
                            lng = $scope.donation.streetGeo.geometry.location.lng;
                        } else if (typeof($scope.donation.streetGeo) == 'string' ){
                            lat = $scope.donation.lat;
                            lng = $scope.donation.lng;
                        } else {
                            me.isLoading='addressError';
                            return;
                        }
                        me.currentPage = pageNumber;
                        me.isLoading='loading';
                        var request = {
                            success:function(response){
                                me.currentPage = pageNumber;
                                me.pages=response.total_page;
                                me.collectors=response.data.collectors;
                                i.each(me.collectors,function(value){
                                    value.image = setImageFullPath(value.image);
                                })
                                if(me.pages==0){
                                    me.isLoading='noData';    
                                } else {
                                    me.isLoading='';    
                                }
                            },
                            error:function(){
                                me.isLoading='error';  
                            },
                            data:{
                                latitude:lat,
                                longitude:lng,
                                page:pageNumber,
                                limit:$scope.stepData.whose.limit
                            }
                        }
                        DonationService.findCollectors(request);
                    }
                },
                summary: {
                    loadStatus:'',
                    goback:function(){
                        $scope.setStep(3);
                        document.getElementById("adw-page1").style.display = "block";
                    }
                },
                saved: {}
            }, $scope.step = -1, $scope.steps = function() {
                var b = [];
                for (var UserService in $scope.stepData)
                    b.push(UserService);
                return b
            }(),
            $scope.goingBack = !1, 
            $scope.setStep = function(b) {
                console.log('here the step is called');
                $scope.saved = !1,
                b === $scope.step && (b = -1),
                i.each($scope.stepData, function(b) {
                    b.open && $scope.validateStep(b, !0), b.open = !1
                }), 
                $scope.goingBack = b < $scope.step, 
                $scope.step = b, 
                $scope.currStep = $scope.stepData[$scope.getStep()],
                $scope.step === 3 ? $scope.stepData.whose.getCollectors(1):'';
                if($scope.step==2){
                    debugger;
                    $scope.stepData.where.reloadMap();
                } 
                return $scope.currStep && ($scope.currStep.open = !0);
            }, $scope.getStep = function() {
                return $scope.steps[$scope.step]
            }, $scope.isStep = function(b) {
                return $scope.step === b
            }, $scope.cancelPrompt = !1, $scope.cancel = function(b) {
                switch (b) {
                    case void 0:
                        $scope.cancelPrompt = !0;
                        break;
                    case !0:
                        d.dismiss("canceled");
                        break;
                    default:
                        $scope.cancelPrompt = !1
                }
            }, $scope.validateStep = function(b, UserService) {
                return i.isUndefined(b) && (b = $scope.currStep), i.isFunction(b.validate) ? b.validate(UserService) : !0
            }, $scope.validateAllSteps = function(b, UserService, d) {
                var e = !0;
                if (i.each($scope.stepData, function(b, UserService) {
                        if (!(i.isArray(d) && i.indexOf(d, UserService) < 0)) {
                            var f = $scope.validateStep(b);
                            e = e && f
                        }
                    }), b) {
                    $scope.setStep(-1);
                    var g = 0,
                        h = i.size($scope.stepData);
                    i.each($scope.stepData, function(b) {
                        b.validated = !1, b.loading = !0, b.index = g, f(function() {
                            $scope.validateStep(b, !0), b.index >= h - 1 && i.isFunction(UserService) && UserService(e)
                        }, 300 * (g + 1)), g++
                    })
                } else
                    i.isFunction(UserService) && UserService(e);
                return e
            }, $scope.nextStep = function(b) {
                ($scope.validateStep($scope.currStep, !0) || !b) && $scope.setStep($scope.step + 1)
            }, $scope.prevStep = function() {
                $scope.setStep($scope.step - 1)
            };
        var m = {
            trying: function() {
                $scope.currStep.loginStatus = "trying"
            },
            success: function() {
                $scope.currStep.loginStatus = "success", f(function() {
                    $scope.currStep.tab = ""
                }, 500)
            },
            error: function() {
                $scope.currStep.loginStatus = "error"
            }
        };
        $scope.setMap = function($scope, b) {
            try {
                {
                    var UserService = h.formatAddress(b),
                        d = h.setMap($scope, {
                            geometry: UserService.geometry
                        }),
                        e = b.geometry.location;
                    h.setMapMarker({
                        map: d,
                        lat: e.lat,
                        lng: e.lng
                    })
                }
            } catch (f) {}
        }, $scope.gotoSummary = function() {
            $scope.validateAllSteps(!0,function(isValid){
                isValid ? ($scope.setStep(4),
                $scope.setMap("map-adw2", $scope.donation.streetGeo),
                document.getElementById("adw-page2").style.display = "block"):'';
            },["what", "who", "where", "whose"]);
            
            // $scope.submitDonation();
        }, $scope.trySave = function() {
            if($scope.validateStep($scope.stepData.summary, !0)){
                $scope.submitDonation();    
            }
            // $scope.validateStep($scope.stepData.summary, !0) && $scope.addDonation(function() {
            //     $scope.gotoPage("saved", !0, !1)
            // })
        }, $scope.gotoSaved = function() {
            $scope.saved = !0, f(function() {
                document.getElementById("adw-page2").style.display = "none"
            }, 500)
        }, $scope.addDonation = function(b) {
            $scope.donation.lat = $scope.donation.streetGeo.geometry.location.lat, $scope.donation.lng = $scope.donation.streetGeo.geometry.location.lng, $scope.donation.geojson = angular.toJson($scope.donation.streetGeo), j.add($scope.donation, b)
        }, $scope.submitDonation = function(){
            debugger;
            $scope.stepData.summary.loadStatus = 'trying';
            var lat = typeof($scope.donation.streetGeo)=='string'? $scope.donation.lat: $scope.donation.streetGeo.geometry.location.lat;
            var lng = typeof($scope.donation.streetGeo)=='string'? $scope.donation.lng: $scope.donation.streetGeo.geometry.location.lng;
            var postalcode = typeof($scope.donation.postalCodeGeo)=='string'? $scope.donation.postalCodeGeo: $scope.donation.postalCodeGeo.postal_code;
            var data = {
                'donation[things_attributes][0][thing_name]':'PlasticBag',
                'donation[things_attributes][0][quantity]':$scope.donation.bagsSmall,
                'donation[things_attributes][1][thing_name]':'RefuseSack',
                'donation[things_attributes][1][quantity]':$scope.donation.bagsMedium,
                'donation[things_attributes][2][thing_name]':'PaperBag',
                'donation[things_attributes][2][quantity]':$scope.donation.bagsLarge,
                'donation[postal_code]':postalcode,
                'donation[street_address]':$scope.donation.address,
                'donation[latitude]':lat,
                'donation[longitude]':lng
            }
            if($scope.donation.collector_s.id){
                data['donation[collector_id]']=$scope.donation.collector_s.id
            }
            if(b.user.userLogedIn==false){
                data['donation[doner_name]']= $scope.donation.contactName
                data['donation[doner_email]'] = $scope.donation.contactEmail
                data['donation[doner_contact]']  = $scope.donation.contactTelephone
            }
            var request = {
                success:function(response){
                    $scope.stepData.summary.loadStatus = '';
                    $scope.gotoSaved();
                    console.log(response);
                },
                error:function(response){
                    $scope.stepData.summary.loadStatus = 'error';
                },
                data:data
            };
            DonationService.addDonation(request)
        }
        $scope.stepData.where.setStreetFirstTime();
    }])

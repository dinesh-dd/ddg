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
            // $scope.selectedCollector = k.current.params.param1,
            // $scope.gotoPage = function(b, UserService, d) {
            //     var e = "/pop/addDonation/";
            //     return i.isUndefined(k.current.params.param1) || (e += k.current.params.param1), e += "/" + b, UserService && l.replace(), l.url(e), d && $scope.$apply(), e
            // }, 
            // $scope.$on("$routeChangeStart", function(b, UserService) {
            //     var d = UserService.params.param2;
            //     switch (i.isString(d) && (d = d.toLowerCase()), d) {
            //         case "summary":
            //             $scope.gotoSummary();
            //             break;
            //         case "saved":
            //             $scope.gotoSaved();
            //             break;
            //         default:
            //             i.isObject($scope.stepData[d]) ? $scope.setStep(i.indexOf($scope.steps, d)) : $scope.setStep(-1)
            //     }
            // }), 
            // $scope.gotoPage("", !0),
            $scope.acceptTest = !0, $scope.donation = {
                bagsSmall: 0,
                bagsMedium: 0,
                bagsLarge: 0,
                acceptTerms: !1
            }, 
            $scope.applyUser = function() {
                return i.extend($scope.donation, {
                    contactName: b.user.Name,
                    contactEmail: b.user.Email,
                    contactTelephone: b.user.Telephone,
                    address: b.user.Address,
                    postalcode: b.user.PostalCode,
                    city: b.user.City,
                    lat: b.user.Lat,
                    lng: b.user.Lng,
                    geojson: "",
                    postalCodeGeo: "",
                    streetGeo: ""
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
                        i.extend($scope.donation.postalCodeGeo, $scope.donation.streetGeo)
                    },
                    getPostalCode: function(a) {
                        return a = a.replace(/[^0-9]/g, ""),
                        h.searchAddress(a, function(b) {
                            debugger;
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
                        }), $scope.donation.postalCode = $scope.donation.postalCodeGeo.postal_code, $scope.donation.city = $scope.donation.postalCodeGeo.postal_town, f(function() {
                            document.getElementById("adw-address").focus()
                        }, 100)
                    },
                    getStreet: function(b) {
                        return h.searchAddress({
                            address: b,
                            components: GLOBALS.map.components + "|postal_code:" + $scope.donation.postalCodeGeo.postal_code
                        }, function($scope) {
                            var b = h.formatAddresses($scope.data.results);
                            return b = i.filter(b, function($scope) {
                                return i.isString($scope.formatted_address_street)
                            }), b = i.sortBy(b, function($scope) {
                                return $scope.formatted_address_street
                            })
                        })
                    },
                    setStreet: function() {
                        var b = h.formatAddress($scope.donation.streetGeo);
                        $scope.setMap("map-adw", b), $scope.donation.address = b.formatted_address_street, $scope.donation.postalCode = b.postal_code, $scope.donation.city = b.postal_town
                    }
                },
                whose: {
                    pages:10,
                    currentPage:1,
                    isLoading:false,
                    collectors : [
                        {
                            name: 'Dinesh Dabhi',
                            image : 'http://creativepool.com/marketing/images/minions-1.jpg', 
                            location : 'Ahmedabad',
                            star : 3,
                            pledge:1000,
                            objective:'This is my objective to collect something'
                        },
                        {
                            name: 'Dinesh Dabhi',
                            image : '', 
                            location : 'Ahmedabad naroda, Gujarat, India',
                            star : 3,
                            pledge:1000,
                            objective:'This is my objective to collect something'
                        },
                    ],
                    // getCollectors: function(){
                    //     UserService.findCollectors()
                    //     console.log('getting the collectors');
                    // }
                },
                summary: {},
                saved: {}
            }, $scope.step = -1, $scope.steps = function() {
                var b = [];
                for (var UserService in $scope.stepData)
                    b.push(UserService);
                return b
            }(), $scope.goingBack = !1, $scope.setStep = function(b) {
                $scope.saved = !1, b === $scope.step && (b = -1), i.each($scope.stepData, function(b) {
                    b.open && $scope.validateStep(b, !0), b.open = !1
                }), $scope.goingBack = b < $scope.step, $scope.step = b, $scope.currStep = $scope.stepData[$scope.getStep()], $scope.currStep && ($scope.currStep.open = !0)
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
        $scope.tryLogin = function() {
            m.trying();
            var b = angular.extend($scope.currStep.login, m);
            UserService.login(b)
        }, $scope.tryFbLogin = function() {
            m.trying(), UserService.loginByFacebook(m)
        }, $scope.setMap = function($scope, b) {
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
            // $scope.validateAllSteps(!0, function(b) {
            //     b ? ($scope.stepData.summary.validated = !1,
            //     $scope.setMap("map-adw2", $scope.donation.streetGeo),
            //     $scope.setStep(4)) : $scope.gotoPage("", !0, !0)
            // }, ["what", "who", "where", "whose"]), 
            console.log('this is gotoSummery');
            try{
                $scope.setStep(4);
                document.getElementById("adw-page2").style.display = "block"    
            } catch(e){
                console.log(e);
            }
            
        }, $scope.trySave = function() {
            $scope.validateStep($scope.stepData.summary, !0) && $scope.addDonation(function() {
                $scope.gotoPage("saved", !0, !1)
            })
        }, $scope.gotoSaved = function() {
            $scope.saved = !0, f(function() {
                document.getElementById("adw-page2").style.display = "none"
            }, 500)
        }, $scope.addDonation = function(b) {
            $scope.donation.lat = $scope.donation.streetGeo.geometry.location.lat, $scope.donation.lng = $scope.donation.streetGeo.geometry.location.lng, $scope.donation.geojson = angular.toJson($scope.donation.streetGeo), j.add($scope.donation, b)
        }
    }])

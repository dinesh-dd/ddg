'use strict';

/**
 * @ngdoc function
 * @name gePantApp.controller:AdddonationCtrl
 * @description
 * # AdddonationCtrl
 * Controller of the gePantApp
 */
angular.module('gePantApp')
    .controller('AdddonationCtrl', ["$scope", "$rootScope", "UserService", "PreloadService", "$timeout", "$interval", "MapService", "_", "DonationApi", "$route", "$location", "DonationService", function($scope, b, UserService, e, f, g, h, i, j, k, l, DonationService) {
        var d = $scope.modalInstance;
        $scope.map1 = null;
        $scope.latitude = null;
        $scope.longitude = null;
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
                collector_s: GLOBALS.collectorID,
            },
            $scope.applyUser = function() {
                try {
                    b.user.postal_code = JSON.parse(b.user.postal_code);
                    b.user.street_address = JSON.parse(b.user.street_address);
                } catch (e) {
                    console.log('error in convertiing to json');
                }
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
                        formWhere.address.value = ($scope.donation.streetGeo && $scope.donation.streetGeo.formatted_address_street) || $scope.donation.streetGeo;
                        formWhere.postalCode.value = ($scope.donation.postalCodeGeo && $scope.donation.postalCodeGeo.formatted_address_postal) || $scope.u.postal_code;
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
                        h.setMapWithMarker("map-adw3", {
                            geometry: $scope.donation.postalCodeGeo.geometry
                        });
                        $scope.donation.postalCode = $scope.donation.postalCodeGeo.postal_code,
                            $scope.donation.city = $scope.donation.postalCodeGeo.postal_town,
                            f(function() {
                                document.getElementById("adw-address").focus()
                            }, 100)
                    },
                    getStreet: function(b) {
                        var postalcode = typeof($scope.donation.postalCodeGeo) == "string" ? $scope.donation.postalCodeGeo : $scope.donation.postalCodeGeo.postal_code;
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
                    setStreet: function() {
                        try {
                            var b = h.formatAddress($scope.donation.streetGeo);
                            $scope.setMap("map-adw3", b),
                                $scope.donation.address = b.formatted_address || donation.streetGeo,
                                h.setMapWithMarker("map-adw3", {
                                    geometry: $scope.donation.streetGeo.geometry
                                });
                            // $scope.donation.postalCode = b.postal_code,
                            // $scope.donation.city = b.postal_town
                        } catch (e) {
                            console.error("getting error in setting the street");
                        }
                    },

                    /**
                     * @method getLatLong
                     * function to get the lat long 
                     */
                    getLatLong: function() {
                        var location = {
                            lat: null,
                            lng: null
                        };
                        if ($scope.donation.streetGeo && $scope.donation.streetGeo.geometry) {
                            if ($scope.donation.postalCodeGeo && $scope.donation.postalCodeGeo.geometry) { //if postal code is selected then only go inside
                                location.lat = $scope.donation.streetGeo.geometry.location.lat;
                                location.lng = $scope.donation.streetGeo.geometry.location.lng;
                            } else {
                                location.lat = null, location.lng = null;
                            }
                        } else if ($scope.donation.postalCodeGeo && $scope.donation.postalCodeGeo.geometry) {
                            location.lat = $scope.donation.postalCodeGeo.geometry.location.lat;
                            location.lng = $scope.donation.postalCodeGeo.geometry.location.lng;
                        } else {
                            location.lat = null, location.lng = null;
                        }
                        console.info(location);
                        return location;
                    },
                    /**
                     * @method changeMap
                     * function to change the map view and center
                     */
                    changeMap: function(mapID) {
                        mapID = mapID || "map-adw3";
                        var geometry = null;
                        if ($scope.donation.streetGeo && $scope.donation.streetGeo.geometry) {
                            if ($scope.donation.postalCodeGeo && $scope.donation.postalCodeGeo.geometry) { //if postal code is selected then only go inside
                                geometry = $scope.donation.streetGeo.geometry;
                            } else {
                                geometry = null;
                            }
                        } else if ($scope.donation.postalCodeGeo && $scope.donation.postalCodeGeo.geometry) {
                            geometry = $scope.donation.postalCodeGeo.geometry;
                        } else {
                            geometry = null;
                        }
                        if (geometry) {
                            h.setMapWithMarker(mapID, {
                                geometry: geometry
                            });
                        } else {
                            angular.element('#' + mapID).empty()
                        }
                    }
                },
                whose: {
                    pages: 0,
                    currentPage: 1,
                    isLoading: '',
                    limit: 1,
                    isFirstCall: true,
                    collectors: [],
                    next: function() {
                        if (this.currentPage + 1 <= this.pages) {
                            this.getCollectors(this.currentPage + 1);
                        }
                    },
                    previous: function() {
                        if (this.currentPage - 1 > 0) {
                            this.getCollectors(this.currentPage - 1);
                        }
                    },
                    select: function(id) {
                        var me = this;
                        i.each(me.collectors, function(value) {
                            if (value.id == id) {
                                $scope.donation.collector_s.id = id;
                                $scope.donation.collector_s.name = value.name;
                                $scope.donation.collector_s.image = value.image;
                                $scope.donation.collector_s.location = value.location;
                            }
                        })
                    },
                    getCollectors: function(pageNumber) {
                        var me = this;
                        var location = $scope.stepData.where.getLatLong();
                        if (location.lat == null) {
                            return;
                        }
                        me.currentPage = pageNumber;
                        me.isLoading = 'loading';
                        var request = {
                            success: function(response) {
                                me.currentPage = pageNumber;
                                me.pages = response.total_page;
                                me.collectors = response.data.collectors;
                                i.each(me.collectors, function(value) {
                                    value.image = setImageFullPath(value.image);
                                    try {
                                        value.location = JSON.parse(value.location);
                                    } catch (e) {
                                        // console.error('error in location convert to json')
                                    }
                                    value.location = (value.location && value.location.formatted_address) || value.location;
                                })
                                if (me.pages == 0) {
                                    me.isLoading = 'noData';
                                } else {
                                    me.isLoading = '';
                                }
                            },
                            error: function() {
                                me.isLoading = 'error';
                            },
                            data: {
                                latitude: location.lat,
                                longitude: location.lng,
                                page: pageNumber,
                                limit: $scope.stepData.whose.limit
                            }
                        }
                        DonationService.findCollectors(request);
                    }
                },
                summary: {
                    loadStatus: '',
                    goback: function() {
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
                    $scope.step === 3 ? $scope.stepData.whose.getCollectors(1) : '';
                if ($scope.step == 2) {
                    setTimeout(function() {
                        $scope.stepData.where.changeMap();
                    }, 1500);

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
            $scope.validateAllSteps(!0, function(isValid) {
                isValid ? ($scope.setStep(4),
                    $scope.stepData.where.changeMap("map-adw2"),
                    // setMap("map-adw2", $scope.donation.streetGeo),
                    document.getElementById("adw-page2").style.display = "block") : '';
            }, ["what", "who", "where", "whose"]);
            $scope.donation.address = formWhere.address.value;
        }, $scope.trySave = function() {
            if ($scope.validateStep($scope.stepData.summary, !0)) {
                $scope.submitDonation();
            }
        }, $scope.gotoSaved = function() {
            $scope.saved = !0, f(function() {
                document.getElementById("adw-page2").style.display = "none"
            }, 500)
        }, $scope.addDonation = function(b) {
            $scope.donation.lat = $scope.donation.streetGeo.geometry.location.lat, $scope.donation.lng = $scope.donation.streetGeo.geometry.location.lng, $scope.donation.geojson = angular.toJson($scope.donation.streetGeo), j.add($scope.donation, b)
        }, $scope.submitDonation = function() {
            $scope.stepData.summary.loadStatus = 'trying';
            var location = $scope.stepData.where.getLatLong();
            var postalcode = typeof($scope.donation.postalCodeGeo) == 'string' ? $scope.donation.postalCodeGeo : $scope.donation.postalCodeGeo.postal_code;
            var data = {
                'donation[things_attributes][0][thing_name]': 'PlasticBag',
                'donation[things_attributes][0][quantity]': $scope.donation.bagsSmall,
                'donation[things_attributes][1][thing_name]': 'RefuseSack',
                'donation[things_attributes][1][quantity]': $scope.donation.bagsMedium,
                'donation[things_attributes][2][thing_name]': 'PaperBag',
                'donation[things_attributes][2][quantity]': $scope.donation.bagsLarge,
                'donation[postal_code]': postalcode,
                'donation[street_address]': $scope.donation.address,
                'donation[latitude]': location.lat,
                'donation[longitude]': location.lng
            }
            if ($scope.donation.collector_s.id) {
                data['donation[collector_id]'] = $scope.donation.collector_s.id
            }
            if (b.user.userLogedIn == false) {
                data['donation[doner_name]'] = $scope.donation.contactName
                data['donation[doner_email]'] = $scope.donation.contactEmail
                data['donation[doner_contact]'] = $scope.donation.contactTelephone
            }
            var request = {
                success: function(response) {
                    $scope.stepData.summary.loadStatus = '';
                    $scope.gotoSaved();
                    console.log(response);
                },
                error: function(response) {
                    $scope.stepData.summary.loadStatus = 'error';
                },
                data: data
            };
            DonationService.addDonation(request)
        }
        $scope.stepData.where.changeMap();
    }])

'use strict';

angular.module('gePantApp')
.config(function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/');
		$urlRouterProvider.when('/om-gepant','om-gepant/omGepant');
		$stateProvider
		.state('app', {
			url: '',
			abstract: true,
			resolve: {
				user: function($http,$rootScope,UserService) {
					//return $http.get('http://httpbin.org/delay/5');
					UserService.getCollectors(1,4,function(collectors){
                        $rootScope.collectors = collectors;
					});
					var request = {
						success: function(response){                 
							$rootScope.total__donations =   response.data.data.total_donations || 0;
							UserService.setUser(response.data.data.profileData);
							UserService.setDonations(response.data.data.totalDonations);
							return response.data.data.profileData;
						},
						error:function(response){
							$rootScope.total__donations =   response.data.data.total_donations || 0;
							UserService.setUser(null);
							UserService.setDonations(null);
							return null;
						}
					}; 
					return $http.get(GLOBALS.apiUrl+'session_data.json')
						.then(  
							function(response){ 
								return UserService.validateResponse(request,response);
							}, 
							function(){ 
								return request.error();
							}
						);
				}
			}
		})
		.state('home', {
			parent:'app',
			url: '/',
			views: {
				'page@': { 
					templateUrl: 'views/home.html',
					controller:'HomeCtrl',
				},
				'nav-right@': { 
					templateUrl : 'views/navigation/navigation.html'
				}
			}
		})

		//collector profile view
		.state('collector', {
			url: '/collector/:id',
			parent:'app',
			views: {
				'page@': { 
					templateUrl: 'views/collectorProfile.html',
					controller:'CollectorprofileCtrl'
				 },
				'nav-right@': { 
					templateUrl : 'views/navigation/navigation.html',
				}
			},
			resolve: {
				collector: function($http,$rootScope,UserService,$stateParams,$state) {
					var request = {
						success: function(response){
							var collectorData = response.data.data.profileData;
							collectorData.image = setImageFullPath(collectorData.image);
							try{
                                collectorData.street_address = JSON.parse(collectorData.street_address);
                            } catch(e){console.error('error in location convert to json')}
                            collectorData.street_address = (collectorData.street_address && collectorData.street_address.formatted_address) || collectorData.street_address;
							return collectorData;
						},
						error:function(){
							return null;
						}
					}; 
					return $http({
						method: "POST",
						url:GLOBALS.apiUrl+"collector_profile.json",
						data: 'user[id]='+$stateParams.id
					}).then(  
						function(response){
							return UserService.validateResponse(request,response);
						}, 
						function(){ 
							return request.error();
						}
					);
				}
			}
		})
		.state('allCollectors',{
			url:'/allCollectors/',
			parent:'app',
			views: {
				'page@': { 
					templateUrl: 'views/collectors.html',
					controller:'CollectorsCtrl'
				 },
				'nav-right@': { 
					templateUrl : 'views/navigation/navigation.html',
				}
			}
		})

		//--------------Model--------------
		// .state('modal', {
		//     url: 'pop/',
		//     abstract:true,
		//     onEnter: ['$modal', '$state', function($modal, $state) {
		//         console.log('Open modal');
		//         $modal.open({
		//           template: '<div ui-view="modal"></div>',
		//           controller:'PopcontrollerCtrl'
		//         }).result.finally(function() {
		//           $state.go('home');
		//       });
		//     }]
		//   })

		//   .state('modal.login', {
		//     url: 'login/',
		//     views: {
		//       'modal@': {
		//         templateUrl: 'views/login.html',
		//         controller:'LoginCtrl',
		//       }
		//     }
		//   })

		// .state('logout', {
		//     url: 'logout/',
		//     parent: 'modal',
		//     views: {
		//       'modal@': {
		//         templateUrl: 'views/logout.html',
		//         controller:'LogoutCtrl'
		//       }
		//     }
		// })

		// .state('signup', {
		//     url: 'signup/',
		//     parent: 'modal',
		//     views: {
		//       'modal@': {
		//         templateUrl: 'views/signup.html',
		//         controller:'SignupCtrl'
		//       }
		//     }
		// })
		
		// .state('addDonation', {
		//     url: 'addDonation/',
		//     parent: 'modal',
		//     views: {
		//       'modal@': {
		//         templateUrl: 'views/addDonation.html',
		//         controller:'AdddonationCtrl'
		//       }
		//     }
		// })
	  });
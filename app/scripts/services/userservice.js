'use strict';

/**
 * @ngdoc service
 * @name gePantApp.UserService
 * @description
 * # UserService
 * Service in the gePantApp.
 */
angular.module('gePantApp')
	.service("UserService",function(MemberApi,$rootScope,$window,$translate,$cookieStore,modalService,$state) {
        var validateResponse = function(request,response,checkAuth){
            checkAuth = typeof(checkAuth) == 'undefined' ? true:checkAuth;
            if(typeof(response) == 'object' &&  
                (   //check if direct http request is made
                    (response.data && response.data.result && response.data.result.rstatus != 0 ) 
                    ||  //check if response from the resources
                    (response.result && response.result.rstatus != 0)
                )
               ) 
            {
                return request.success(response);
            } else {
                if( (
                        (response.data && response.data.result && response.data.result.errorcode == 401) ||
                        (response.result && response.result.errorcode == 401)
                    ) 
                ){  //check if its an authentication error
                    debugger;
                    console.log(response.config);
                    if(response.config && response.config.url.indexOf('session')>-1){
                        return request.error(response);    
                    }
                    var language = $rootScope.user.language;
                    $rootScope.user = {
                        userLogedIn:false,
                        language:language
                    }
                    $cookieStore.remove("token");
                    $state.go('home');
                    modalService.openModal('loginError','LoginerrorCtrl'); 
                    if(!checkAuth){ //if there is checkauth param is false then respond the error
                        return request.error(response);    
                    }
                    return false;
                } else {
                    return request.error(response);    
                }
            }
        }
        var setDonations =function(totalDonations){
            $rootScope.totalDonations = totalDonations;
            $('footer').removeClass('hidden');
        }
        var setUser= function(user){
            if(user){
                $rootScope.user = user;
                $rootScope.user.userLogedIn = true;
                $rootScope.user.image= setImageFullPath($rootScope.user.image);
                setLanguage($rootScope.user.language);
                console.log($rootScope.user);    
            } else {
                $rootScope.user = {
                    userLogedIn:false
                }
                setLanguage(null);
            }
        }
        var setLanguage = function(language){
            if(language==null){ //set language from browser
                try{
                    language = navigator.languages[0];
                } catch(e){
                    language = navigator.language || 'sv';
                }
            }
            var returnLanguage = null;
            switch(language){
                case 'en-US':
                case 'English':
                    returnLanguage = 'English';
                    break;
                case 'sv':
                case 'Swedish':
                    returnLanguage = 'Swedish';
                    break;
                default:
                    returnLanguage = 'English';
                    break;
            }
            $rootScope.user.language = returnLanguage;
            $translate.use(languageCode[returnLanguage]);
        }
        var c = {};
        return c = {
            setDonations:setDonations,
            setUser:setUser,
            validateResponse:validateResponse,
            setLanguage: setLanguage,
        	login: function(user) {
                typeof user  == "object"  && MemberApi.login(user, function(a, d) {
                  	validateResponse(user,a);
                }, user.error)
            },
            session: function(user){
                typeof user  == "object"  && MemberApi.current(user, function(a, d) {
                    validateResponse(user,a);
                }, user.error)
            },
            loginByFacebook: function(user) {
                typeof user  == "object"  && MemberApi.loginByFacebook(user,function(a, d) {
                    validateResponse(user,a);
                }, user.error)
            },
            signUpByFacebook:function(user) {
                typeof user  == "object"  && MemberApi.signUpByFacebook(user,function(a, d) {
                    validateResponse(user,a);
                }, user.error)
            },
            createUser:function(user){
                typeof user  == "object"  && MemberApi.create(user, function(a, d) {
                    validateResponse(user,a);
                }, user.error)
            },
            logout:function(user){
                typeof user  == "object"  && MemberApi.logout(user, function(a, d) {
                    console.log('getting success in logout');
                }, user.error);
            },
            updateSetting:function(user){
                typeof user  == "object"  && MemberApi.updateSetting(user, function(a, d) {
                    validateResponse(user,a);
                }, user.error)
            },
            editProfile:function(user){
                typeof user  == "object"  && MemberApi.editProfile(user, function(a, d) {
                    validateResponse(user,a);
                }, user.error)  
            },
            language_setting:function(user){
                typeof user  == "object"  && MemberApi.language_setting(user, function(a, d) {
                    validateResponse(user,a,false);
                }, user.error)  
            },
            getCollectors:function(pageNumber,limit,callback){
                var request = {
                    success:function(response){
                        console.log('got success');
                        console.log(response.data.collectors); 
                        _.each(response.data.collectors,function(value){
                            var percentage   = 0;
                            value.image = setImageFullPath(value.image);
                            if(value.collector_pledge){
                                if(value.collector_totalThings){
                                    percentage = (value.collector_totalThings/value.collector_pledge) * 100;
                                    percentage = Math.round(percentage);
                                }
                            }
                            value.percentage = percentage;
                        });
                        return callback(response.data.collectors,response.total_page);
                    },
                    error:function(response){
                        console.error('got error in collectors getting');
                        return callback(null);
                    },
                    data:{
                        page:pageNumber,
                        limit:limit
                    }
                }
                MemberApi.getCollectors(request,function(response){
                    validateResponse(request,response);
                },request.error)
            }
        }
    });
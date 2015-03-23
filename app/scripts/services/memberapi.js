'use strict';
// var apiUrl  = 'http://192.168.1.35/WorkSpace/OfficeWork/GPent/Gepant/app/api/';
/**
 * @ngdoc service
 * @name gePantApp.MemberApi
 * @description
 * # MemberApi
 * Service in the gePantApp.
 */
angular.module('gePantApp')
    .service('MemberApi', ['$resource', function($resource) {
    return $resource(GLOBALS.apiUrl + ':methodName/:id', {
        method: '@method',
        id: '@id',
         
    }, {
        current: {
            method: 'GET',
            params: {
                methodName: 'session_data.json'
            }
        },
        create: {
            method: 'POST',
            params: {
                methodName: 'sign_up.json'
            },
        },
        login: {
            method: 'POST',
            params: {
                methodName: 'login.json'
            }
        },
        loginByFacebook: {
            method: 'POST',
            params: {
                methodName: 'login_with_facebook.json'
            }
        },
        logout: {
            method: 'GET',
            params: {
                methodName: 'logout.json'
            }
        }
    });
}]);

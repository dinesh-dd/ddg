'use strict';
var apiUrl  = 'http://192.168.1.35/WorkSpace/OfficeWork/GPent/GePant/app/api/';
/**
 * @ngdoc service
 * @name gePantApp.MemberApi
 * @description
 * # MemberApi
 * Service in the gePantApp.
 */
angular.module('gePantApp')
    .service('MemberApi', ['$resource', function($resource) {
    return $resource(apiUrl + ':methodName/:id', {
        method: '@method',
        id: '@id'
    }, {
        get: {
            method: 'GET',
            params: {
                methodName: 'GetMemberById'
            }
        },
        current: {
            method: 'GET',
            params: {
                methodName: 'GetCurrentMember'
            }
        },
        query: {
            method: 'GET',
            params: {
                methodName: 'GetAllMembers'
            },
            isArray: !0
        },
        create: {
            method: 'POST',
            params: {
                methodName: 'AddMember'
            }
        },
        login: {
            method: 'POST',
            params: {
                methodName: 'login'
            }
        },
        loginByFacebook: {
            method: 'POST',
            params: {
                methodName: 'MemberLoginByFacebook'
            }
        },
        logout: {
            method: 'GET',
            params: {
                methodName: 'MemberLogout'
            }
        }
    });
}]);

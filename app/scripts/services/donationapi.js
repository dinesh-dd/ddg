'use strict';

/**
 * @ngdoc service
 * @name gePantApp.DonationApi
 * @description
 * # DonationApi
 * Service in the gePantApp.
 */
angular.module('gePantApp')
  .service('DonationApi', ['$resource', function($resource) {
    return $resource(GLOBALS.apiUrl + ':methodName/:id', {
        method: '@method',
        id: '@id',
         
    }, {
        searchCollector: {
            method: 'GET',
            params: {
                methodName: 'searchCollectors.json'
            }
        },
        collector: {
            method: 'GET',
            params: {
                methodName: 'collector.json'
            },
        },
        collectors: {
            method: 'GET',
            params: {
                methodName: 'collectors.json'
            }
        },
        donators: {
            method: 'GET',
            params: {
                methodName: 'donors.json'
            }
        },
        donationRequests: {
            method: 'GET',
            params: {
                methodName: 'donationRequests.json'
            }
        },
        donationResponse: {
            method: 'POST',
            params: {
                methodName: 'donationResponse.json'
            }
        },
    });
}]);

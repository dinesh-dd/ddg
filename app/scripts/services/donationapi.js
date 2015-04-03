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
        id: '@id'
    }, {
        searchCollector: {
            method: 'POST',
            params: {
                methodName: 'search.json'
            }
        },
        collector: {
            method: 'GET',
            params: {
                methodName: 'collector.json'
            },
        },
        addDonation:{
            method: 'POST',
            params: {
                methodName: 'donations.json'
            }
        },
        collections: {
            method: 'GET',
            params: {
                methodName: 'collectors.json'
            }
        },
        donations: {
            method: 'GET',
            params: {
                methodName: 'list_of_donations.json'
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
        submitRating:{
            method: 'POST',
            params: {
                methodName: 'update_ratings.json'
            }  
        }
    });
}]);

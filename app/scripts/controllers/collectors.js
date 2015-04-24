'use strict';

/**
 * @ngdoc function
 * @name gePantApp.controller:CollectorsCtrl
 * @description
 * # CollectorsCtrl
 * Controller of the gePantApp
 */
angular.module('gePantApp')
    .controller('CollectorsCtrl',function($scope,UserService,$timeout,$location){ 
        $scope.disableLoadMore = false;
        $scope.page = 1;
        $scope.total_page = 1;
        $scope.status = "loading";
        $scope.loadMoreStatus = "";
        $scope.FirstPageLimit = 12;
        UserService.getCollectors($scope.page,$scope.FirstPageLimit,function(collectors,total_page){
            if(!collectors){
                $scope.status = "error";
                $scope.disableLoadMore = true;
                return;
            }
            $scope.status = "";
            $scope.collectors=collectors;
            $scope.total_page =total_page;
            if($scope.total_page <= $scope.page){
                $scope.disableLoadMore = true;
            }
        });
        $scope.gotoCollector = function(id){
            var state= "collector/"+id;
            $location.path(state).search('showDonate','true');
        }
        $scope.loadMore = function(){ 
            $scope.loadMoreStatus = "loading";
            $scope.page++;
        	UserService.getCollectors($scope.page,8,function(collectors,total_page){
                if(!collectors){
                    $scope.isError =true;
                    $scope.page--;
                    $scope.loadMoreStatus = "error";
                    $timeout(function() {
                        $scope.loadMoreStatus = "";
                    }, 2000);
                    return;
                }   
                $scope.loadMoreStatus = "";
                $scope.total_page =total_page;
                if($scope.total_page <= $scope.page){
                    $scope.disableLoadMore = true;
                }
                for (var i = 0; i < collectors.length; i++) {
                    $scope.collectors.push(collectors[i]);
                }    
            });
        }
    });

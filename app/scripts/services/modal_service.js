'use strict';

/**
 * @ngdoc service
 * @name gePantApp.modalService
 * @description
 * # modalService
 * Service in the gePantApp.
 */
angular.module('gePantApp')
  .service('modalService', function ($modal,$timeout,$rootScope) {
  	$rootScope.modal_opened =false;
  	var modal = null;
  	this.openModal = function(template,controller){
  		var timeout = 0;
  		if($rootScope.modal_opened){
  			this.closeModal();
  			timeout = 500;
  		}
  		$timeout(function() {
  			modal = $modal.open({
			    templateUrl: 'views/'+template+'.html',
			    controller: controller,
		    })
		    modal.opened.then(function(){
		    	console.log('this is open response');
		    	$rootScope.modal_opened = true;
		    	$timeout(function() {
		    		var height = window.screen.height>$('#site').height() ? window.screen.height : $('#site').height();
            height+=82;
		    		$('.modal-backdrop').height(height);
		    	}, 1000);	    	
		    });
		    modal.result.finally(function(){
		    	console.log('this is close response');
		    	$rootScope.modal_opened =false;
          GLOBALS.collectorID = {};
		    })	
  		}, timeout);
  	}
  	this.closeModal = function(){
  		modal.close();
  	}
    // AngularJS will instantiate a singleton by calling "new" on this function
  });

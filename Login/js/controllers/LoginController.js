"use strict";

angular.module('loginApp').controller('loginCtrl',loginCrtFnt);

loginCrtFnt.$inject=['$scope','$log', 'login','$window', '$sessionStorage'];

function loginCrtFnt($scope, $log, login, $window, $sessionStorage){

	$scope.error = false;

	$scope.logAuth = function() {
		$log.info('user email', $scope.user.email);
		$log.info('user pwd', $scope.user.pwd);

		var futurContent=login.authAsk($scope.user.email,$scope.user.pwd);
		futurContent.then(
			function(payload){
				if(payload == '')
					$scope.error = true ;
				//TODO write token in $sessionStorage or in cookies depending on API
				$sessionStorage.user = payload;
				$log.info($sessionStorage.user);
				$window.location.href = '../ContactList/index.html';

            },
			function(errorPayload){
				//TODO Here add toast material error pwd or email false
			});
	};

}
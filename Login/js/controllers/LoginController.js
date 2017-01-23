"use strict";

angular.module('loginApp').controller('loginCtrl',loginCrtFnt);

loginCrtFnt.$inject=['$scope','$log', 'login','$window', '$sessionStorage', '$mdToast', '$timeout'];

function loginCrtFnt($scope, $log, login, $window, $sessionStorage, $mdToast, $timeout){


	$scope.logAuth = function() {
		//$log.info('user email', $scope.user.email);
		//$log.info('user pwd', $scope.user.pwd);

		var futurContent=login.authAsk($scope.user.email,$scope.user.pwd);
		futurContent.then(
			function(payload){
                $timeout($scope.openToastSuccess);
				//$log.info("payload  :  ", payload);
                //$log.info("payload.user  :  ", payload.user);
                //$log.info("payload.token  :  ", payload.token);
                $sessionStorage.user = payload.user;
                $sessionStorage.token = payload.token;
				$log.info($sessionStorage.user);
				$window.location.href = '../ContactList/index.html';
            },
			function(errorPayload){
                $timeout($scope.openToastError);
			});
	};
	$scope.openToastError = function($event) {
        $mdToast.show(
            $mdToast.simple()
                .textContent('Wrong email or password')
                .position('top left')
        );
    };
    $scope.openToastSuccess = function($event) {
        $mdToast.show(
            $mdToast.simple()
                .textContent('You logged in as ' + $sessionStorage.user['firstName'] + ' ' + $sessionStorage.user['lastName'])
                .position('top left')
        );
    };


}
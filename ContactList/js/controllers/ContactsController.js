angular.module('contactsApp').controller('contactsCtrl',contactsCrtFnt);

contactsCrtFnt.$inject=['$scope','$log','$window', '$sessionStorage', '$timeout', 'contacts'];

function contactsCrtFnt($scope, $log, $window, $sessionStorage, $timeout, contacts){

    $log.info("in contact controller");

    $scope.items = [];

    $sessionStorage.sync;

    var cont = contacts.GetContacts($sessionStorage.token['authToken']);
    cont.then(
        function (payload) {
            $log.info(payload);
        },
        function (errorPayload) {
            $log.error(errorPayload);

        }
    );

    $scope.username = $sessionStorage.user['firstName'] + ' ' + $sessionStorage.user['lastName'];
    $timeout($scope.openToastSuccess);

    $log.info($sessionStorage.user);
    $log.info($sessionStorage.token);

    for (var i = 0; i < 100; i++) {
        $scope.items.push(i);
    }


    $scope.openToastSuccess = function() {
        $mdToast.show(
            $mdToast.simple()
                .textContent('You logged in as ' + $sessionStorage.user['firstName'] + ' ' + $sessionStorage.user['lastName'])
                .position('top left')
        );
    };

    $scope.itemClicked = function () {
        $log.info("click on item works");

    }
}

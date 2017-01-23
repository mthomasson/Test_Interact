angular.module('contactsApp').controller('contactsCtrl',contactsCrtFnt);

contactsCrtFnt.$inject=['$scope','$log','$window', '$sessionStorage', '$timeout', 'contacts'];

function contactsCrtFnt($scope, $log, $window, $sessionStorage, $timeout, contacts){

    //$log.info("in contact controller");

    $scope.items = [];

    $sessionStorage.sync;

    try {
        $scope.username = $sessionStorage.user['firstName'] + ' ' + $sessionStorage.user['lastName'];
        var cont = contacts.GetContacts($sessionStorage.token['authToken']);
        cont.then(
            function (payload) {
                $log.info(payload);
                for (var i = 0; i < payload.data.length; i += 1) {
                    var JSONToAddToItem = {};
                    if (payload.data[i].displayName != null) {
                        JSONToAddToItem["name"] = payload.data[i].displayName;
                        if (payload.data[i].emails != null) {
                            if (payload.data[i].emails.length > 0) {
                                var email = "";
                                for (var j = 0; j < payload.data[i].emails.length; j += 1) {
                                    email += payload.data[i].emails[j].email;
                                    if (j < payload.data[i].emails.length - 1) {
                                        email += " / ";
                                    }
                                }
                                JSONToAddToItem['emails'] = email;
                            }
                        }
                        if (payload.data[i].phoneNumbers != null) {
                            if (payload.data[i].phoneNumbers.length > 0) {
                                var phones = "";
                                for (var j = 0; j < payload.data[i].phoneNumbers.length; j += 1) {
                                    phones += payload.data[i].phoneNumbers[j].number;
                                    if (j < payload.data[i].phoneNumbers.length - 1) {
                                        phones += " / ";
                                    }
                                }
                                JSONToAddToItem['phoneNumbers'] = phones;
                            }
                        }
                        $scope.items.push(JSONToAddToItem);
                    }
                }
            },
            function (errorPayload) {
                $log.error(errorPayload);

            }
        );
    } catch (e){
        $log.info(e);
        $window.location.href = '../Login/index.html';
    }

    $scope.logout = function () {
        $log.info("logging out");
        $sessionStorage.$reset();
        //$http.defaults.headers.common['authToken'] = "";
        $window.location.href = '../Login/index.html';

    }
    
}

angular.module('contactsApp').controller('contactsCtrl',contactsCrtFnt);

contactsCrtFnt.$inject=['$scope','$log','$window', '$sessionStorage', 'contacts'];

function contactsCrtFnt($scope, $log, $window, $sessionStorage, contacts){

    //$log.info("in contact controller");
    $sessionStorage.sync;
    var nbContacts = 5;

    try {
        $scope.username = $sessionStorage.user['firstName'] + ' ' + $sessionStorage.user['lastName'];
    }catch (e){
        $log.info(e);
        $window.location.href = '../Login/index.html';
    }


    $scope.items = {
        numLoaded_: 0,
        toLoad_: 0,
        itemList:[],

        getItemAtIndex: function(index) {
            if (index > this.numLoaded_ && index<=nbContacts) {
                    this.fetchMoreItems_(index);
                return null;
            }

            return this.itemList[index];
        },
        getLength: function() {
            return this.numLoaded_ + 10;
        },
        fetchMoreItems_: function(index) {
            // For demo purposes, we simulate loading more items with a timed
            // promise. In real code, this function would likely contain an
            // $http request.

            $log.info("this.numLoaded_ : ", this.numLoaded_);
            $log.info("this.toLoad_ : ", this.toLoad_);
            $log.info("nbContacts : ", nbContacts);
            $log.info("index : ", index);
            if (this.toLoad_ < index && index<=nbContacts) {
                if (this.numLoaded_ != nbContacts) {
                    if(this.toLoad_ + 20 < nbContacts) {
                        this.toLoad_ += 20;
                    }
                    else{
                        this.toLoad_ = nbContacts;
                    }
                    try {
                        contacts.GetContacts($sessionStorage.token['authToken'], this.numLoaded_, this.toLoad_)
                            .then(angular.bind(this, function (payload) {
                                this.numLoaded_ += payload.data.length;
                                $log.info(payload);

                                nbContacts = payload["count"];
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
                                        if (JSONToAddToItem != {}) {
                                            this.itemList.push(JSONToAddToItem);
                                        }
                                    }
                                }
                            }));
                    } catch (e) {
                        $log.info(e);
                        $window.location.href = '../Login/index.html';
                    }
                }
                else{
                    this.toLoad_ = this.numLoaded_;
                }
            }
        }

    };



    $scope.logout = function () {
        $log.info("logging out");
        var logout = contacts.Logout($sessionStorage.token['authToken']);
        logout.then(function() {
            $sessionStorage.$reset();
            $window.location.href = '../Login/index.html';
        });

        //TODO ADD LOGOUTSERVICE TO API !!!!!!!!!!!!!!!!!!
        //$http.defaults.headers.common['authToken'] = "";


    }
    
}

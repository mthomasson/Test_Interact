angular.module('contactsApp').controller('contactsCtrl',contactsCrtFnt);

contactsCrtFnt.$inject=['$scope','$log','$window', '$sessionStorage', 'contacts', 'contactsParser'];

function contactsCrtFnt($scope, $log, $window, $sessionStorage, contacts, contactsParser){

    //$log.info("in contact controller");
    $sessionStorage.sync;
    var nbContacts = 6;

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
            $log.info("index : ", index);
            if (index > this.numLoaded_) {
                    this.fetchMoreItems_(index);
                return null;
            }
            return this.itemList[index];
        },
        getLength: function() {
            return this.numLoaded_ + 3;
        },
        fetchMoreItems_: function(index) {
            // For demo purposes, we simulate loading more items with a timed
            // promise. In real code, this function would likely contain an
            // $http request.

            $log.info("this.numLoaded_ : ", this.numLoaded_);
            $log.info("this.toLoad_ : ", this.toLoad_);
            $log.info("nbContacts : ", nbContacts);
            $log.info("index : ", index);
            if (this.toLoad_ < index) {
                if (this.numLoaded_ < nbContacts) {
                    if(this.toLoad_ + 10 < nbContacts) {
                        this.toLoad_ += 10;
                    }
                    else{
                        this.toLoad_ = nbContacts;
                    }

                    try {
                        contacts.GetContacts($sessionStorage.token['authToken'], this.numLoaded_, 10)
                            .then(angular.bind(this, function (payload) {
                                this.numLoaded_ += payload.data.length;
                                $log.info(payload);

                                nbContacts = payload["count"];

                                for (var i = 0; i < payload.data.length; i += 1) {
                                    var contactToAdd = contactsParser.parseContact(payload.data[i]);
                                            $log.info(contactToAdd);
                                            this.itemList.push(contactToAdd);
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
    }
    
}

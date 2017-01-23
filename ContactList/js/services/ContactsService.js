angular.module('contactsService', []).service('contacts',contactsFnc);

contactsFnc.$inject=['$http','$q', '$log'];

function contactsFnc($http, $q, $log) {
	
	var fncContainer={
        GetContacts:GetContacts,
        Logout:Logout
	};

	function GetContacts(token, offset, limit){
		var deferred = $q.defer();

        $http.defaults.headers.common['authToken'] = token;

        $log.info($http.defaults.headers);

        var URL_GetContacts = "https://internal-api-staging-lb.interact.io/v2/contacts?offset=" + offset + "&limit=" + limit;
		$log.info(URL_GetContacts);
        $http.get(URL_GetContacts)
   			.then(function successCallback(response) {
    				return deferred.resolve(response.data);
  				}, function errorCallback(response) {
    				return deferred.reject(response.data);
  			});
		
		return deferred.promise;

    }
    function Logout(token){
        var deferred = $q.defer();

        //$http.defaults.headers.common['authToken'] = token;

		body = {
            "authToken":token
        }
        //$log.info($http.defaults.headers);

        var URL_Logout = "https://internal-api-staging-lb.interact.io/v2/logout";
        $http.post(URL_Logout, body)
            .then(function successCallback(response) {
                return deferred.resolve(response.data);
            }, function errorCallback(response) {
                return deferred.reject(response.data);
            });

        return deferred.promise;

    }
    return fncContainer;

}
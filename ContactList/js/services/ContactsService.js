angular.module('contactsService', []).service('contacts',contactsFnc);

contactsFnc.$inject=['$http','$q', '$log'];

function contactsFnc($http, $q, $log) {
	
	var fncContainer={
        GetContacts:GetContacts
	};

	function GetContacts(token){
		var deferred = $q.defer();

        $http.defaults.headers.common['authToken'] = token;

        $log.info($http.defaults.headers);
        var URL_GetContacts = "https://internal-api-staging-lb.interact.io/v2/contacts";
		$http.get(URL_GetContacts)
   			.then(function successCallback(response) {
    				return deferred.resolve(response.data);
  				}, function errorCallback(response) {
    				return deferred.reject(response.data);
  			});
		
		return deferred.promise;

    }
    return fncContainer;

}
angular.module('loginService', []).service('login',authFnc);

authFnc.$inject=['$http','$q'];

function authFnc($http, $q) {
	
	var fncContainer={
		authAsk:authAsk
	};

	function authAsk(email,pwd){
		var deferred = $q.defer();

		var URL_Connection = "https://internal-api-staging-lb.interact.io/v2/login?cached=true";
		$http.post(URL_Connection, {'username':email,'password':pwd})
   			.then(function successCallback(response) {
    				return deferred.resolve(response.data);
  				}, function errorCallback(response) {
    				return deferred.reject(response.status);
  			});
		
		return deferred.promise;
		//return deferred.resolve({"email":email,
		//"token": "zdhziufzifhz5zhebfzebiz09865"});
    }
    return fncContainer;

}
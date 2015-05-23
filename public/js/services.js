angular.module('phonecatServices', ['ngResource']).
factory('Phone', function($resource) {
    return $resource('/public/json//:phoneId.json', {}, {
        query: {
            method: 'GET',
            params: {
                phoneId: 'phones'
            },
            isArray: true
        }
    });
});
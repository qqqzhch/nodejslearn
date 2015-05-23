angular.module('phonecat', ['ngRoute','phonecatFilters','phonecatServices']).
config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/phones', {
            templateUrl: '/public/html/phone-list.html',
            controller: PhoneListCtrl
        }).
        when('/phones/:phoneId', {
            templateUrl: '/public/html/phone-detail.html',
            controller: PhoneDetailCtrl
        }).
        otherwise({
            redirectTo: '/phones'
        });
    }
]);
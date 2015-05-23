define(['angular'],function(angular) {
    return function PhoneListCtrl($scope, $http, Phone) {
        // $http.get('/public/json/nexus-s.json').success(function(data) {
        //     $scope.phones = data;
        // });
console.log('*****');
        $scope.phones = Phone.query();

        $scope.orderProp = 'age';
    }
})
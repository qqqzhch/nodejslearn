function PhoneListCtrl($scope, $http, Phone) {
    // $http.get('/public/json/nexus-s.json').success(function(data) {
    //     $scope.phones = data;
    // });
    $scope.phones = Phone.query();

    $scope.orderProp = 'age';
}


function PhoneDetailCtrl($scope, $routeParams,Phone) {
    //$scope.phoneId = $routeParams.phoneId;
    $scope.phone = Phone.get({
        phoneId: $routeParams.phoneId
    }, function(phone) {
        $scope.mainImageUrl = phone.images[0];
    });
    $scope.testWatch='ssssss';



    $scope.setImage = function(imageUrl) {
    	var now=new Date().getTime();
        $scope.testWatch=now;
        console.log($scope.testWatch);
    }
    $scope.$watch('testWatch',function() {
    	console.log('变化');
    	console.log($scope.testWatch);
    })
}
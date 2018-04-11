var app = angular.module('ApiPartners', []);

app.controller('Api', function($scope, $http){
    $http.get('https://jsonplaceholder.typicode.com/users')
    .then(function(response) {
        $scope.partnersApi = response.data; 
    });
});
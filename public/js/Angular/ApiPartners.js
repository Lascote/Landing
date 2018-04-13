var app = angular.module('ApiPartners', []);

app.controller('Api', function($scope, $http){
    $http.post('http://localhost:8080/api/getbranches')
    .then(function(response) {
        console.log(response);
        $scope.partnersApi = response.data.branches;
    });

});
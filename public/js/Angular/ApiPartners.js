var app = angular.module('ApiPartners', []);

app.controller('Api', function($scope, $http){
    $http.post('https://panel.unicard.by/api/getcategories')
    .then(function(response) {
        $scope.partnersApi = response.data.categories;
    });

});
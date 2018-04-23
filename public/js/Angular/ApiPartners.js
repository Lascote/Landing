let app = angular.module('ApiPartners', []);

app.controller('Api', function($scope, $http){
    $http.post('https://panel.unicard.by/api/getcategories')
        .then(function(response) {
            $scope.categoriesApi = response.data.categories;
            console.log(response.data.categories);
        });
    $http.post('https://panel.unicard.by/api/getpartners')
        .then(function(response) {
            $scope.partnersApi = response.data.partners;
            console.log(response.data.partners);
        });
    $scope.getpartners = function (number) {
        let id = undefined;
        switch (number){
            case 1: id = '5ad4bf1410b61a6a1cb873d6'; break;
            case 2: id = '5acde7dbcfa81e3712956d13'; break;
            case 3: id = '5ad4b6c20d691b69ec87cdec'; break;
            case 4: id = '5acde7bacfa81e3712956d11'; break;
            case 5: id = '5acde7e5cfa81e3712956d15'; break;
            case 6: id = '5ad9194f900e436edbc4d9fd'; break;
            default: break;
        }
        if (id !== undefined)
            $http.post('https://panel.unicard.by/api/getpartnerbycategory', {id: id})
                .then(function(response) {
                    $scope.partnersApi = response.data.partners;
                    console.log(response.data.partners);
                });
    };
    $scope.openPartnerModal = function (id) {
        return;
        if (id !== undefined )
            $("#modal"+id).modal();
    }
});
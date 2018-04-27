let app = angular.module('ApiPartners', []);

app.controller('Api', function($scope, $http) {
    $http.post('https://panel.unicard.by/api/getcategories')
        .then(function (response) {
            $scope.categoriesApi = response.data.categories;
            console.log(response.data.categories);
        });
    $http.post('https://panel.unicard.by/api/getpartners')
        .then(function (response) {
            $scope.partnersApi = response.data.partners;
            console.log(response.data.partners);
        });
    $scope.getpartners = function (number) {
        let id = undefined;
        switch (number) {
            case 1:
                id = '5ad4bf1410b61a6a1cb873d6';
                break;
            case 2:
                id = '5acde7dbcfa81e3712956d13';
                break;
            case 3:
                id = '5ad4b6c20d691b69ec87cdec';
                break;
            case 4:
                id = '5acde7bacfa81e3712956d11';
                break;
            case 5:
                id = '5acde7e5cfa81e3712956d15';
                break;
            case 6:
                id = '5ad9194f900e436edbc4d9fd';
                break;
            default:
                break;
        }
        if (id !== undefined)
            $http.post('https://panel.unicard.by/api/getpartnerbycategory', {id: id})
                .then(function (response) {
                    $scope.partnersApi = response.data.partners;
                    console.log(response.data.partners);
                });
        $('#restore').slideDown(400).css('display', 'flex');
    };
    $('#restore').click(function () {
        $http.post('https://panel.unicard.by/api/getpartners')
            .then(function (response) {
                $scope.partnersApi = response.data.partners;
                console.log(response.data.partners);
                $('#restore').slideUp(600);
            });
    });
    $scope.openPartnerModal = function (id) {
        $http.post('https://panel.unicard.by/api/getbranchesbypartner', {id: id})
            .then(function (response) {
                $scope.branchesApi = response.data.branches;
                console.log(response.data.branches);
                $scope.branchesApi.forEach((item) => {
                    item.addressURL = "https://www.google.by/maps/search/" + item.address.replace(/\s/gi, '+');
                    item.workingTimeParsed = parseWT(item.workingTime);
                    console.log(item.workingTimeParsed);
                    item.phoneNumbersParsed = parsePN(item.phoneNumbers);
                    console.log(item.phoneNumbersParsed);
                });
            });
        return;
        if (id !== undefined)
            $("#modal" + id).modal();
    }
});

function parseWT(wt) {
    let wtp = [];
    if (!wt) return;
    for (let i = 0; i < wt.length; i++) {
        if (wt[i][0] === "empty" && wt[i][1] === "empty")
            wtp.push({day: getWeekDay(i), time: "Закрыто"});
        else if (wt[i][0] !== "empty" && wt[i][1] === "empty")
            wtp.push({day: getWeekDay(i), time: "Круглосуточно"});
        else wtp.push({day: getWeekDay(i), time: parseTime(wt[i][0]) + "-" + parseTime(wt[i][1])});
    }
    return wtp;
}

function parseTime(t) {
    return (t.substr(0, 2) + ":" + t.substr(2, 2));
}

function getWeekDay(i) {
    switch (i){
        case 0: return 'Пн';
        case 1: return 'Вт';
        case 2: return 'Ср';
        case 3: return 'Чт';
        case 4: return 'Пт';
        case 5: return 'Сб';
        case 6: return 'Вс';
        default: return 'Ош';
    }
}

function parsePN(pn)  {
    let pnp = [];
    if (!pn) return;
    for (let i = 0; i < pn.length; i++) {
        for (let j = 0; j < pn[i].length; j++) {
            if (pn[i][j] !== "null")
                pnp.push({carrier: i, number: pn[i][j]});
        }
    }
    return pnp;
}
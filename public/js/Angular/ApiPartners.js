let app = angular.module('ApiPartners', []);

app.controller('Api', function($scope, $http) {
    $scope.getpartners = function () {
        if (!$scope.partnersApi)
            $http.post('https://panel.unicard.by/api/getpartners')
                .then(function (response) {
                    $scope.partnersApi = response.data.partners;
                });
    };

    $scope.getpartnersbycategory = function (number) {
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
                });
        $('#restore').slideDown(400).css('display', 'flex');
    };

    $('#restore').click(function () {
        $http.post('https://panel.unicard.by/api/getpartners')
            .then(function (response) {
                $scope.partnersApi = response.data.partners;
            });
        $('#restore').slideUp(600);
    });

    $scope.openModal = function(number) {
        let id = undefined;
        return;
        switch (number) {
            case 1: break;
            case 2: id = '5ad4c0b22c1f956a42bc2bd4'; break;
            case 3: id = '5ade5cd91860dc0af74f664e'; break;
            case 4: id = '5ae3799dae3cb2280f30aa27'; break;
            case 5: id = '5ad9b142bea21f790334d47d'; break;
            case 6: id = '5adaf0885eda087e04d7bf20'; break;
            case 7: id = '5ad4b41bdf70e469da292597'; break;
            case 8: id = '5ada64c6a030407c52b469f7'; break;
            case 9: id = '5ada504f9717f27bfd341c85'; break;
            case 10: id = '5ae3744b40edf527c0787704'; break;
            case 11: id = '5ad9a5259e16ea78d459aaea'; break;
            case 12: id = '5ad9771cf3ec7178829eb7c2'; break;
            default: break;
        }
        if (id !== undefined) {
            $http.post('https://panel.unicard.by/api/getbranchesbypartneranon', {id: id})
                .then(function (response) {
                    $scope.branchesApi = response.data.branches;
                    $scope.branchesApi.forEach((item) => {
                        item.addressURL = "https://www.google.by/maps/search/" + item.address.replace(/\s/gi, '+');
                        item.workingTimeParsed = parseWT(item.workingTime);
                        item.phoneNumbersParsed = parsePN(item.phoneNumbers);
                        item.todayParsed = item.workingTimeParsed.shift();
                    });
                });
            $("#modal" + id).modal();
        }
    };

    $scope.openPartnerModal = function (partner) {
        if (partner !== undefined) {
            $scope.curPartner = partner;
            $http.post('https://panel.unicard.by/api/getbranchesbypartneranon', {id: partner.id})
                .then(function (response) {
                    $scope.branchesApi = response.data.branches;
                    $scope.branchesApi.forEach((item) => {
                        item.addressURL = "https://www.google.by/maps/search/" + item.address.replace(/\s/gi, '+');
                        item.workingTimeParsed = parseWT(item.workingTime);
                        item.phoneNumbersParsed = parsePN(item.phoneNumbers);
                        item.todayParsed = item.workingTimeParsed.shift();
                    });
                    $("#partnerModal").modal();
                    $scope.branchesApi.forEach((item) => {
                        item.toggleWT = function () {
                            let wthi = $("#wthi" + item._id);
                            $("#wta" + item._id).slideToggle(300).css('display','flex');
                            if (wthi.text() === 'keyboard_arrow_down')
                                wthi.text('keyboard_arrow_up');
                            else
                                wthi.text('keyboard_arrow_down');
                        };
                        item.togglePN = function () {
                            let pnhi = $("#pnhi" + item._id);
                            $("#pna" + item._id).slideToggle(300).css('display','flex');
                            if (pnhi.text() === 'keyboard_arrow_down')
                                pnhi.text('keyboard_arrow_up');
                            else
                                pnhi.text('keyboard_arrow_down');
                        };
                    });
                });
        }
    };
});

function parseWT(wt) {
    let wtp = [];
    if (!wt) return;
    let d = new Date().getDay();
    d = d - 1 < 0 ? 7 + d - 1 : d - 1;
    for (let i = 0; i < wt.length; i++) {
        if (wt[i][0] === "empty" && wt[i][1] === "empty")
            wtp.push({day: getWeekDay(i), time: "Закрыто"});
        else if (wt[i][0] !== "empty" && wt[i][1] === "empty")
            wtp.push({day: getWeekDay(i), time: "Круглосуточно"});
        else wtp.push({day: getWeekDay(i), time: parseTime(wt[i][0]) + "-" + parseTime(wt[i][1])});
    }
    wtp.sort(function (a) {
        let i = (wtp.indexOf(a) - d + 1);
        return (i < 0 ? 7 + i : i)
    });
    wtp = wtp.reverse();
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
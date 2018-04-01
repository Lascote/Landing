$(document).ready(function () {
    $('#partnersCarousel').bind('slide.bs.carousel', function (e) {
        $(".active img").css("opacity", 0);
        $('.active img').fadeTo(700, 1);
    });

    $.post('https://panel.unicard.by/api/getpartners')
        .done((data) => {
        $('#partnersCounter').text(data.partners.length);
        })
        .fail((err) => {
            console.log("Ошибка соединения с сервером.");
        });

    // Get the modal
    let modal = document.getElementById('myModal');

    let btn = document.getElementById("myBtn");

    let span = document.getElementsByClassName("close")[0];

    btn.onclick = function() {
        modal.style.display = "flex";
    };

    span.onclick = function() {
        modal.style.display = "none";
    };

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }
});
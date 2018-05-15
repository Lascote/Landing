$(document).ready(function () {

    let heights = [],
        blocks = $('.block');
    for (let i = 0; i < blocks.length; i++)
        heights.push({height: $("#" + blocks[i].id).offset().top, id: blocks[i].id});

    $("#logo").animate({opacity: 1}, 1500);
    $("#motto").delay(2000).animate({opacity: 1}, 750);
    $("#arrow").delay(3250).animate({opacity: 1}, 1000);

    $('a[href^="#"]').click(function (event) {
        event.preventDefault();
        let id = $(this).attr('href'),
            top = $(id).offset().top;
        $('html, body').animate({scrollTop: top}, 1000);
    });

    const burgerLinks = $(".burger-content > ul > li > a");
    for (let i = 0; i < burgerLinks.length; i++) {
        $(burgerLinks[i]).on('click', function () {
            $(".burger-content ").fadeOut();
            $(".burger").toggleClass("change");

        });
    }

    /* arrow movement  */
    setInterval(function () {
        $('.arrow-container').animate({bottom: '-=20', opacity: '1'}, 1200)
            .animate({bottom: '+=20', opacity: '.1'}, 1100);
    }, 0);

    $('#arrow').on('click', () => {
        toggleCircle($(".active"));
    });

    $('#slide-back').on('click', () => {
        $('#slider-container').delay(1000).animate({'left': '0'}, 700);
    });

    $('#slide-forward').on('click', () => {
        $('#slider-container').delay(1000).animate({'left': '-100%'}, 700);
    });

    const heigth = $(window).height();

    /* slide show animation in carousel "partnersCarousel". */
    $('#partnersCarousel').bind('slide.bs.carousel', function (e) {
        $(".active img").css("opacity", 0);
        $('.active img').fadeTo(700, 1);
    });

    $(window).scroll(function () {
        let scroll = $(this).scrollTop() + (heigth / 2);
        for (let i = heights.length - 1; i >= 0; i--) {
            if (scroll >= heights[i].height) {
                toggleCircle(heights[i].id);
                break;
            }
        }

        if (scroll < heigth) {
            $(".scroll-bar").fadeOut();
        }
        else {
            $(".scroll-bar").fadeIn();
        }
    });

    $.post('https://panel.unicard.by/api/showclientscount')
        .done((data) => {
            $('#count').text(500 - data.count);
        })
        .fail((err) => {
            console.error("Ошибка соединения с сервером.")
        });

    $(".circle").click(function (event) {
        const circles = $(".circle");
        for (let i = 0; i < circles.length; i++) {
            if (event.target === circles[i])
                $(circles[i]).addClass("scroll-bar-active");
            else $(circles[i]).removeClass("scroll-bar-active");
        }
    });

    let card = "";
    $(".options-button").on("click", (event) => {
        card = event.currentTarget.parentElement.id;
        $("#overlay").fadeIn();
    });

    $(window).on("click", (event) => {
        let a = $(".overlay");
        if (event.target === a['0']) {
            a.fadeOut();
        }
    });

    $(".close-button").on("click", () => {
        $(".overlay").fadeOut();
    });

    let validMap = new Map();
    validMap.set('surname', false);
    validMap.set('name', false);
    validMap.set('email', false);
    validMap.set('phone', false);
    validMap.set('studyPlace', false);

    $('#defaultCheck1').on("click", (event) => {
        let isChecked = event.currentTarget.checked,
            submit = $('input[type="submit"]');
        submit.prop('disabled', !isChecked);
        if (isChecked)
            submit.removeClass('disabled');
        else
            submit.addClass('disabled');
    });

    let inputs = $('input[type^="text"]');

    inputs.focusin((event) => {
        if (event === undefined)
            return;
        let current = event.currentTarget,
            message = "";
        switch (current.id) {
            case "email":
                message = "Например, ivanov.ivan@mail.ru или ivan.ivanov@gmail.com";
                break;
            case "surname":
                message = "Например, Иванов";
                break;
            case "name":
                message = "Например, Иван";
                break;
            case "phone":
                message = "Например, +375291234567 или +375337654321";
                break;
            case "studyPlace":
                message = "Например, БГУ или БГПУ";
                break;
            default:
                return;
        }
        let label = $("#" + current.id + "-msg");
        label.parent().slideDown(300,"linear");
        label.css("color", "skyblue");
        label.text(message);
    });

    inputs.focusout((event) => {
        if (event === undefined)
            return;
        let current = event.currentTarget,
            valid = false,
            message = "";
        switch (current.id) {
            case "email":
                if (current.value === "") {
                    valid = false;
                    message = "Введите Ваш адрес электронной почты";
                    break;
                }
                if (current.value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                    valid = true;
                }
                else {
                    valid = false;
                    message = "Неправильно указан адрес электронной почты";
                }
                break;
            case "surname":
                if (current.value === "") {
                    valid = false;
                    message = "Введите Вашу фамилию";
                    break;
                }
                if (current.value.match(/^[- А-Яа-яЁё]{1,64}$/)) {
                    valid = true;
                }
                else {
                    valid = false;
                    message = "Неправильно указана фамилия";
                }
                break;
            case "name":
                if (current.value === "") {
                    valid = false;
                    message = "Введите Ваше имя";
                    break;
                }
                if (current.value.match(/^[- А-Яа-яЁё]{1,64}$/)) {
                    valid = true;
                }
                else {
                    valid = false;
                    message = "Неправильно указано имя";
                }
                break;
            case "phone":
                if (current.value === "") {
                    valid = false;
                    message = "Введите Ваш мобильный телефон";
                    break;
                }
                if (current.value.match(/^(\+375)(29|25|44|33)(\d{7})$/)) {
                    valid = true;
                }
                else {
                    valid = false;
                    message = "Неправильно указан номер мобильного телефона";
                }
                break;
            case "studyPlace":
                valid = true;
                break;
            default:
                return;
        }
        let input = $("#" + current.id),
            label = $("#" + current.id + "-msg");
        if (valid === true) {
            validMap.set(current.id, true);
            input.removeClass('error-input');
            input.addClass('okay');
            label.parent().slideUp(300,"linear");
        }
        else {
            input.addClass('error-input');
            input.removeClass('okay');
            label.parent().slideDown(300,"linear");
            label.css("color", "red");
            label.text(message);
        }
    });

    // sending data of form to server
    $(".form-button").on('click', (event) => {

        event.preventDefault();

        checkEmptyness();

        let a = validMap.values();
        for (let i = 0; i < validMap.size; i++) {
            if (a.next().value === false)
                return;
        }

        $.post('https://panel.unicard.by/api/addapplication', {
            surname: $("#surname")['0'].value,
            name: $("#name")['0'].value,
            email: $("#email")['0'].value,
            phoneNumber: $("#phone")['0'].value,
            studyPlace: $("#studyPlace")['0'].value,
            chosenTariff: 12,
        })
            .done((data) => {
                let fbe = $('#form-button-msg');
                if (data.result) {
                    fbe.parent().slideUp(300,"linear");
                    $('#form')[0].reset();
                    clearAllInputClasses();
                    $('#fh1, #f1').css("display", 'none');
                    $('#fh2, #wicf').css("display", 'flex');
                }
                else {
                    fbe.parent().slideDown(300,"linear");
                    fbe.css("color", "red");
                    fbe.text(data.message);
                }
            })
    });
});

function openWhereModal() {
    $("#where").fadeIn();
}

function toggleContacts() {
    $(".contacts-accordion").slideToggle(500);
}

function toggleContactMap() {
    let txt = $('#csmb');
    txt.text(txt.text() === 'Показать карту' ? 'Спрятать карту' : 'Показать карту');
    $("#cam").slideToggle(500);
}

function toggleCircle(currentPage) {
    const scrollBarLinks = $(".scroll-bar > ul > li > a");
    const id = currentPage;
    for (let i = 0; i < scrollBarLinks.length; i++) {
        if ($(scrollBarLinks[i]).attr('href') === "#" + id) {
            const circle = $('a[href="#' + id + '"] > div[class="circle"]');
            circle.addClass('scroll-bar-active');
        } else {
            const kids = $(scrollBarLinks[i]).children();
            $(kids[1]).removeClass('scroll-bar-active');
        }
    }
}

function toggleIcon(burger) {
    burger.classList.toggle("change");
    if ($(".burger-content").css("display") === "none") {
        $(".burger-content ").fadeIn().css("display", "flex");
    } else {
        $(".burger-content ").fadeOut();
    }
}

function checkEmptyness() {
    const inputs = $('input[type^="text"]');
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].id === 'studyPlace')
            continue;
        if (inputs[i].value === "") {
            let label = $("#" + inputs[i].id + "-msg"),
                message = "";
            switch (inputs[i].id) {
                case "surname":
                    message = "Введите Вашу фамилию";
                    break;
                case "name":
                    message = "Введите Ваше имя";
                    break;
                case "email":
                    message = "Введите Ваш адрес электронной почты";
                    break;
                case "phone":
                    message = "Введите Ваш мобильный телефон";
                    break;
            }
            label.css("display","block");
            label.css("color","red");
            label.text(message);
            $("#" + inputs[i].id).addClass("error-input");
        }
    }
}

function clearAllInputClasses() {
    const inputs = $('input[type^="text"]');
    const labels = $('label');
    for (let i = 0; i < inputs.length; i++) {
        $("#"+inputs[i].id).removeClass('error-input okay');
    }
    for (let i = 0; i < labels.length; i++) {
        $("#"+labels[i].id).css("display", "none");
    }
}
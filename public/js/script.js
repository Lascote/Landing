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

    /*$.post('https://panel.unicard.by/api/showclientscount')
        .done((data) => {
            $('#count').text(500 - data.count);
        })
        .fail((err) => {
            console.error("Ошибка соединения с сервером.")
        });*/

    $(".circle").click(function (event) {
        const circles = $(".circle");
        for (let i = 0; i < circles.length; i++) {
            if (event.target === circles[i])
                $(circles[i]).addClass("scroll-bar-active");
            else $(circles[i]).removeClass("scroll-bar-active");
        }
    });

    let card = "", period = 0;
    $(".options-button").on("click", (event) => {
        card = event.currentTarget.parentElement.id;
        if (card === "yearcard") period = 12;
        else if (card === "infinitycard") period = 0;
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
    validMap.set('studyPlace', true);
    validMap.set('promocode', true);

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
            message = getMessage(current.id, current.lang, 'help');
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
                    message = getMessage("email",current.lang,"empty");
                    break;
                }
                if (current.value.trim().match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                    valid = true;
                }
                else {
                    valid = false;
                    message = getMessage("email",current.lang,"error");
                }
                break;
            case "surname":
                if (current.value === "") {
                    valid = false;
                    message = getMessage("surname",current.lang,"empty");
                    break;
                }
                if (current.value.trim().match(/^[- А-Яа-яЁёЎўІі']{1,64}$/)) {
                    valid = true;
                }
                else {
                    valid = false;
                    message = getMessage("surname",current.lang,"error");
                }
                break;
            case "name":
                if (current.value === "") {
                    valid = false;
                    message = getMessage("name",current.lang,"empty");
                    break;
                }
                if (current.value.trim().match(/^[- А-Яа-яЁёЎўІі']{1,64}$/)) {
                    valid = true;
                }
                else {
                    valid = false;
                    message = getMessage("name",current.lang,"error");
                }
                break;
            case "phone":
                if (current.value === "") {
                    valid = false;
                    message = getMessage("phone",current.lang,"empty");
                    break;
                }
                if (current.value.trim().match(/^(\+375)(29|25|44|33)(\d{7})$/)) {
                    valid = true;
                }
                else {
                    valid = false;
                    message = getMessage("phone",current.lang,"error");
                }
                break;
            case "studyPlace":
                valid = true;
                break;
            case "promocode":
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
            surname: $("#surname")['0'].value.trim(),
            name: $("#name")['0'].value.trim(),
            email: $("#email")['0'].value.trim(),
            phoneNumber: $("#phone")['0'].value.trim(),
            studyPlace: $("#studyPlace")['0'].value.trim(),
            chosenTariff: period,
            promocode: $("#promocode")['0'].value.trim(),
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
    if (txt[0].lang === 'by')
        txt.text(txt.text() === 'Паказаць мапу' ? 'Схаваць карту' : 'Паказаць мапу');
    else
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
        if (inputs[i].id === 'studyPlace' || inputs[i].id === 'promocode')
            continue;
        if (inputs[i].value === "") {
            let label = $("#" + inputs[i].id + "-msg"),
                message = getMessage(inputs[i].id, inputs[i].lang, 'empty');
            label.css("display", "block");
            label.css("color", "red");
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

function setCookie(cname, cvalue, exdays) {
    let d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    let user = getCookie("username");
    if (user !== "") {
        alert("Welcome again " + user);
    } else {
        user = prompt("Please enter your name:", "");
        if (user !== "" && user !== null) {
            setCookie("username", user, 365);
        }
    }
}

function getMessage(field, lang, type) {
    switch (field) {
        case "surname":
            if (lang === 'ru'){
                switch (type){
                    case 'help': return "Например, Иванов";
                    case 'error': return "Неправильно указана фамилия";
                    case 'empty': return "Введите Вашу фамилию";
                    default: return "ERROR";
                }
            }
            else if (lang === 'by') {
                switch (type){
                    case 'help': return "Напрыклад, Іваноў";
                    case 'error': return "Няправільна паказана прозвішча";
                    case 'empty': return "Увядзіце Ваша прозвішча";
                    default: return "ERROR";
                }
            }
            break;
        case "name":
            if (lang === 'ru'){
                switch (type){
                    case 'help': return "Например, Иван";
                    case 'error': return "Неправильно указано имя";
                    case 'empty': return "Введите Ваше имя";
                    default: return "ERROR";
                }
            }
            else if (lang === 'by') {
                switch (type){
                    case 'help': return "Напрыклад, Іван";
                    case 'error': return "Няправільна паказана імя";
                    case 'empty': return "Увядзіце Ваша імя";
                    default: return "ERROR";
                }
            }
            break;
        case "studyPlace":
            if (lang === 'ru'){
                switch (type){
                    case 'help': return "Например, БГУ или БГПУ";
                    default: return "ERROR";
                }
            }
            else if (lang === 'by') {
                switch (type){
                    case 'help': return "Напрыклад, БДУ ці БДПУ";
                    default: return "ERROR";
                }
            }
            break;
        case "promocode":
            if (lang === 'ru'){
                switch (type){
                    case 'help': return "Например, ЮНИ или БГУФК";
                    default: return "";
                }
            }
            else if (lang === 'by') {
                switch (type){
                    case 'help': return "Напрыклад, ЮНІ ці БДУФК";
                    default: return "";
                }
            }
            break;
        case "email":
            if (lang === 'ru'){
                switch (type){
                    case 'help': return "Например, ivanov.ivan@mail.ru или ivan.ivanov@gmail.com";
                    case 'error': return "Неправильно указан адрес электронной почты";
                    case 'empty': return "Введите Ваш адрес электронной почты";
                    default: return "ERROR";
                }
            }
            else if (lang === 'by') {
                switch (type){
                    case 'help': return "Напрыклад, ivanov.ivan@mail.ru ці ivan.ivanov@gmail.com";
                    case 'error': return "Няправільна паказаны адрас электроннай пошты";
                    case 'empty': return "Увядзіце Ваш адрас электроннай пошты";
                    default: return "ERROR";
                }
            }
            break;
        case "phone":
            if (lang === 'ru'){
                switch (type){
                    case 'help': return "Например, +375291234567 или +375337654321";
                    case 'error': return "Неправильно указан номер мобильного телефона";
                    case 'empty': return "Введите Ваш мобильный телефон";
                    default: return "ERROR";
                }
            }
            else if (lang === 'by') {
                switch (type){
                    case 'help': return "Напрыклад, +375291234567 ці +375337654321";
                    case 'error': return "Няправільна паказаны нумар мабільнага тэлефона";
                    case 'empty': return "Увядзіце Ваш мабільны тэлефон";
                    default: return "ERROR";
                }
            }
            break;
        default:
            return "ERROR";
    }
}
$(document).ready(function () {

    let heights = [],
        blocks = $('.block'),
        cards = [{block: $("#action1")},
            {block: $("#action2")},
            {block: $("#action3")}];
    for (let i = 0; i < blocks.length; i++)
        heights.push({height: $("#"+blocks[i].id).offset().top, id: blocks[i].id});

    $("#home-container").fadeIn(1500).css("display","flex");
    $("#logo").fadeIn(1500);
    $("#layoutmotto").delay(2500).fadeOut(1);
    $("#motto").delay(2500).fadeIn(750);
    $("#arrow").delay(3500).fadeIn(1000);

    $('a[href^="#"]').click(function () {
        event.preventDefault();
        let id  = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 1000);
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
        $('#slider-container').delay(1000).animate({'left': '0'},700);
    });

    $('#slide-forward').on('click', () => {
        $('#slider-container').delay(1000).animate({'left': '-100%'},700);
    });

    const heigth = $(window).height();

    /* slide show animation in carousel "partnersCarousel". */
    $('#partnersCarousel').bind('slide.bs.carousel', function (e) {
        $(".active img").css("opacity", 0);
        $('.active img').fadeTo(700, 1);
    });

    $(window).scroll(function() {
        let scroll = $(this).scrollTop()+(heigth/2);
        for (let i = heights.length-1; i >= 0; i--) {
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
            console.log(data.count);
            $('#count').text(500-data.count);
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
        $(".overlay").fadeIn();
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

    $('input[type^="text"]').focusout((event) => {
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
                if (current.value.match(/^[- А-Яа-яЁёA-Za-z\s]*$/)) {
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
                if (current.value.match(/^[- А-Яа-яЁёA-Za-z\s]*$/)) {
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
                if (current.value.match(/^(\+375|80)\s?(29|25|44|33)\s?(\d{3})\s?(\d{2})\s?(\d{2})$/)) {
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
            label = $("#" + current.id + "-err");
        if (valid === true) {
            validMap.set(current.id, true);
            input.removeClass('error-input');
            input.addClass('okay');
            label.css("display", "none");
        }
        else {
            input.addClass('error-input');
            input.removeClass('okay');
            label.css("display", "block");
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
            chosenTariff: card === "yearcard" ? 12 : 6,
        })
            .done(() => {
                $('#form')[0].reset();
                clearAllInputClasses();
                $('#fh1, #f1').css("display",'none');
                $('#fh2, #wicf').css("display",'flex');
            })
            .fail((err) => {
                alert("Ошибка соединения с сервером.")
            })
    });
});

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
        if (inputs[i].value === "") {
            let label = $("#" + inputs[i].id + "-err"),
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
                case "studyPlace":
                    message = "Введите Ваше место учёбы";
                    break;
            }
            label.css("display","block");
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

function clearAllInputClass() {
    let wt = [];
    for (let i = 0; i < days.length; i++) {
        days[i].sort();
        for (let j = 0; j < days[i].length; j++) {
            wt[days[i][j]][0] = from[i] ? from[i] : "empty";
            wt[days[i][j]][1] = to[i] ? to[i] : "empty";
        }
    }
}

function openModal(number) {
    let id = 13;
    switch (id){
        case 1: id = '5326418161'; break;
        case 2: id = "5ad4c0b22c1f956a42bc2bd4"; break;
        case 3: id = '5326418161'; break;
        case 4: id = '5326418161'; break;
        case 5: id = '5326418161'; break;
        case 6: id = '5326418161'; break;
        case 7: id = '5326418161'; break;
        case 8: id = '5326418161'; break;
        case 9: id = '5326418161'; break;
        case 10: id = '5326418161'; break;
        case 11: id = '5326418161'; break;
        case 12: id = '5326418161'; break;
        default: break;
    }
    if (id !== undefined)
        $("#modal"+id).modal();
}
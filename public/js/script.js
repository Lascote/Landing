$(document).ready(function () {

    let heights = [],
        blocks = $('.block');
    for (let i = 0; i < blocks.length; i++)
        heights.push({height: $("#"+blocks[i].id).offset().top, id: blocks[i].id});

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
        $(arrow).animate({bottom: '-=20', opacity: '1'}, 1200)
            .animate({bottom: '+=20', opacity: '.1'}, 1100);
    }, 0);

    $(arrow).on('click', () => {
        toggleCircle($(".active"));
        let el = $(this).attr('href');
        $('body').animate({
            scrollTop: $(el).offset().top
        }, 500);
    });

    // I have needed to do it because fullpage library set incorrect height
    const heigth = $(window).height();
    $(".contacts-container").css("height", heigth);
    $(".news-container img").css("height", heigth);

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
        $(".form-container").fadeIn();
    });

    $(".overlay").on("click", () => {
        $(".overlay").fadeOut();
        $(".form-container").fadeOut();
    });

    let validMap = new Map();
    validMap.set('email', false);
    validMap.set('name', false);
    validMap.set('phone', false);

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
    $(".form-button").on('click', () => {

        checkEmptyness();

        let a = validMap.values();
        for (let i = 0; i < validMap.size; i++) {
            if (a.next().value === false)
                return;
        }

        $.post("http://localhost:3000", {
            card: card,
            email: email,
            name: name,
            phone: phone
        })
            .done(() => {
                clearAllInputClasses();
                $('#form')[0].reset();
                $(".overlay").fadeOut();
                $(".form-container").fadeOut();
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
                case "email":
                    message = "Введите Ваш адрес электронной почты";
                    break;
                case "name":
                    message = "Введите Ваше имя";
                    break;
                case "phone":
                    message = "Введите Ваш мобильный телефон";
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
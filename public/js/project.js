$(document).ready(function () {

    const heigth = $(window).height();

    $(window).scroll(function() {
        let window = $(this), x = $('#myTopnav');
        if (window.scrollTop() >= heigth) {
            $('.topnav').css("top", 0);
        } else {
            $('.topnav').css("top", '-55px');
            if (x['0'].className !== "topnav") {
                x.removeClass("responsive");
            }
        }
    });

    $('a[href^="#"]').click(function () {
        event.preventDefault();
        let id = $(this).attr('href'),
            top = $(id).offset().top,
            x = $('#myTopnav'),
            menuHeader = $('#menu-header'),
            link = $(this);
        $('body,html').animate({scrollTop: top}, 1000);
        if (x['0'].className !== "topnav") {
            x.removeClass("responsive");
        }
        if ($(this)['0'].className !== 'arrow-link') {
            menuHeader.text(link.text());
            menuHeader.attr('href', id);
        }
    });

    setInterval(function () {
        $('.arrow-container').animate({bottom: '-=30', opacity: '1'}, 1200)
            .animate({bottom: '+=30', opacity: '.1'}, 1100);
    }, 0);

    $('#arrow').on('click', () => {
        let el = $(this).attr('href');
        $('body').animate({
            scrollTop: $(el).offset().top
        }, 500);
    });

    $('#topnavIcon').on('click', () => {
        let x = $('#myTopnav'),
            menuHeader = $('#menu-header');
        if (x['0'].className === "topnav") {
            x.addClass("responsive");
        } else {
            x.removeClass("responsive");
        }
    });
});
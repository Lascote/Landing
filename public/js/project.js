$(document).ready(function () {

    const heigth = $(window).height();

    $(window).scroll(function() {

        if ($(this).scrollTop() >= heigth) {
            $('#navbar').css("top", 0);
        } else {
            $('#navbar').css("top", '-55px');
        }
    });

    $('a[href^="#"]').click(function () {
        event.preventDefault();
        let id = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 1000);
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

});
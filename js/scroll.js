
(function() {
    var updatePosition = function() {
        var top = document.body.scrollTop||document.documentElement.scrollTop,
            style = {};
        if (top > 245 ) {
            style.top = 0;
            $('.searcharea').css('opacity','0');
        } else {
            style.top = '-70px';
            $('.searcharea').css('opacity','1');
        }
        $('header').css(style);
    }
    var throttled = _.throttle(updatePosition, 100);
    $(window).scroll(throttled);

}(window.birddoggo));

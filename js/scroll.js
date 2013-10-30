
(function() {
    var updatePosition = function() {
        var top = document.body.scrollTop,
            style = {};
        if (top > 164 ) {
            style.top = 0;
            $('.searcharea').css('visibility','hidden');
        } else {
            style.top = '-70px';
            $('.searcharea').css('visibility','visible');
        }
        $('header').css(style);
    }
    var throttled = _.throttle(updatePosition, 100);
    $(window).scroll(throttled);

}(window.birddoggo));

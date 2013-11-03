function copy_inputs(from,to){
	from.find('input[type=text]').each(function(index){
		to.find('input[type=text]').eq(index).val($(this).val());
	});
}
(function() {
    var updatePosition = function() {
        var top = document.body.scrollTop||document.documentElement.scrollTop,
            style = {},getstyle = {};
        if (top > 245 ) {
            style.top = 0;
            getstyle.top = '50px';
            
        } else {
            style.top = '-70px';
            getstyle.top = 0;
            $('.headercontent').removeClass('open');
        }
        $('header').css(style);
        $('.gettheapps').css(getstyle);
    }
    var throttled = _.throttle(updatePosition, 100);
    $(window).scroll(throttled);
    var $bodyfields = $('.bodyfields');
    var $headerfields = $('.headerfields');
	$bodyfields.on('keyup', 'input[type=text]',function(){
		copy_inputs($bodyfields,$headerfields);
	});
	$headerfields.on('keyup', 'input[type=text]', function(){
		copy_inputs($headerfields,$bodyfields);
	});
}(window.birddoggo));

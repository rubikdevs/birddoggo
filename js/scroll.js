function copy_inputs(from,to){
	from.find('input[type=text]').each(function(index){
		to.find('input[type=text]').eq(index).val($(this).val());
	});
}
(function() {
    var updatePosition = function() {
        var top = document.body.scrollTop||document.documentElement.scrollTop;
        $('.navbar').css('top', top > 440? '0': '-75px');
    }
    var throttled = _.throttle(updatePosition, 100);
    $(window).scroll(throttled);
    

    var $bodyfields = $('.bodyfields');
    var $headerfields = $('#desktop-navbar');
	$bodyfields.on('keyup', 'input[type=text]',function(){
		copy_inputs($bodyfields,$headerfields);
	});
	$headerfields.on('keyup', 'input[type=text]', function(){
		copy_inputs($headerfields,$bodyfields);
	});
}(window.birddoggo));

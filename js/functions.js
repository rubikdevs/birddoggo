
(function() {
    //caching
    var $body = $('body'),
        $searchAreaInput = $('.searcharea input'),
    	$searchArea = $('.searcharea'),
    	bodyBackgroundsClasses = [
    		'business_background',
    		'people_background',
    		'reverse_background'
    	],
    	placeHolderArray = [
    		'Business name...',
    		'Person name...',
    		'Phone number...'
    	],
        parser =  new DOMParser();

    //XML Parser
    birddoggo.parseXml = function (xml) {
        var dom = null;
        if (window.DOMParser) {
            dom = (new DOMParser()).parseFromString(xml, "text/xml"); 
        } else if (window.ActiveXObject) {
            dom = new ActiveXObject('Microsoft.XMLDOM');
            dom.async = false;
        }
        return dom;
    }   
    
    $body[0].className = bodyBackgroundsClasses[0];
	$('.search_field li').on('click', function(){
	    var $el = $(this);
		if ($el.hasClass('active')) {
			return ;
		}
		$('.search_field li.active').removeClass('active');
		$el.addClass('active');
		$body[0].className = bodyBackgroundsClasses[$el.index()];
		
	});


}(window.birddoggo));

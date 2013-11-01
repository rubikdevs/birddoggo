
(function(Birddoggo) {
    //caching
    var $body = $('body'),
        $searchAreaInput = $('.searcharea input'),
    	$searchArea = $('.searcharea'),
    	bodyBackgroundsClasses = [
    		'business_background',
    		'people_background',
    		'reverse_background',
    		'movies_background',
    		'weather_background'
    	],
    	searchFields = [
            '.businessinput',
    		'.peopleinput',
            '.reverselookup',
            '.movieinput',
            '.weather'
            
    	],
        parser =  new DOMParser();

    //XML Parser

    /*birddoggo.showPosition = function (position) {
        birddoggo.coords = { 
            lat: position.coords.latitude,
            lon: position.coords.longitude
        };
        console.log(birddoggo.coords);
    };

    birddoggo.getLocation = function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(birddoggo.showPosition);
        }
        else {
            //PUM NO GELOCATION
        }
    };
        
    birddoggo.getLocation();*/
    Birddoggo.geocoder = new google.maps.Geocoder();

   
    Birddoggo.parseXml = function (xml) {
        var dom = null;
        if (window.DOMParser) {
            dom = (new DOMParser()).parseFromString(xml, "text/xml"); 
        } else if (window.ActiveXObject) {
            dom = new ActiveXObject('Microsoft.XMLDOM');
            dom.async = false;
        }
        return dom;
    };
    
    $body[0].className = bodyBackgroundsClasses[0];
	$('.search_field li').on('click', function(){
	    var $el = $(this);
		if ($el.hasClass('active')) {
			return ;
		}

		$('.search_field li.active').removeClass('active');
		$el.addClass('active');
		$body[0].className = bodyBackgroundsClasses[$el.index()];
        $('.searchfields > div').css('display','none').removeClass('active');
        $(searchFields[$el.index()]).css('display','block').addClass('active');
		
	});

    Birddoggo.search = function() {
        var className = $('.searchfields').find('.active')[0].className.replace('active',' ').trim();
        switch (className) {
            case 'businessinput':
                  break;  
            case 'peopleinput':
                  break;  
            case 'reverselookup':
                  Birddoggo.lookupPhone($('.searchfields > div.active input').eq(0).val() || $('.searchfields > div.active input').eq(1).val());
                  break;  
            case 'movieinput':
                  Birddoggo.findMovie($('.searchfields > div.active input').eq(0).val() || $('.searchfields > div.active input').eq(1).val());
                  break;  
            case 'weather' :
                  Birddoggo.findWeather($('.searchfields > div.active input').eq(0).val() || $('.searchfields > div.active input').eq(1).val());
                  break;  
        }
    } ;
    $('.searchfields input').on('keyup', function(ev){
        var key = ev.keyCode || ev.which;
        if (key === 13) {
            Birddoggo.search();
        }
    });

    $body.addClass('business_background');
}(window.birddoggo));

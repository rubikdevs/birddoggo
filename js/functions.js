
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
		icons = [
			'<i class="fa fa-building  active "></i>',
			'<i class="fa fa-user active"></i>',
			'<i class="fa fa-phone active"></i>',
			'<i class="fa fa-film active"></i>',
			'<i class="fa fa-sun-o  active"></i>'
		],
        parser =  new DOMParser();

    //XML Parser

    Birddoggo.getAddress = function () {

        var latlng = new google.maps.LatLng( birddoggo.coords.lat, birddoggo.coords.lon),
            placeInputValue = '';
        Birddoggo.address = {
        };
        Birddoggo.geocoder.geocode({ 'latLng': latlng, 'region': 'US' }, function (results, status) {
            $.map( results[0].address_components, function(item) {
                $.map(item.types, function(type) {
                    Birddoggo.address[type] = item.short_name;
                    return false;
                });
                if (Birddoggo.address.postal_code) {
                    placeInputValue = Birddoggo.address.postal_code;
                } else if (Birddoggo.address.locality) {
                    placeInputValue = Birddoggo.address.locality + ', ' +
                                        Birddoggo.address.administrative_area_level_1 ; 
                } 

                $('input.place').each(function(){
                    $(this).val(placeInputValue);
                });

            });
        });
    };
   

    Birddoggo.showPosition = function (position) {
        Birddoggo.coords = { 
            lat: position.coords.latitude,
            lon: position.coords.longitude
        };
         Birddoggo.getAddress(); 
    };

    Birddoggo.getLocation = function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(birddoggo.showPosition);
        }
        else {
            //PUM NO GELOCATION
        }
    };
        
    Birddoggo.getLocation();
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
        $('.navback .search_field li').eq($el.index()).addClass('active');
        $body[0].className = bodyBackgroundsClasses[$el.index()];
        $('.searchfields > div').css('display','none').removeClass('active');
        $(searchFields[$el.index()]).css('display','inline').addClass('active');
        $('.menuselection').html(icons[$el.index()]);      
			
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


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
            'businessinput',
    		'peopleinput',
            'reverselookup',
            'movieinput',
            'weather'
            
    	],
		icons = [
			'fa-building',
			'fa-user',
			'fa-phone',
			'fa-film',
			'fa-sun-o'
		];


    Birddoggo.getAddress = function (geoCodeObj) {
        placeInputValue = '';
        Birddoggo.address = {};
        Birddoggo.geocoder.geocode(geoCodeObj, function (results, status) {
            if (!results[0]) {
                Birddoggo.address = {};
                if (Birddoggo.geocodeCallback) {
                    Birddoggo.geocodeCallback.apply();
                }
                return;
            }
            $.map( results[0].address_components, function(item) {
                $.map(item.types, function(type) {
                    Birddoggo.address[type] = item.long_name;
                    Birddoggo.address[type + 's'] = item.short_name;
                    return false;
                });
                if (Birddoggo.address.postal_code) {
                    placeInputValue = Birddoggo.address.postal_code;
                } else if (Birddoggo.address.locality) {
                    placeInputValue = Birddoggo.address.locality + ', ' +
                                        Birddoggo.address.administrative_area_level_1 ; 
                } else if (Birddoggo.address.administrative_area_level_1) {
                    placeInputValue = Birddoggo.address.administrative_area_level_1;
                }

                $('input.place').each(function(){
                    $(this).val(placeInputValue);
                });

            });
            if (Birddoggo.geocodeCallback) {
                Birddoggo.geocodeCallback.apply();
            }
        });
    };
   

    Birddoggo.showPosition = function (position) {
        Birddoggo.coords = { 
            lat: position.coords.latitude,
            lon: position.coords.longitude
        };
        var latlng = new google.maps.LatLng( birddoggo.coords.lat, birddoggo.coords.lon),
        geoCodeObj = { 'latLng': latlng, 'region': 'US' };
         Birddoggo.getAddress(geoCodeObj); 
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
    var prevIndex = 0;
    $body[0].className = bodyBackgroundsClasses[0];
	$('.search_field li').on('click', function(){
        $el = $(this);
        if ($el.hasClass('active') || $('.menuselection i').hasClass(icons[$el.index()])) {
            return;
        }
        $('.menuselection i')
            .addClass(icons[$el.index()])
            .removeClass(icons[prevIndex]);

        $('.bodyfields.searchfields > div').eq(prevIndex)
            .css('display','none')
            .removeClass('active');
        $('.bodyfields.searchfields > div').eq($el.index())
            .css('display','block')
            .addClass('active');
        $('.headerfields.searchfields > div').eq(prevIndex).css('display','none');
        $('.headerfields.searchfields > div').eq($el.index()).css('display','block');
        $('main .search_field li.active').removeClass('active');
        $('main .search_field li').eq($el.index()).addClass('active');

        prevIndex = $el.index();

        $body[0].className = bodyBackgroundsClasses[$el.index()];			
	});

    Birddoggo.search = function() {
        var className = searchFields[prevIndex];
        switch (className) {
            case 'businessinput':
                  Birddoggo.findBusiness($('main .searchfields > div.active input').map(function(){return $(this).val();}));
                  break;  
            case 'peopleinput':
                  Birddoggo.findPeople($('main .searchfields > div.active input').map(function(){return $(this).val();}));
                  break;  
            case 'reverselookup':
                  Birddoggo.lookupPhone($('main .searchfields > div.active input').eq(0).val());
                  break;  
            case 'movieinput':
                  Birddoggo.findMovie($('main .searchfields > div.active input').eq(0).val() || $('.searchfields > div.active input').eq(1).val());
                  break;  
            case 'weather' :
                  Birddoggo.findWeather($('main .searchfields > div.active input').eq(0).val() || $('.searchfields > div.active input').eq(1).val());
                  break;  
        }
    } ;
    $('.searchbutton').click(Birddoggo.search);
    $('.searchfields input').on('keyup', function(ev){
        var key = ev.keyCode || ev.which;
        if (key === 13) {
            Birddoggo.search();
        }
    });


    $body.addClass('business_background');
}(window.birddoggo));

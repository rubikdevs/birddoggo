 

(function(Birddoggo) {
	Birddoggo.cache.resultArea = Birddoggo.cache.resultarea || $('.resultarea');
	Birddoggo.cache.weatherTPL = Birddoggo.cache.weatherTPL || $('#weather_tpl').html();

 	Birddoggo.findWeather = function(field) {	

 		debugger;
 		var weatherHTML,
 			$resultArea = Birddoggo.cache.resultArea;
	 	Birddoggo.geocoder.geocode( { 'address':field}, function(results, status) {
	        if (status == google.maps.GeocoderStatus.OK) {
	            Birddoggo.coords = { 
	                lat: results[0].geometry.location.lb,
	                lon: results[0].geometry.location.mb
	            };
	           	weatherHTML = Birddoggo.cache.weatherTPL
	           					.replace('{lat}', results[0].geometry.location.lb)
	           					.replace('{lon}', results[0].geometry.location.mb);
	            $resultArea.html(weatherHTML);
				$resultArea.css('top','0');
	        }	        
	    });
	};
}(window.birddoggo));

 

(function(Birddoggo) {
	Birddoggo.cache.resultArea = Birddoggo.cache.resultarea || $('.resultarea');
	Birddoggo.cache.weatherTPL = Birddoggo.cache.weatherTPL || $('#weather_tpl').html();
	Birddoggo.cache.loadingHTML = Birddoggo.cache.loadingHTML  || $('#loading_tpl').html();
	Birddoggo.cache.noresultsHTML = Birddoggo.cache.noresultsHTML  || $('#noresults_tpl').html();


 	Birddoggo.findWeather = function(field) {
 		$resultArea = Birddoggo.cache.resultArea;
 		$resultArea.css('top','0');
		$resultArea.html(Birddoggo.cache.loadingHTML);
		
	 	Birddoggo.geocoder.geocode({ 'address':field}, function(results, status) {
			try {	
				var weatherHTML;
	        	if (status == google.maps.GeocoderStatus.OK) {
	            	Birddoggo.coords = { 
	                	lat: results[0].geometry.location.lat(),
	                	lon: results[0].geometry.location.lng()
	            	};
	           		weatherHTML = Birddoggo.cache.weatherTPL
	           					.replace('{lat}', Birddoggo.coords.lat)
	           					.replace('{lon}', Birddoggo.coords.lon);
	            	$resultArea.html(weatherHTML);
					$resultArea.css('top','0');
	 			} else {
	 				$resultArea.html(Birddoggo.cache.noresultsHTML);
	 			}
	 		} catch(e) {
	 			$resultArea.html(Birddoggo.cache.noresultsHTML);
	 		}	
	 	});
	};
}(window.birddoggo));

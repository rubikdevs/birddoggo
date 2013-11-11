( function(Birddoggo) {

	Birddoggo.cache.resultArea = Birddoggo.cache.resultarea || $('.resultarea');
	Birddoggo.cache.personTPL = Birddoggo.cache.personTPL || $('#people_tpl').html();
	Birddoggo.cache.loadingHTML = Birddoggo.cache.loadingHTML  || $('#loading_tpl').html();
	Birddoggo.cache.noresultsHTML = Birddoggo.cache.noresultsHTML  || $('#noresults_tpl').html();
	var $resultArea = Birddoggo.cache.resultArea;
	var URL = 'services/people-service.php'



	Birddoggo.findPeople = function(params) {
 		$resultArea = Birddoggo.cache.resultArea;
 		$resultArea.css('top','0');
		$resultArea.html(Birddoggo.cache.loadingHTML);
		
	 	Birddoggo.geocodeCallback = function(results, status) {
			try {	
				$.ajax({
					url: URL,
					data: {
						name: params[0],
						lastname: params[1],
						city: Birddoggo.address.localitys,
						state: Birddoggo.address.administrative_area_level_1s,
						zip: Birddoggo.address.postal_code
					},
					dataType : 'JSON',
					type: 'GET',

					success: Birddoggo.renderPerson,
					error: function(err,msg) {
						console.log(err.url);
						console.log(msg)
					}
				}) ;
	 		} catch(e) {
	 			$resultArea.html(Birddoggo.cache.noresultsHTML);
	 		}	
	 	};
	 	Birddoggo.getAddress({ 'address':params[2]});
	};

	
}(window.birddoggo));
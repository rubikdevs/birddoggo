( function(Birddoggo) {

	Birddoggo.cache.resultArea = Birddoggo.cache.resultarea || $('.resultarea');
	Birddoggo.cache.personTPL = Birddoggo.cache.personTPL || $('#business_tpl').html();
	Birddoggo.cache.loadingHTML = Birddoggo.cache.loadingHTML  || $('#loading_tpl').html();
	Birddoggo.cache.noresultsHTML = Birddoggo.cache.noresultsHTML  || $('#noresults_tpl').html();
	var $resultArea = Birddoggo.cache.resultArea;
	var URL = 'services/business-service.php';
	var URL_FEATURED = 'admin/index.php?r=site/getadvertiser';


	Birddoggo.findBusiness = function(params) {
		Birddoggo.geocodeCallback = function() {
			$.ajax({
				url: URL_FEATURED,
				type: 'GET',
				data: {
					'location': JSON.stringify(Birddoggo.address)
				},
				success: function(response) {
					console.log(response);
				}
			});
		}
		Birddoggo.getAddress({address:params[1]});

	};

	
}(window.birddoggo));
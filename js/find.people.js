( function(Birddoggo) {

	Birddoggo.cache.resultArea = Birddoggo.cache.resultarea || $('.resultarea');
	Birddoggo.cache.personTPL = Birddoggo.cache.personTPL || $('#people_tpl').html();
	Birddoggo.cache.loadingHTML = Birddoggo.cache.loadingHTML  || $('#loading_tpl').html();
	Birddoggo.cache.noresultsHTML = Birddoggo.cache.noresultsHTML  || $('#noresults_tpl').html();
	var $resultArea = Birddoggo.cache.resultArea;
	var URL = 'services/people-service.php'


	Birddoggo.findPeople = function(params) {
		$resultArea.css('top','0');
		$resultArea.html(Birddoggo.cache.loadingHTML);
		$.ajax({
			url: URL,
			data: {
				name: params[0],
				lastname: params[1],
				zip: params[2] 
			},
			dataType : 'JSON',
			type: 'GET',

			success: Birddoggo.renderPerson,
			error: function(err,msg) {
				console.log(err.url);
				console.log(msg)
			}
		}) ;
	}

	
}(window.birddoggo));
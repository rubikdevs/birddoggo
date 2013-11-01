
( function(Birddoggo) {

	var URL = 'services/reverse-phone.php';

	var templateCache = [];

	
	Birddoggo.cache.resultArea = Birddoggo.cache.resultarea || $('.resultarea');
	Birddoggo.cache.personTPL = Birddoggo.cache.personTPL || $('#people_tpl').html();
	var $resultArea = Birddoggo.cache.resultArea;



	var renderPerson = function(response) {
		var person = {};   
		var listings = JSON.parse(response).listings;
		if ( listings && listings[0] && listings[0].displayname ) {
			person.address = listings[0].address;
			person.pname = listings[0].displayname;
			person.phone =  $('.searchfields > div.active input').eq(0).val() || $('.searchfields > div.active input').eq(1).val();
             
		}
		var resulthtml = _.template(Birddoggo.cache.personTPL, {person:person});
		$resultArea.html(resulthtml);
		$resultArea.css('top','0');
	};
	Birddoggo.lookupPhone = function(params) {
		$.ajax({
			url: URL,
			data: {
				param: params,
			},
			dataType : 'JSON',
			type: 'GET',

			success: renderPerson,
			error: function(err,msg) {
				console.log(err.url);
				console.log(msg)
			}
		}) ;
	}

	
}(window.birddoggo));

( function(Birddoggo) {

	var URL = 'services/reverse-phone.php';

	var templateCache = [];

	
	Birddoggo.cache.resultArea = Birddoggo.cache.resultarea || $('.resultarea');
	Birddoggo.cache.personTPL = Birddoggo.cache.personTPL || $('#people_tpl').html();
	Birddoggo.cache.loadingHTML = Birddoggo.cache.loadingHTML  || $('#loading_tpl').html();
	Birddoggo.cache.noresultsHTML = Birddoggo.cache.noresultsHTML  || $('#noresults_tpl').html();
	var $resultArea = Birddoggo.cache.resultArea;

	$(document).on('ajaxError',function() {
		$resultArea.html(Birddoggo.cache.noresultsHTML);
	});

	var renderPerson = function(response) {
		try {
			var person = {};  
			var listings = JSON.parse(response).listings;
			if ( listings && listings[0] && listings[0].displayname ) {
				person.address = listings[0].address;
				person.pname = listings[0].displayname;
				person.phone =  $('.searchfields > div.active input').eq(0).val() || $('.searchfields > div.active input').eq(1).val();
		         
			} else if(JSON.parse(response).errors.length) {
				$resultArea.html(Birddoggo.cache.noresultsHTML);
				return;
			}
			var resulthtml = _.template(Birddoggo.cache.personTPL, {person:person});
			$resultArea.html(resulthtml || Birddoggo.cache.noresultsHTML);
			$resultArea.css('top','0');
		} catch(e) {
			$resultArea.html(Birddoggo.cache.noresultsHTML);
		}
	};
	Birddoggo.lookupPhone = function(params) {
		$resultArea.css('top','0');
		$resultArea.html(Birddoggo.cache.loadingHTML);
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
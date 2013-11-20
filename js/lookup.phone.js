
( function(Birddoggo) {

	var URL = 'services/reverse-phone.php';

	var templateCache = [];

	
	Birddoggo.cache.resultArea = Birddoggo.cache.resultarea || $('.resultarea');
	Birddoggo.cache.personTPL = Birddoggo.cache.personTPL || $('#people_tpl').html();
	Birddoggo.cache.loadingHTML = Birddoggo.cache.loadingHTML  || $('#loading_tpl').html();
	Birddoggo.cache.noresultsHTML = Birddoggo.cache.noresultsHTML  || $('#noresults_tpl').html();
	var $resultArea = Birddoggo.cache.resultArea;

	$(document).on('ajaxError',function() {
		$resultArea.html(Birddoggo.cache.noresultsHTML);
	});

	Birddoggo.renderPerson = function(response,dontClearResultArea) {
		try {
			var listings = JSON.parse(response).listings,
				persons = [];
			if ( listings && listings[0] && listings[0].displayname ) {
				for( var i = 0; i < listings.length; ++i ) { 
					var person = {};  
						person.address = listings[i].address;
						person.pname = listings[i].displayname;
						person.wplink = listings[i].listingmeta.moreinfolinks.viewdetails.url || '#';
						try {
							person.phone = listings[i].phonenumbers[0].fullphone;
						} catch (ex) {
							person.phone = '';
						}
				        persons.push(person);
				}
			} else if(JSON.parse(response).errors.length && !dontClearResultArea) {
				$resultArea.html(Birddoggo.cache.noresultsHTML);
				return;
			}
			var resulthtml = _.template(Birddoggo.cache.personTPL, {persons:persons});
			if (dontClearResultArea !== true) {
				$resultArea.html(resulthtml || Birddoggo.cache.noresultsHTML);
			} else {
				$resultArea.append(resulthtml);
			}
			$resultArea.css('top','0');
		} catch(e) {
			if (dontClearResultArea !== true) {
				$resultArea.html(Birddoggo.cache.noresultsHTML);
			}
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

			success: Birddoggo.renderPerson,
			error: function(err,msg) {
				console.log(err.url);
				console.log(msg)
			}
		}) ;
	}

	
}(window.birddoggo));
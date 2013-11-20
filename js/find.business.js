( function(Birddoggo) {

	Birddoggo.cache.resultArea = Birddoggo.cache.resultarea || $('.resultarea');
	Birddoggo.cache.businessTPL = Birddoggo.cache.businessTPL || $('#business_tpl').html();
	Birddoggo.cache.loadingHTML = Birddoggo.cache.loadingHTML  || $('#loading_tpl').html();
	Birddoggo.cache.noresultsHTML = Birddoggo.cache.noresultsHTML  || $('#noresults_tpl').html();
	var $resultArea = Birddoggo.cache.resultArea;
	var URL_WP = 'services/business-service.php';
	var URL_FEATURED = 'admin/index.php?r=site/getadvertiser';

	Birddoggo.createMaps = function() {
		for( var i = 0; i < Birddoggo.maps.length; ++i) {
			var mapOptions = { 
				zoom: 12, 
				center: Birddoggo.maps[i].latlong, 
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				mapTypeControl: true,
				scrollwheel: false,
			    mapTypeControlOptions: {
			      style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
			    },
			};
		    	
		    var map = new google.maps.Map(document.getElementById(Birddoggo.maps[i].mapid),mapOptions);
		    var marker = new google.maps.Marker({ position: Birddoggo.maps[i].latlong, map: map });
		}
	    	
	};

	Birddoggo.findBusiness = function(params) {
		Birddoggo.geocodeCallback = function() {
			Birddoggo.geocodeCallback = $.noop;
			$.ajax({
				url: URL_FEATURED,
				type: 'GET',
				data: {
					'keywords': params[0],
					'location': JSON.stringify(Birddoggo.address)
				},
				success: function(response) {
					var html = _.template(Birddoggo.cache.businessTPL, {responseArr: JSON.parse(response)});
					Birddoggo.cache.resultArea.html(html);
					Birddoggo.createMaps();
					$.ajax({
						url: URL_WP,
						type: 'GET',
						dataType : 'JSON',
						data: {
							category: params[0],
							city: Birddoggo.address.localitys,
							state: Birddoggo.address.administrative_area_level_1s,
							zip: Birddoggo.address.postal_code
						},
						success: function(response) {
							var dontClearResultArea = true;
							Birddoggo.renderPerson(response, dontClearResultArea);
						},
						error: function(error) {
							console.log(error);
						}

					});
				}
			});
		}
		Birddoggo.getAddress({address:params[1]});

	};

	
}(window.birddoggo));
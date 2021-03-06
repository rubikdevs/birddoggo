
( function(Birddoggo) {

	var URL = 'services/movie-service.php';

	var templateCache = [];

	
	Birddoggo.cache.resultArea = birddoggo.cache.resultarea || $('.resultarea');
	Birddoggo.cache.loadingHTML = Birddoggo.cache.loadingHTML  || $('#loading_tpl').html();
	Birddoggo.cache.noresultsHTML = Birddoggo.cache.noresultsHTML  || $('#noresults_tpl').html();

	var $resultArea = birddoggo.cache.resultArea;
	

	var renderShow = function(currentShowing, showingsData, url) {
		var moviesshow = {};
		moviesshow.mtitle = currentShowing.movieTitle;
		moviesshow.rating = currentShowing.movieRating;
		moviesshow.duration = currentShowing.runtime;
		moviesshow.movieId = currentShowing.movieId;
		moviesshow.showings = currentShowing.showTimes && currentShowing.showTimes && currentShowing.showTimes.showTime;
		moviesshow.url = 'http://www.moviephone.com' + url || '';
		var movieImg ;
		$.ajax({
			async:true,
			url:'services/image-service.php',
			dataType: 'text',
			data: {
				id: currentShowing.movieId,
			},
			success: function(resp) {
				$('.poster'+currentShowing.movieId).attr('src',resp);

			}
		});
		
		showingsData.push(moviesshow);		
	};

	var renderMovies = function(response) {
		var resultIndex = 0,
			resultArray = response.searchresults && response.searchresults.resultcategory,
			theatersData = [],
			theaterObj = {},
			theatherHTML,
			theatersArray,
			theatersCount,
			theaterIndex,
			showingsHTML,
			showingsData = [];
		

		if (!resultArray) {
			$resultArea.html(Birddoggo.cache.noresultsHTML);
			return 'No results';

		}
		try {
		templateCache['movie_tpl'] = templateCache['movie_tpl'] || $('#movie_tpl').html();
		resultCount = resultArray.length;
		for( ; resultIndex < resultCount; ++resultIndex ) {
			showingsHTML = '';
 			if (resultArray[resultIndex]['@type'] !== 'Theaters') continue;
 			theatersArray = resultArray[resultIndex].theater;
 			break;
 		}
 		theatersArray = theatersArray || resultArray.theater;
		theatersCount = theatersArray.length;
		for(theaterIndex = 0; theaterIndex < theatersCount; ++theaterIndex) {
			showingsData = [];
			var theaterRespObj = theatersArray[theaterIndex],
				showingIndex = 0, 
				showingCount = theaterRespObj.showings.showing && theaterRespObj.showings.showing.length;
			for( ; showingIndex <  showingCount ; ++showingIndex ) {
				var currentShowing = theaterRespObj.showings.showing[showingIndex];
				renderShow(currentShowing, showingsData, theaterRespObj.theaterLink);
			}

			if (theaterRespObj.showings.showing && theaterRespObj.showings.showing.movieTitle) {
				renderShow(theaterRespObj.showings.showing,showingsData, theaterRespObj.theaterLink);
			}

			showingsHTML = _.template(templateCache['movie_tpl'], {movies: showingsData});
			theaterObj = {};
			theaterObj.tname = theaterRespObj.theaterName;
			theaterObj.address = theaterRespObj.theaterAddress;
			theaterObj.city = theaterRespObj.theaterCity;
			theaterObj.moviesList = showingsHTML;
			theaterObj.state =  theaterRespObj.theaterState;
			theaterObj.zip = theaterRespObj.theaterZip;
			theaterObj.phone = theaterRespObj.theaterPhone || '';
			theatersData.push(theaterObj);
		}
		templateCache['theater_tpl'] = templateCache['theater_tpl'] || $('#theater_tpl').html();
		var theatherHTML = _.template(templateCache['theater_tpl'], {theatersData: theatersData});
		$resultArea.html(theatherHTML);
		$resultArea.css('top','0');

		} catch(e) {
			$resultArea.html(Birddoggo.cache.noresultsHTML);
		}

	};
	Birddoggo.findMovie = function(params) {
		$resultArea.css('top','0');
		$resultArea.html(Birddoggo.cache.loadingHTML);
		$.ajax({
			url: URL,
			data: {
				param: params,
			},
			dataType : "json",
			type: 'GET',


			success: renderMovies,
			error: function(err,msg) {
				console.log(err.url);
				console.log(msg)
			}
		}) ;
	}

	
}(window.birddoggo));
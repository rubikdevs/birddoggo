
( function(birddoggo) {

	var URL = 'http://www.moviefone.com/search/the%20social%20network%2011209';
	birddoggo.findMovie = function(params) {
		$.ajax({
			url: URL, //+ window.encodeURIComponent(params),
			data: {
				format: 'xml',
			},
			crossDomain:true,
			dataType : "XML",
			type: 'GET',


			success: function(response) {
				console.log(response);
			},
			error: function(err,msg) {
				console.log(err.url);
				console.log(msg)
			}
		}) ;
	} 
	
}(window.birddoggo));
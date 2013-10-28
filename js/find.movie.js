
( function(birddoggo) {

	var URL = 'services/movie-service.php';
	birddoggo.findMovie = function(params) {
		$.ajax({
			url: URL,
			data: {
				param: params,
			},
			dataType : "json",
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
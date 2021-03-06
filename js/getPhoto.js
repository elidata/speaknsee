
function getPhoto(ptext){
	console.log('Retreiving picture of '+ptext) ;
	var opts = {
		method: 'flickr.photos.search',
		api_key: '8fa1f864f11a3f6f2d7cbd167f4d6207',
		sort: 'relevance',
		text: ptext,
		extras: 'url_m',
		per_page: 1,
		format: 'json',
		nojsoncallback: 1
	};
	$.get('https://api.flickr.com/services/rest/', opts, function(resp){
		var images;
		if (resp.stat === "ok") {
			images = $('<row>', {'class': 'gallery'})
			$.each(resp.photos.photo, function(index, value){
				var image = $('<column>', {
					'class': 'gallery__item'
				}).append($('<img>', {
					src: value.url_m,
					//title: value.title,
					title: ptext,
					height: '200px',
				})).appendTo(pictures);
			});
			images.appendTo('body');
		}
		else {
			console.log('not ok', resp);
		}
	});
};

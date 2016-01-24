exports.feature = function(req, res) {
	
	//res.cookies.set
	res.locals.seo.title = 'browser HTML5 feature detec­tion ';
	res.render('dev_feature');

}
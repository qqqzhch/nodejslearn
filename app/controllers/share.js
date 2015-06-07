var markdown = require('markdown-it')({
	html: true,
	linkify: true,
	typographer: true
});
var webshot = require('webshot');
var forHtml = require('./forHtml');
var getUid = require('./getUid');

exports.code = function(req, res) {
	var userCookieID = req.cookies.get('userCookieID');
	var date = new Date();
	var expireDays = 10;
	var uid = '';
	var urlId = req.query['id'];
	console.log('urlId:' + urlId);
	if (userCookieID == '' || userCookieID == undefined) {
		if (urlId == "" || urlId == undefined) {
			uid = getUid.getid();
		} else {
			uid = urlId;
		}

		req.cookies.set('userCookieID', uid, {
			expires: date.getTime() + expireDays * 24 * 3600 * 1000,
			'maxAge': expireDays * 24 * 3600
		})
	} else {
		uid = userCookieID
		console.log('cookie cun zai ')
	}
	res.locals.uid = uid;
	//res.cookies.set
	res.locals.seo.title = 'share code to twitter,facebook as a img .markdown supported';
	if (urlId == "" || urlId == undefined) {
		res.redirect("/sharecode?id=" + uid);
	} else {
		res.render('share_code');
	}

}

var options = {
	screenSize: {
		width: 516,
		height: 516
	},
	windowSize: {
		width: 516,
		height: 516
	},
	shotSize: {
		width: 'window',
		height: 'window'
	},
	takeShotOnCallback: true,
	onLoadFinished: function() {
		window.callPhantom('takeShot');
	},
	siteType: 'html',
	quality: 100,
	shotOffset: {
		left: 0,
		right: 0,
		top: 0,
		bottom: 0
	},
	userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/41.0.2272.76 Chrome/41.0.2272.76 Safari/537.36'
}

exports.codeToimg = function(req, res) {
	var codeMark = req.param('codeMark')
	var height = req.param('height');
	if (height == undefined || height < 100) {
		height = 150;
	}
	if (height > 1000) {
		height = 1000;
	}
	var userCookieID = req.cookies.get('userCookieID')
	if (userCookieID == "" || userCookieID == undefined) {
		res.send('not find userCookieID in cookie');
		return;
	}
	var html = markdown.render(codeMark);
	html = forHtml.tpl({
		html: html
	})
	var filepath = 'public/webshot/' + userCookieID + '.png';
	options.screenSize.height = height;
	options.windowSize.height = height;
	res.locals.seo.title = 'share code to twitter,facebook as a img .markdown supported';


	webshot(html, filepath, options, function(err) {
		// screenshot now saved to hello_world.png
		console.log(filepath)
		res.send(filepath);

	});

}

exports.codetpl = function(req, res) {
	res.render('codetpl', {
		title: 'info',
		dev: process.env
	});

}
var amazonBookSql = require('../model/amazonBook');
var async = require('async');
var friendlyUrl = require('friendly-url');
var gitRepoSql = require('../model/gitRepo');
var pagerCom = require('./pager');


exports.list = function(req, res) {
	var ower = req.params.ower;
	var repo = req.params.repo;
	var full_name = ower + "/" + repo;
	var index = req.params.pager || 1;
	if (index < 1) {
		index = 1
	}
	var bookBaseUrl = '/opensource/' + ower + "/" + repo + '/b/';

	res.locals.bookBaseUrl = bookBaseUrl;
	res.locals.friendlyUrl = friendlyUrl;
	res.locals.seo.title = "open source project " + repo + " related books";

	///
	async.parallel([

		function(callback) {
			gitRepoSql
				.getRepoInfoPart(full_name)
				.then(function(data) {
					res.locals.respInfo = data;
					callback()
				}, function(err) {
					callback(err)
				})
		},
		function(callback) {
			amazonBookSql
				.getBookPager(full_name, index - 1, 30)
				.then(function(data) {
					res.locals.BookList = data;
					pagerCom.getPager(res, data, index, '/opensource/' + ower + "/" + repo + '/book/')
					callback()
				}, function(e) {
					callback(e)
				})

		}
	], function(err) {
		if (err) {
			console.log('***************')
			res.render('error');
		} else {
			res.render('OpenSource_book');
		}
	});
	///



}
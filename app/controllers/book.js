var amazonBookSql = require('../model/amazonBook');
var async = require('async');
var friendlyUrl = require('friendly-url');
var gitRepoSql = require('../model/gitRepo');
var pagerCom = require('./pager');

var hackStory = require('../model/hackStory');
var async = require('async');


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

		},
		function(callback) {
			hackStory
				.getPagerByfullname(0, 30, full_name)
				.then(function(data) {
					res.locals.respList = data;
					callback(null)
				}, function(err) {
					callback(err)
				}).catch(function(err) {

					res.statusCode = 500;
					callback(err)
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


exports.info = function(req, res) {
	var ower = req.params.ower;
	var repo = req.params.repo;
	var full_name = ower + "/" + repo;
	var id_site = req.params.id_site;
	var id_book = req.params.id_book;
	var videoBaseUrl = '/opensource/' + ower + "/" + repo + '/b/';
	res.locals.videoBaseUrl = videoBaseUrl;
	res.locals.friendlyUrl = friendlyUrl;
	///
	async.parallel([

		function(callback) {
			gitRepoSql
				.getRepoInfoPart(full_name)
				.then(function(data) {
					res.locals.respInfo = data;
					callback();
				}, function(err) {
					callback(err)
				})
		},
		function(callback) {
			amazonBookSql.getBookInfo(id_book)
				.then(function(data) {
					
					res.locals.BookInfo = data;
					callback();
				}, function(err) {
					callback(err)
				})


		}
	], function(err) {
		if (err) {
			res.render('error');
		} else {
			res.locals.seo = {
				title: res.locals.BookInfo.ItemAttributes.Title + "-open source projects " + full_name,
				keywords: full_name,
				description: ''
			}
			res.render('OpenSource_bookInfo');
		}
	});
	///

}
var hackStory = require('../model/hackStory');
var async = require('async');
var friendlyUrl = require('friendly-url');
var gitRepoSql = require('../model/gitRepo');
var pagerCom = require('./pager');


exports.index = function(req, res) {
    var index = req.params.pager || 1;
    if (index < 1) {
        index = 1
    }
    res.locals.seo.title = "opensource -Find what you are looking for open source projects, to share and Exchange"
    console.log('=================================')

    hackStory
        .getPager(index - 1, 30)
        .then(function(data) {
            if (index > 1) {
                res.locals.seo.title = "page " + index + " of  " + res.locals.seo.title
            }
            pagerCom.getPager(res, data, index, '/')
            res.locals.respList = data;

            res.render('index');

        }, function(err) {
            console.log('88888')
            throw err;

        }).catch(function(error) {
            console.log(error)
            console.log('8888866668886')
            res.statusCode = 500;
            res.render('error');
        })
}
exports.newsinfo = function (req, res) {
        var id = req.params.id || 0;
       hackStory.getBookInfo(id)
        .then(function(data) {

            res.locals.seo.title = data.title+ "-Find what you are looking for open source projects, to share and Exchange"
            res.locals.BookInfo = data;
                res.render('newsinfo');
        }, function(err) {

                res.render('error');
        })

}

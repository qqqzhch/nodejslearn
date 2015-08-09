var stackQuestionSql = require('../model/stackQuestion')
var gitRepoSql = require('../model/gitRepo');
var stackAnswerSql = require('../model/stackAnswer');
var async = require('async');
var friendlyUrl = require('friendly-url');
var pagerCom = require('./pager');

exports.gitRepo = function(req, res) {
    
    var keyword= req.params.keyword|| '';
    if(keyword==''||keyword.length>50){
       res.redirect('/opensource/'); 
       return;
    }
    res.locals.seo.title = "search  " + keyword+"  result"+ "-opensource -Find what you are looking for open source projects, to share and Exchange"
        gitRepoSql
        .searchRepoInfoPart(keyword)
        .then(function (data) {
            // console.log(data)

            res.locals.respList = data;
            res.render('search');
        },function  (error) {
       res.render('search');        
        })
    
    
}
exports.stackQuestion = function(req, res) {
    var ower = req.params.ower;
    var repo = req.params.repo;
    var full_name = ower + "/" + repo;
    var index = req.params.pager || 1;
    res.render('error');
}
exports.yotube = function(req, res) {
    var ower = req.params.ower;
    var repo = req.params.repo;
    var full_name = ower + "/" + repo;
    var index = req.params.pager || 1;
    res.render('error');
}
exports.book = function(req, res) {
    var ower = req.params.ower;
    var repo = req.params.repo;
    var full_name = ower + "/" + repo;
    var index = req.params.pager || 1;
    res.render('error');
}
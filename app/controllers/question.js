var stackQuestionSql = require('../model/stackQuestion')
var gitRepoSql = require('../model/gitRepo');
var stackAnswerSql = require('../model/stackAnswer');
var async = require('async');
var friendlyUrl = require('friendly-url');
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
    var questionBaseUrl = '/opensource/' + ower + "/" + repo + '/q/';

    res.locals.questionBaseUrl = questionBaseUrl;
    res.locals.friendlyUrl = friendlyUrl;
    res.locals.seo.title = "open source project " + repo + " related issues"

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
            stackQuestionSql
                .getQuesionPager(full_name, index - 1, 30)
                .then(function(data) {
                    res.locals.QuestionList = data;
                    pagerCom.getPager(res, data, index, '/opensource/' + ower + "/" + repo + '/question/')
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
            res.render('error');
        } else {
            res.render('OpenSource_question');
        }
    });
    ///



}
exports.info = function(req, res) {
    var ower = req.params.ower;
    var repo = req.params.repo;
    var full_name = ower + "/" + repo;
    var id_site = req.params.id_site;
    var id_question = req.params.id_question;
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
            stackQuestionSql
                .getQuesionInfo(id_site, id_question)
                .then(function(data) {
                    res.locals.questionInfo = data;

                    callback()
                }, function(e) {
                    callback(e)
                })

        },
        function(callback) {
            stackAnswerSql.
            getAnswersByQuestion(id_question)
                .then(function(data) {
                    res.locals.Answers = data;
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
            res.render('error');
        } else {
            var keywords;
            if (res.locals.questionInfo.tags) {
                keywords = res.locals.questionInfo.tags.join(',');
            }
            res.locals.seo = {
                title: res.locals.questionInfo.title + "-open source projects  " + full_name,
                keywords: res.locals.questionInfo.tags.join(','),
                description: ''
            }

            res.render('OpenSource_questionInfo')

        }
    });
    ///


}
var gitRepoSql = require('../model/gitRepo');
var async = require('async');
var friendlyUrl = require('friendly-url');
var youtobeVideoSql = require('../model/youTobeVideos');
var pagerCom = require('./pager');

exports.list = function(req, res) {
    var ower = req.params.ower;
    var repo = req.params.repo;
    var full_name = ower + "/" + repo;
    var index = req.params.pager || 1;
    var videoBaseUrl = '/opensource/' + ower + "/" + repo + '/v/';
    res.locals.videoBaseUrl = videoBaseUrl;
    res.locals.friendlyUrl = friendlyUrl;
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
            youtobeVideoSql
                .getVideosPager(full_name, index - 1, 30)
                .then(function(data) {
                    res.locals.youtobeVideoList = data;
                    pagerCom.getPager(res,data,index,'/opensource/' + ower + "/" + repo + '/video/');
                    callback()
                }, function(e) {
                    console.log(e);
                    callback(e)
                })

        }
    ], function(err) {
        if (err) {
            res.render('error');
        } else {
            res.render('OpenSource_video');
        }
    });
    ///


}

exports.info=function(req,res){
        var ower = req.params.ower;
    var repo = req.params.repo;
    var full_name = ower + "/" + repo;
    var id_site = req.params.id_site;
    var id_video = req.params.id_video;
    var videoBaseUrl = '/opensource/' + ower + "/" + repo + '/v/';
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
            youtobeVideoSql
                .getVideo(id_site, id_video)
                .then(function(data) {
                     res.locals.VideoInfo = data;
                     res.locals.VideoUrl=''
                     if(data.player){
                        res.locals.VideoUrl=data.player.embedHtml
                        res.locals.VideoUrl=res.locals.VideoUrl.replace("/>","></iframe>")
                     }

                    callback()
                }, function(e) {
                    callback(e)
                })

        }
    ], function(err) {
        if (err) {
            res.render('error');
        } else {
           res.render('OpenSource_videoInfo');
        }
    });
    ///
      
}
var Sequelize = require('sequelize');
var async = require('async');
// var sequelize = new Sequelize('postgres://user:postgres:5432/bendi');
var gitRepoSql = require('../model/gitRepo')
var youTobeVideosSql = require('../model/youTobeVideos')

var youSearchHistrySql = require('../model/youSearchHistry')
var requrstMock = require('./requrstMock');
var _ = require('underscore');
var Base64 = require('./base64.js').Base64;

var searchPage = 0;

function getresplist(callbaack) {
    console.log('读取repos');
    gitRepoSql
        .findAll({
            offset: 0,
            limit: 10,
            order: '"createdAt" ASC',
            where :["viedo_num is NULL"]
        })
        .then(function(result) {

            callbaack(null, result)
        });
}

function getYoutubeSearch(list, callbaack) {

    async.map(list, function(aitem, callback) {
        
        var nameForSearch=aitem.name;
        if(aitem.search_name){
            nameForSearch=aitem.search_name;
        }
        if(aitem.language){
         nameForSearch+="    "  + aitem.language 
        }
        console.log('采集视频' + nameForSearch);
        requrstMock.getYoutubeSearch(nameForSearch, searchPage, function(error, response, body) {
            if (body.items) {
                async.each(body.items, function(qitem, itemCallback) {

                    qitem.repo_full_name = aitem.full_name;
                    qitem.repo_language = aitem.language;

                    youtubeStore(qitem, itemCallback)


                }, function(err) {
                    callback(null, {
                        name: aitem.name,
                        full_name: aitem.full_name,
                        error: err,
                        num: body.items.length,
                        pageinfo: body.pageInfo,
                        nextPageToken: body.nextPageToken
                    });
                    console.log(aitem.name + "||" + body.items.length);
                });
            }

        })

    }, function(err, result) {
        callbaack(err, result)

    })
}

function youtubeStore(qitem, itemCallback) {


    qitem.id.kind=qitem.id.kind.replace('#',"_");
    youTobeVideosSql
        .findOrCreate({
            where: {
                id_kind: qitem.id.kind,
                id_videoId: qitem.id.videoId,
            },
            defaults: qitem
        }).then(function(item) {
            itemCallback(null)
        }, function(e) {
            console.log(e);
            itemCallback(null)

        })

}

function youtubeHisstryStore(result, Callbaack) {

    async.each(result, function(item, callback) {
        item.pageindex = searchPage;

        youSearchHistrySql
            .findOrCreate({
                where: {
                    searchName: item.name
                },
                defaults: item
            }).then(function(itemf) {
                item.searchName = item.name;
                if (itemf[0].pageindex < searchPage) {
                    itemf[0].dataValues = item;
                    itemf[0].save();
                }
                callback(null)
            }, function(e) {
                callback(null)
            })

    }, function() {
        Callbaack(null,result);
    });
}
function repoViedoUpdate(result, Callbaack) {

    async.each(result, function(item, callback) {
        item.pageindex = searchPage;
        gitRepoSql.find({
           where:{full_name: item.full_name} 
        }).then(function(repo) {
            repo.viedo_num = item.num;
            repo.save().
            then(function() {
                    callback(null);
            })
            
        })

    }, function() {
        Callbaack(null);
    });
}






module.exports .run=function () {
async.waterfall([
    getresplist,
    getYoutubeSearch,
    youtubeHisstryStore,
    repoViedoUpdate
], function(err) {
    console.log('可以开始读取下一页了');
})
}
var Sequelize = require('sequelize');
var async = require('async');
// var sequelize = new Sequelize('postgres://user:postgres:5432/bendi');
var gitRepoSql = require('../model/gitRepo')
var youTobeVideosSql = require('../model/youTobeVideos')

var youSearchHistrySql = require('../model/youSearchHistry')
var requrstMock = require('./requrstMock');
var _ = require('underscore');
var Base64 = require('./base64.js').Base64;



function foryoutubeSearch(callbaack) {
console.log('foryoutubeSearch')

    youTobeVideosSql
        .findAll({
            offset: 0,
            limit: 50,
             where: ['"isSearchedSon" is NULL']
        })
        .then(function(result) {

            callbaack(null, result)
        });
}

function getForGroup(list, callbaack) {
    var ids = _.pluck(list, 'id_videoId').join(',');

    callbaack(null, ids, list)
}

function getyoutubeVideoListByGroup(ids, list, callbaack) {
    console.log('采集视频')
    //ids
    requrstMock.getYoutubeVideoInfo(ids, function(error, response, body) {

        console.log('采集视频回来' + ids);

        // console.log(body.content)
        // aitem.__readme = body;
        console.log(error)
        if(error){
            callbaack(error, []);
        }else{
            if (body&&body.items) {
                callbaack(error, body.items);
            }   else{
                callbaack(error, []);
            } 
        }
        
    })

}

function stroeyoutubeVideo(list, callbaack) {
    async.each(list, function(item, callback) {
        item.kind=item.kind.replace('#',"_");
            youTobeVideosSql.find({
                where: {
                
                        id_kind: item.kind,
                        id_videoId: item.id
                   
                }
            })
                .then(function(result) {
                    result.statistics = item.statistics;
                    result.player = item.player;
                    result.isSearchedSon=true;
                    // result__s.updateAttributes({
                    //     statistics: item.statistics,
                    //     player: item.player
                    // })
                    result.save().catch(function(e) {
                        console.log(e);
                    })
                        .then(function(e) {
                            callback(null)
                        });
                })



        },
        function(err) {
            callbaack(err)
        });

}



module.exports .run=function () {
async.waterfall([
    foryoutubeSearch,
    getForGroup,
    getyoutubeVideoListByGroup,
    stroeyoutubeVideo
], function(err) {
    console.log(err);
    console.log('采集完了可以开始下一页了');
})
}
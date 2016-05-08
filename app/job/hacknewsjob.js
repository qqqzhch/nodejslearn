var Sequelize = require('sequelize');
var async = require('async');
// var sequelize = new Sequelize('postgres://user:postgres:5432/bendi');
var gitRepoSql = require('../model/gitRepo')
var hackStory = require('../model/hackStory')
var hn = require('hacker-news-api');

// var booksearchHistry = require('../model/booksearchHistry')
// var requrstMock = require('./requrstMock');
var _ = require('underscore');
var Base64 = require('./base64.js').Base64;

var searchPage = 0;



function getresplist(callbaack) {
    console.log('读取repos');
    gitRepoSql
        .findAll({
            offset: 0,
            limit: 5,
            order: '"stargazers_count" desc',
            where: ["story_num is NULL"]
        })
        .then(function(result) {
            searchPage = 1;
            callbaack(null, result)
        });
}


function getBookSearch(list, callbaack) {

    async.map(list, function(aitem, callbackmap) {

        var nameForSearch = aitem.name;
        if (aitem.search_name) {
            nameForSearch = aitem.search_name;
        }
        if (aitem.language) {
            nameForSearch += "    " + aitem.language
        }
        if (aitem.language == nameForSearch) {
            nameForSearch += "    " + aitem.owner.login
        }
        console.log('采集news ' + nameForSearch);
        hn.story().search(nameForSearch).hitsPerPage(500).before('past_week', function(error, data) {
            if (error) {
                //cuowu
                console.log(error);
            } else {
                if (data && data.hits) {
                    async.each(data.hits, function(qitem, callbackeach) {
                        // body...
                        // repo_full_name
                        // repo_language
                        qitem.repo_full_name = aitem.full_name;
                        qitem.repo_language = aitem.language;
                        saveStore(qitem, callbackeach)
                    }, function(err) {
                        callbackmap(null, {
                            name: aitem.name,
                            full_name: aitem.full_name,
                        });
                    })

                }else{
                          callbackmap(null, {
                            name: aitem.name,
                            full_name: aitem.full_name,
                        });
                }

            }


        });



    }, function(err, result) {
        console.log('map hudiaowan')
        callbaack(err, result)

    })
}


function saveStore(qitem, itemCallback) {

    console.log('save saveStore')

    qitem.tags = qitem._tags
    if(qitem.url){
        qitem.haveurl=true;
    }else{
        qitem.haveurl=false;
    }
    if(qitem.haveurl==false){
        itemCallback(null)
        return;
    }


    hackStory
        .findOrCreate({
            where: {
                objectID: qitem.objectID
            },
            defaults: qitem
        }).then(function(item) {
            itemCallback(null)
        }, function(e) {
            console.log(e);
            console.log(2)
            itemCallback(null)

        })

}



function repoViedoUpdate(result, Callbaack) {
    console.log('repoViedoUpdate')

    async.each(result, function(item, callback) {
        // item.pageindex = searchPage;
        gitRepoSql.find({
            where: {
                full_name: item.full_name
            }
        }).then(function(repo) {
            repo.story_num = 1;
            repo.save().
            then(function() {
                callback(null);
            })

        })

    }, function() {
        Callbaack(null);
    });
}


module.exports.run = function() {
    async.waterfall([
        getresplist,
        getBookSearch,
        repoViedoUpdate
    ], function(err) {
        console.log('可以开始读取下一页了');
    })
}
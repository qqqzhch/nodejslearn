var Sequelize = require('sequelize');
var async = require('async');
// var sequelize = new Sequelize('postgres://user:postgres:5432/bendi');
var gitRepoSql = require('../model/gitRepo');
var stackQuestionSql = require('../model/stackQuestion');

var stackSearchHistrySql = require('../model/stackSearchHistry');
var requrstMock = require('./requrstMock');
var _ = require('underscore');
var Base64 = require('./base64.js').Base64;

var searchPage = 0;
var ids=[];

function getresplist(callbaack) {
    console.log('读取repos');
    gitRepoSql
        .findAll({
            offset: 0,
            limit: 10,
            order: '"createdAt" ASC',
            where: ["question_num is NULL"]
        })
        .then(function(result) {

            callbaack(null, result)
        });
}

function getrespQuestion(list, callbaack) {
    console.log('采集问题')
    async.map(list, function(aitem, callback) {
        console.log('采集' + aitem.name);
        requrstMock.getstackSearch(aitem.name, searchPage, function(error, response, body) {
            if (body.items == undefined) {
                body.items = []
            }
            async.each(body.items, function(qitem, itemCallback) {
                   console.log('cunhu stackQuestion!=================!')
                qitem.repo_full_name = aitem.full_name;
                qitem.repo_language = aitem.language;

                stackQuestionStore(qitem, itemCallback)


            }, function(err) {
                callback(null, {
                    name: aitem.name,
                    full_name: aitem.full_name,
                    error: err,
                    num: body.items.length,
                    has_more:body.has_more
                });
                console.log(aitem.name + "||" + body.items.length);
            });


        })
    }, function(err, result) {
        callbaack(err, result)

    })

}


function stackQuestionStore(qitem, itemCallback) {
    console.log('cunhu stackQuestion!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
    console.log(qitem.question_id)

    qitem.question_id=qitem.question_id+"";
    // ids.push(qitem.question_id+"|"+qitem.title)
    console.log('cunhu stackQuestion'+qitem.repo_full_name)
    stackQuestionSql
        .findOrCreate({
            where: {
               id_site: 'stackoverflow',
               id_question_id: qitem.question_id
            },
            defaults: qitem
        }).spread(function(temp, created) {
            console.log('jieuo:'+created)
            itemCallback(null)
            })
}


function stackSearchHisstryStore(result, Callbaack) {

    async.each(result, function(item, callback) {
        item.pageindex = searchPage;

       stackSearchHistrySql
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
        console.log('************************')
    console.log(ids)
    async.each(result, function(item, callback) {
        item.pageindex = searchPage;
        gitRepoSql.find({
           where:{full_name: item.full_name} 
        }).then(function(repo) {
            repo.question_num = item.num;
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
    getrespQuestion,
   stackSearchHisstryStore,
   repoViedoUpdate
], function(err) {
    console.log('可以开始读取下一页了');

})
}
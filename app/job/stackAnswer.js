var Sequelize = require('Sequelize');
var async = require('async');
// var sequelize = new Sequelize('postgres://user:postgres:5432/bendi');
var stackQuestionSql = require('../model/stackQuestion')
var stackAnswerSql = require('../model/stackAnswer')

var youSearchHistrySql = require('../model/youSearchHistry')
var requrstMock = require('./requrstMock');
var _ = require('underscore');
var Base64 = require('./base64.js').Base64;

function getlist(callbaack) {
    console.log('读取repos');
    stackQuestionSql
        .findAll({
            offset: 0,
            limit: 10,
            order: '"createdAt" ASC',
            where: '"isSearchedSon" is NULL'
        })
        .then(function(result) {

            callbaack(null, result)
        });
}

function getForGroup(list, callbaack) {
    var ids = _.pluck(list, 'id_question_id').join(',');

    callbaack(null, ids, list)
}

function getListByGroup(ids, list, callbaack) {
    console.log('采集')
    //ids
    requrstMock.getgetAnswersnfo(ids, function(error, response, body) {

        console.log('采集回来' + ids);

        // console.log(body.content)
        // aitem.__readme = body;
        if (body.items) {
            callbaack(error, body.items, ids);
        } else {
            callbaack(error, [], ids);
        }
    })

}

function stroe(list, ids, callbaack) {
    async.each(list, function(item, callback) {
            stackAnswerSql
                .findOrCreate({
                    where: {
                        answer_id: item.answer_id
                    },
                    defaults: item
                }).then(function(item) {
                    callback(null)
                }, function(e) {
                    console.log(aitem);
                    console.log(e);
                    callback(e)

                })




        },
        function(err) {
            callbaack(err, ids)
        });

}

function updateFather(ids, callbaack) {
    var idsList = ids.split(',');
    async.each(idsList, function(item, callback) {
            if (item != "") {
                stackQuestionSql
                    .find({
                        where: {
                            id_site: 'stackoverflow',
                            id_question_id: item,
                        }
                    })
                    .then(function(result) {
                    	result.isSearchedSon=true;
                    	result.save()


                        callbaack(null)
                    });
            }


        },
        function(err) {
            callbaack(err, ids)
        });

}
async.waterfall([
    getlist,
    getForGroup,
    getListByGroup,
    stroe,
    updateFather
], function(err) {
    console.log(err);
    console.log('采集完了可以开始下一页了');
})
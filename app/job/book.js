var Sequelize = require('sequelize');
var async = require('async');
// var sequelize = new Sequelize('postgres://user:postgres:5432/bendi');
var gitRepoSql = require('../model/gitRepo')
var amazonBook= require('../model/amazonBook')

 var booksearchHistry = require('../model/booksearchHistry')
var requrstMock = require('./requrstMock');
var _ = require('underscore');
var Base64 = require('./base64.js').Base64;

var searchPage = 0;



function getresplist(callbaack) {
    console.log('读取repos');
    gitRepoSql
        .findAll({
            offset: 0,
            limit: 2,
            order: '"stargazers_count" desc',
            where :["book_num is NULL"]
        })
        .then(function(result) {
            searchPage = 1;
            callbaack(null, result)
        });
}


function getBookSearch(list, callbaack) {

    async.map(list, function(aitem, callback) {
        
        var nameForSearch=aitem.name;
        if(aitem.search_name){
            nameForSearch=aitem.search_name;
        }
        if(aitem.language){
         nameForSearch+="    "  + aitem.language 
        }
        if(aitem.language==nameForSearch){
         nameForSearch+="    "+ aitem.owner.login   
        }
        console.log('采集tushu ' + nameForSearch);
        requrstMock.getBookSearch(nameForSearch, searchPage, function(error, response, body) {
            if (error==null&&body&&body.Items&&body.Items.Item) {
                async.each(body.Items.Item, function(qitem, itemCallback) {
                qitem.repo_full_nameList=[];
                qitem.repo_languageList=[];
                    qitem.repo_full_nameList.push(aitem.full_name); 
                    qitem.repo_languageList.push(aitem.language);

                    bookStore(qitem, itemCallback)


                }, function(err) {
                	//yichang jilu 
                    callback(null, {
                        name: aitem.name,
                        full_name: aitem.full_name,
                        error: err,
                        TotalPages:body.Items.TotalPages

                       
                    });
                    console.log(aitem.name );
                });
            }else{
                console.log(body)
                callback(null, {
                        name: aitem.name,
                        full_name: aitem.full_name,
                        error: 'none',
                        TotalPages:'-1'

                       
                    });
            }

        })

    }, function(err, result) {
        callbaack(err, result)

    })
}


function bookStore(qitem, itemCallback) {

 console.log(111111111111)
    
    qitem.bookname=qitem.ItemAttributes.Title
    //repo_full_nameList
    //repo_languageList

    amazonBook
        .findOrCreate({
            where: {
                ASIN: qitem.ASIN
            },
            defaults: qitem
        }).then(function(item) {
             //ruguo yijing cunzai le  jiu xugai 
             var isNewRecord=item[1];
             
        if (isNewRecord==false) {

            // item[0].repo_languageList
            if (_.contains(item[0].repo_full_nameList, qitem.repo_full_nameList[0]) == false) {
                item[0].repo_full_nameList.push(qitem.repo_full_nameList[0])
            }
            if (_.contains(item[0].repo_languageList, qitem.repo_languageList[0]) == false) {
                item[0].repo_languageList.push(qitem.repo_languageList[0]);
            }
            console.log('xiugai repo_full_nameList')
            item[0].updateAttributes({
                repo_full_nameList: item[0].repo_full_nameList,
                repo_languageList: item[0].repo_languageList
            })

        }
             
            itemCallback(null)
        }, function(e) {
            console.log(e);
            console.log(2)
            itemCallback(null)

        })

}




function bookHisstryStore(result, Callbaack) {

    async.each(result, function(item, callback) {
        item.pageindex = searchPage;
        //TotalPages

        booksearchHistry
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
        // item.pageindex = searchPage;
        gitRepoSql.find({
           where:{full_name: item.full_name} 
        }).then(function(repo) {
            repo.book_num = 1;
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
    getBookSearch,
    bookHisstryStore,
    repoViedoUpdate
], function(err) {
    console.log('可以开始读取下一页了');
})
}
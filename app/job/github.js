var Sequelize = require('Sequelize');
var async = require('async');
// var sequelize = new Sequelize('postgres://user:postgres:5432/bendi');
var gitRepoSql = require('../model/gitRepo')
var gitRepoHistrySql = require('../model/gitRepoHistry')
var requrstMock = require('./requrstMock');
var _ = require('underscore');
var Base64 = require('./base64.js').Base64;


var searchPage = 0;

// 'http://test.unknownerror.org/github/repos/?q=stars:%3E1'
//https://api.github.com/search/repositories?sort=stars&q=stars%3A%3E1&order=desc&page=1
function setUp(callbaack) {
    searchPage = 1;
    gitRepoHistrySql
    .max('pagenum').then(function(item){
        if(searchPage>1000){
            callbaack('已经采集了1000个项目了，暂时不采集了', 'stars:>1', searchPage)
            return;
        }
        if(item){
            searchPage=item+1;
            console.log('采集第'+searchPage+"页");
        }
        
        callbaack(null, 'stars:>1', searchPage)
    })
    
}

function getgithubrepos(q, index, callbaack) {
    requrstMock.getgithubrepos(q, index, function(error, response, body) {
      
        
        callbaack(error, body)
    })
}

function getgitreadme(aitem, callbaack) {
    requrstMock.getgithubReadMe(aitem.owner.login, aitem.name, function(error, response, body) {
   

        if (body) {
            body.repo = {
                full_name: aitem.full_name,
                language: aitem.language
            }
            storeReadmeData(body, aitem.full_name, callbaack);
        }

    })




}

function storeReopData(body, callbaack) {
    // body...
    console.log("storeReopData");
    async.each(body.items, function(aitem, callback) {
        console.log('存储');
        if(aitem.name=='node'){
            aitem.search_name="nodejs"
        }
        if(aitem.name=='express'){
            aitem.search_name="express.js"
        }
        gitRepoSql
            .findOrCreate({
                where: {
                    full_name: aitem.full_name
                },
                defaults: aitem
            }).then(function(item) {
                callback(null)
            }, function(e) {
           
                console.log(e);
                callback(e)

            })



    }, function() {
        console.log('storeReopDataEnd');
        callbaack(null, body)
    });
}

function getReadmeData(body, callbaack) {
    // body...
    console.log("getReadmeData");
    // console.log(items)

    async.map(body.items, getgitreadme, function(err, result) {
        callbaack(err, body)

    });

}

function storeReadmeData(item, full_name, callbaack) {
    console.log('存redeme');
    gitRepoSql
        .findOrCreate({
            where: {
                full_name: full_name
            }
        }).then(function(project) {
             if (item.encoding == "base64") {
                item.content = Base64.decode(item.content);
            }
            project[0].updateAttributes({
                readme_content: item.content,
                readme_encoding: item.encoding
            })
            callbaack(null)

        })

}

async.waterfall([
        setUp,
        getgithubrepos,
        storeReopData,
        getReadmeData
        // parallelPartForList,

    ],
    function(err, body) {
        // results is now equal to: {one: 1, two: 2} 
        console.log(err)
        console.log('看看有没有错误')
        console.log('这一页完了最终完了，可以开始尝试下一页了');
        //记录页码和错误信息
        gitRepoHistrySql
            .findOrCreate({
                where: {
                    pagenum: searchPage
                },
                defaults: {
                    pagenum: searchPage,
                    error: JSON.stringify(err)
                }
            })

    });
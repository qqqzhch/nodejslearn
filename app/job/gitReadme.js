var Sequelize = require('sequelize');
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
function getresplist(callbaack) {
    console.log('读取repos');
    gitRepoSql
        .findAll({
            offset: 0,
            limit: 2,
            order: '"createdAt" ASC',
            where: ["readme_content is NULL"]
        })
        .then(function(result) {
            if(result){
                callbaack(null, result)
            }
            
        });
}



function getgitreadme(aitem, callbaack) {

    requrstMock.getgithubReadMe(aitem.owner.login, aitem.name, function(error, response, body) {
     if(error){

        
        updateReadmeData(body, aitem.full_name, callbaack);
        return ;
     }

        if (body) {
            body.repo = {
                full_name: aitem.full_name,
                language: aitem.language
            }
            storeReadmeData(body, aitem.full_name, callbaack);
        }

    })




}


function getReadmeData(body, callbaack) {
    // body...
    console.log("getReadmeData");
    // console.log(items)

    async.map(body, getgitreadme, function(err, result) {
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
function updateReadmeData(item, full_name, callbaack) {
    console.log('存redeme');
    gitRepoSql
        .findOrCreate({
            where: {
                full_name: full_name
            }
        }).then(function(project) {
             
            project[0].updateAttributes({
                readme_content: '',
                readme_encoding: ''
            })
            callbaack(null)

        })

}




module.exports .run=function () {
    async.waterfall([
        getresplist,
        getReadmeData
        // parallelPartForList,

    ],
    function(err, body) {
        // results is now equal to: {one: 1, two: 2} 
        console.log(err)
        console.log('看看有没有错误')
        console.log('这一页完了最终完了，可以开始尝试下一页了');
        //记录页码和错误信息

    });
}
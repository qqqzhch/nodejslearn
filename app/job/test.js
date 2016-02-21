// var Sequelize = require('sequelize');
// var async = require('async');
// // var sequelize = new Sequelize('postgres://user:postgres:5432/bendi');
// var gitRepoSql = require('../model/gitRepo')
// var youTobeVideosSql = require('../model/youTobeVideos')

// var youSearchHistrySql = require('../model/youSearchHistry')
// var requrstMock = require('./requrstMock');
// var _ = require('underscore');
// var Base64 = require('./base64.js').Base64;
// var youtubeApi = require('../dataApi/youtube');
//     console.log('读取repos');
    // gitRepoSql
    //     .findAll({
    //         offset: 0,
    //         limit: 50,
    //         order: '"createdAt" ASC',
    //         where :["viedo_num is NULL"]
    //     })
    //     .then(function(result) {

    //         callbaack(null, result)
    //     });

 var gitHub=require('../dataApi/gitHub');
 // gitHub.issues('sequelize','sequelize',function (item,data,data) {
 //     console.log(item)
 //     console.log(data)
 // })

gitHub.issuesComments('sequelize','sequelize',5396,function (item,data,data) {
     console.log(item)
     console.log(data)
 })

// readme.run();
// console.log('888')
//     youtubeApi.search('typeahead.js    JavaScript', 1, function (dd) {
//         console.log('****')
//         console.log(dd)
//     })

    
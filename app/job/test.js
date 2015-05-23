var Sequelize = require('Sequelize');
var async = require('async');
// var sequelize = new Sequelize('postgres://user:postgres:5432/bendi');
var gitRepoSql = require('../model/gitRepo')
var youTobeVideosSql = require('../model/youTobeVideos')

var youSearchHistrySql = require('../model/youSearchHistry')
var requrstMock = require('./requrstMock');
var _ = require('underscore');
var Base64 = require('./base64.js').Base64;

var hstore = require('pg-hstore')();
var source = {
    foo: "oof",
    bar: "rab",
    baz: "zab"
};

var ss = hstore.stringify(source);
console.log(ss);


// return;
youTobeVideosSql.find({
    where: {
        id: {
            "kind": "youtube#video",
            "videoId": "-0c92Ibb4aQ"
        }
    }
})
    .then(function(result) {
        result.statistics = {
            ss: 'ssss'
        };
        result.player = {
            ss: 'ssss'
        };

        result.save().catch(function(e) {
            console.log(e);
        })
            .then(function(e) {
                callback(null)
            });
    })
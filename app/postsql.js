var Sequelize = require('sequelize');
// var sequelize = new Sequelize('postgres://user:postgres:5432/bendi');
var gitRepo=require('./model/gitRepo');
var youTobeVideos=require('./model/youTobeVideos');
var stackQuestion=require('./model/stackQuestion');
var stackAnswer=require('./model/stackAnswer');
var gitRepoHistry=require('./model/gitRepoHistry');
var youSearchHistry=require('./model/youSearchHistry');
var stackSearchHistry=require('./model/stackSearchHistry');



gitRepo.sync({
    force: false
})

stackSearchHistry.sync({
    force: false
})

stackQuestion.sync({
    force: false
})
stackAnswer.sync({
    force: false
})

youSearchHistry.sync({
    force: false
})

youTobeVideos.sync({
    force: false
})

gitRepoHistry.sync({
    force: false
})
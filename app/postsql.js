var Sequelize = require('sequelize');
// var sequelize = new Sequelize('postgres://user:postgres:5432/bendi');
var gitRepo=require('./model/gitRepo');
var youTobeVideos=require('./model/youTobeVideos');
var stackQuestion=require('./model/stackQuestion');
var stackAnswer=require('./model/stackAnswer');
var gitRepoHistry=require('./model/gitRepoHistry');
var youSearchHistry=require('./model/youSearchHistry');
var stackSearchHistry=require('./model/stackSearchHistry');
var amazonBook=require('./model/amazonBook');
var booksearchHistry=require('./model/booksearchHistry');
var hackStory=require('./model/hackStory');



// gitRepo.sync({
//     force: false
// })
// amazonBook.sync({
//     force: true
// })
// booksearchHistry.sync({
//     force: true
// })

// stackSearchHistry.sync({
//     force: false
// })

// stackQuestion.sync({
//     force: false
// })
// stackAnswer.sync({
//     force: false
// })

// youSearchHistry.sync({
//     force: false
// })

// youTobeVideos.sync({
//     force: false
// })

// gitRepoHistry.sync({
//     force: false
// })

// amazonBook.sync({
//     force: true
// })
hackStory.sync({
    force: true
})


//alter table "gitRepos"  add column story_num bigint

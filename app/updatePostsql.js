var Sequelize = require('sequelize');

sequelize.query('alter table "gitRepos"  add column story_num bigint').spread(function(results, metadata) {
  console.log(results)
})
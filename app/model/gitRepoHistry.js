var Sequelize = require('Sequelize');
var env = process.env.OPENSHIFT_MONGODB_DB_URL ? 'production' : 'development',
    config = require('../../config/config')[env]
var sequelize = new Sequelize(config.postsql.dbname, config.postsql.username,  config.postsql.password, config.postsql.dbType);

var gitRepo = sequelize.define('gitRepoHistry', {
    "pagenum": {
        type:  Sequelize.BIGINT,
        primaryKey: true
    },
    "error": Sequelize.TEXT,
    
}, {
    // freezeTableName: true, // Model tableName will be the same as the model name
    timestamps: true, // timestamps will now be true
 
});
gitRepo.__s=sequelize;
module.exports=gitRepo;
var Sequelize = require('sequelize');
var env = process.env.OPENSHIFT_MONGODB_DB_URL ? 'production' : 'development',
    config = require('../../config/config')[env]
var sequelize = new Sequelize(config.postsql.dbname, config.postsql.username,  config.postsql.password, config.postsql.dbType);

var model = sequelize.define('stackSearchHistry', {
    "searchName": {
        type:  Sequelize.STRING(150),
        primaryKey: true
    },
    "error": Sequelize.TEXT,
    "pageindex": Sequelize.BIGINT,
    "has_more":Sequelize.BOOLEAN
    
}, {
    // freezeTableName: true, // Model tableName will be the same as the model name
    timestamps: true, // timestamps will now be true
 
});
model.__s=sequelize;
module.exports=model;
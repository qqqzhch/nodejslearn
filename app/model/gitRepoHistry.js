var Sequelize = require('sequelize');
var env =process.env.NODE_ENV,
    config = require('../../config/config')[env]
var sequelize = require('./database');

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
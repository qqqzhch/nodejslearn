var Sequelize = require('sequelize');
var env = process.env.NODE_ENV,
    config = require('../../config/config')[env]
var sequelize = require('./database');

var model = sequelize.define('bookSearchHistry', {
    "searchName": {
        type:  Sequelize.STRING(150),
        primaryKey: true
    },
    "error": Sequelize.TEXT,
    "pageindex": Sequelize.BIGINT,
    "TotalPages":Sequelize.BIGINT
    
}, {
    // freezeTableName: true, // Model tableName will be the same as the model name
    timestamps: true, // timestamps will now be true
 
});
model.__s=sequelize;
module.exports=model;
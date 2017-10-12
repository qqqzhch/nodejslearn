var Sequelize = require('sequelize');
var env =process.env.NODE_ENV,
    config = require('../../config/config')[env]
var sequelize = require('./database');


var model = sequelize.define('hackStory', {
    repo_full_name: Sequelize.STRING(150),
    repo_language: Sequelize.STRING(50),
    "story_title": Sequelize.TEXT,
    "author": Sequelize.STRING,
      comment_text:Sequelize.TEXT,
     objectID: {
        type: Sequelize.BIGINT,
        primaryKey: true
    },
    
}, {
    // freezeTableName: true, // Model tableName will be the same as the model name
    timestamps: true, // timestamps will now be true
     indexes: [ {
        name: 'story_repo_full_name_index',
        method: 'BTREE',
        fields: ['repo_full_name']
    }]
 
});

var classMethods={
              getPager:function(index,pagesize){
                 return this
                .findAndCountAll({
          
                    order: '"objectID"  DESC',
                    offset: index * pagesize,
                    limit:pagesize
                })
        },
        getPagerByfullname:function(index,pagesize,fullname){
                 return this
                .findAll({
                        where: {
                        // isSearchedSon:true,
                        repo_full_name:fullname

                    },
          
                    order: '"points"  DESC',
                    offset: index * pagesize,
                    limit:  pagesize
                })
        },
        getBookInfo: function(objectID) {
            return this.find({
                where: {
                    objectID: objectID
                }
            })
        }


    }

model=Object.assign(model,classMethods)
model.__s=sequelize;
module.exports=model;
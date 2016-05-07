var Sequelize = require('sequelize');
var env =process.env.NODE_ENV,
    config = require('../../config/config')[env]
var sequelize = require('./database');


var model = sequelize.define('hackStory', {
    repo_full_name: Sequelize.STRING(150),
    repo_language: Sequelize.STRING(50),
    "title": Sequelize.TEXT,
    "url":   Sequelize.STRING,
    "author": Sequelize.STRING,
    "points":Sequelize.BIGINT,
    "story_text":Sequelize.TEXT,
    "tags":Sequelize.JSONB,
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
    },{
        name: 'story_tags',
        method: 'gin',
        fields: ['tags']
    }],
    classMethods: {
              getBookPager:function(fullname,index,pagesize){
                 return this
                .findAndCountAll({
                    attributes: ['bookname', 'MediumImage','ASIN'],
                    where: {
                        // isSearchedSon:true,
                        repo_full_nameList:{ $contains: [fullname] }
                        //select * from  "amazonBooks"   where  "repo_full_nameList"  ? 'bower/bower'
                        

                    },
                    offset: index * pagesize,
                    limit: (index+1) * pagesize
                })
        },
        getBookInfo: function(ASIN) {
            return this.find({
                where: {
                    ASIN: ASIN
                }
            })
        }


    }
 
});
model.__s=sequelize;
module.exports=model;
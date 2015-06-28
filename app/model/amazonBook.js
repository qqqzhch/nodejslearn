var Sequelize = require('sequelize');
var env =process.env.NODE_ENV,
    config = require('../../config/config')[env]
var sequelize = require('./database');


var model = sequelize.define('amazonBook', {
    "bookname": {
        type:  Sequelize.STRING(500),
    },
    repo_full_nameList: Sequelize.ARRAY(Sequelize.STRING(150)),
    repo_languageList: Sequelize.ARRAY(Sequelize.STRING(50))  ,
    "ASIN": {
        type:  Sequelize.STRING(30),
        primaryKey: true
    },
    "DetailPageURL": Sequelize.TEXT,
    "ItemLinks": Sequelize.JSONB,
    "SmallImage":Sequelize.JSONB,
    "MediumImage":Sequelize.JSONB,
    "LargeImage":Sequelize.JSONB,
    "ImageSets":Sequelize.JSONB,
    "ImageSets":Sequelize.JSONB,
    "ItemAttributes":Sequelize.JSONB,
    "OfferSummary":Sequelize.JSONB,
    "EditorialReviews":Sequelize.JSONB
    
}, {
    // freezeTableName: true, // Model tableName will be the same as the model name
    timestamps: true, // timestamps will now be true
    indexes: [{
        name: 'book_repo_full_nameList',
        method: 'gin',
        fields: ['repo_full_nameList']
    },{
        name: 'book_repo_languageList',
        method: 'gin',
        fields: ['repo_languageList']
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


    }
 
});
model.__s=sequelize;
module.exports=model;
var Sequelize = require('sequelize');
var env = process.env.NODE_ENV,
    config = require('../../config/config')[env]
var sequelize = require('./database');

var stackQuestion = sequelize.define('stackQuestion', {
    "tags": Sequelize.JSONB,
    //{"site": "stackoverflow", "question_id": "10005939"}
    "id_site": {
        type: Sequelize.STRING(20),
        primaryKey: true
    },
    "id_question_id": {
        type: Sequelize.STRING(20),
        primaryKey: true
    },
    "owner": Sequelize.JSONB,
    "is_answered": Sequelize.BOOLEAN,
    "view_count": Sequelize.BIGINT,
    "accepted_answer_id": Sequelize.BIGINT,
    "answer_count": Sequelize.BIGINT,
    "score": Sequelize.BIGINT,
    "last_activity_date": Sequelize.DATE,
    "creation_date": Sequelize.DATE,
    "last_edit_date": Sequelize.DATE,
    "link": Sequelize.TEXT,
    "title": Sequelize.STRING,
    "body": Sequelize.TEXT,
    repo_full_name: Sequelize.STRING(150),
    repo_language: Sequelize.STRING(50),
    isSearchedSon: Sequelize.BOOLEAN
}, {
    timestamps: true, // timestamps will now be true
    indexes: [{
        name: 'isSearchedSon_index',
        method: 'BTREE',
        fields: ['isSearchedSon']
    }, {
        name: 'Question_repo_full_name',
        method: 'BTREE',
        fields: ['repo_full_name']
    }],
    classMethods: {
        getQuesionPager:function(fullname,index,pagesize){
                 return this
                .findAndCountAll({
                    attributes: ['tags', 'id_site', 'id_question_id', 'owner', 'title', 'creation_date'],
                    where: {
                        // isSearchedSon:true,
                        repo_full_name:fullname

                    },
                    offset: index * pagesize,
                    limit: (index+1) * pagesize
                })
        },
        getQuesionInfo:function(id_site,id_question_id){
                 return this
                .find({
                    
                    where: {
                        id_site:id_site,
                        id_question_id:id_question_id

                    }
                })
        }

    }
})
module.exports = stackQuestion;
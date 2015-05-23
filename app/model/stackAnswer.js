var Sequelize = require('sequelize');
var env = process.env.OPENSHIFT_MONGODB_DB_URL ? 'production' : 'development',
    config = require('../../config/config')[env]
var sequelize = new Sequelize(config.postsql.dbname, config.postsql.username,  config.postsql.password, config.postsql.dbType);

var stackAnswer = sequelize.define('stackAnswer', {
    "owner": Sequelize.JSONB,
    "is_accepted": Sequelize.BOOLEAN,
    "score": Sequelize.BIGINT,
    "last_activity_date": Sequelize.DATE,
    "last_edit_date": Sequelize.DATE,
    "creation_date": Sequelize.DATE,
    "answer_id": {
        type: Sequelize.BIGINT,
        primaryKey: true
    },
    "question_id": Sequelize.BIGINT,
    "body": Sequelize.TEXT,
    "repo": Sequelize.JSONB
}, {
    timestamps: true, // timestamps will now be true
    indexes: [{
        name: 'question_id_index',
        method: 'BTREE',
        fields: ['question_id']
    }, {
        name: 'Answer_repo_index',
        method: 'gin',
        fields: ['repo']
    }],
      classMethods: {
        getAnswersByQuestion:function(question_id){
            return this.findAll({
                where:{
                question_id: question_id   
                }
            })

        }

      }
})
module.exports=stackAnswer;
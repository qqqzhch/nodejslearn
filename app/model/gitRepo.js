var Sequelize = require('sequelize');
var env = process.env.NODE_ENV,
    config = require('../../config/config')[env]
var sequelize = require('./database');

var gitRepo = sequelize.define('gitRepo', {
    "id": Sequelize.BIGINT,
    "name": Sequelize.STRING(100),
    "search_name": Sequelize.STRING(100),
    "full_name": {
        type: Sequelize.STRING(150),
        primaryKey: true
    },
    "owner": Sequelize.JSONB,
    "html_url": Sequelize.STRING,
    "description": Sequelize.STRING(500),
    "url": Sequelize.STRING,
    "downloads_url": Sequelize.STRING,
    "git_url": Sequelize.STRING,
    "stargazers_count": Sequelize.BIGINT,
    "watchers_count": Sequelize.BIGINT,
    "forks_count": Sequelize.BIGINT,
    "language": Sequelize.STRING(50),
    "viedo_num": Sequelize.BIGINT,
    "question_num": Sequelize.BIGINT,
    "readme_content": Sequelize.TEXT,
    "readme_encoding": Sequelize.STRING(10),
    "book_num": Sequelize.BIGINT
     "story_num":Sequelize.BIGINT
}, {
    // freezeTableName: true, // Model tableName will be the same as the model name
    timestamps: true, // timestamps will now be true
    indexes: [{
        name: 'caiji_index',
        method: 'BTREE',
        fields: ['viedo_num', 'question_num']
    }, {
        name: 'yuyan_index',
        method: 'BTREE',
        fields: ['language']
    }],
    classMethods: {
        getReposPager: function(index, pagesize) {
            return this
                .findAndCountAll({
                    attributes: ['name', 'full_name', 'owner', 'description', 'stargazers_count'],
                    where: {
                        $or: [{
                            question_num: {
                                $gt: 0
                            }
                        }, {
                            viedo_num: {
                                $gt: 0
                            }
                        }]

                    },
                    offset: index * pagesize,
                    limit: pagesize
                })

        },
        getRepoInfo: function(full_name) {
            return this.find({
                where: {
                    full_name: full_name
                }
            })
        },
        getRepoInfoPart: function(full_name) {
            return this.find({
                attributes: ['name', 'full_name', 'owner', 'description', 'stargazers_count'],
                where: {
                    full_name: full_name
                }
            })
        },
        searchRepoInfoPart: function(full_name) {
            return this.findAll({
                attributes: ['name', 'full_name', 'owner', 'description', 'stargazers_count'],
                limit: 30,
                where: {
                    full_name: {
                          $like: '%'+full_name+'%'
                      }

                }
            })
        }

    },
    instanceMethods: {
        method2: function() {
            return 'foo'
        }
    }
});
module.exports = gitRepo;
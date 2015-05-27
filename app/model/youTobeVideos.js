var Sequelize = require('sequelize');
var env = process.env.NODE_ENV,
    config = require('../../config/config')[env]
var sequelize = new Sequelize(config.postsql.dbname, config.postsql.username, config.postsql.password, config.postsql.dbType);

// qitem.repo_full_name: aitem.full_name;
// qitem.repo_language: aitem.language;

var youTobeVideos = sequelize.define('youTobeVideos', {
    etag: Sequelize.STRING(150),
    id_kind: {
        type: Sequelize.STRING(20),
        primaryKey: true
    },
    id_videoId: {
        type: Sequelize.STRING(20),
        primaryKey: true
    },
    snippet: Sequelize.JSONB,
    repo_full_name: Sequelize.STRING(150),
    repo_language: Sequelize.STRING(50),
    statistics: Sequelize.JSONB,
    player: Sequelize.JSONB,
    isSearchedSon: Sequelize.BOOLEAN
}, {
    timestamps: true, // timestamps will now be true
    indexes: [ {
        name: 'repo_full_name_index',
        method: 'BTREE',
        fields: ['repo_full_name']
    }, {
        name: 'repo_language_index',
        method: 'BTREE',
        fields: ['isSearchedSon']
    }],
    classMethods: {
        getVideosPager: function(fullname, index, pagesize) {
            return this
                .findAndCountAll({
                    attributes: ['id_kind', 'id_videoId', 'snippet'],
                    where: {
                        isSearchedSon:true,
                        repo_full_name: fullname,
                        
                        // player: {
                        //     $ne: null
                        //  }
                        // where: "player is NULL"

                    },
                    offset: index * pagesize,
                    limit: (index+1) * pagesize
                })

        },
        getVideo: function(id_kind, id_videoId) {
            return this
                .find({
                    where: {
                        id_kind: id_kind,
                        id_videoId: id_videoId

                    }
                })
        }
    }
})

//getVideosPager
youTobeVideos.__s = sequelize;
module.exports = youTobeVideos;
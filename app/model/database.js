var Sequelize = require('sequelize');
var env = process.env.NODE_ENV,
	config = require('../../config/config')[env]
module.exports = new Sequelize(
	config.postsql.dbname,
	config.postsql.username,
	config.postsql.password, {
		host: config.postsql.dbType.host,
		dialect: config.postsql.dbType.dialect,
		pool: {
			max: 50,
			min: 0,
			idle: 10000
		}
	}

);
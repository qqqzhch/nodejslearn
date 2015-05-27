var path = require('path'),
    rootPath = path.normalize(__dirname + '/..');

module.exports = {
    development: {
        db: 'mongodb://localhost/online',
        root: rootPath,
        ip:'127.0.0.1',
        client_id: "267680df1ce7e493",
        client_secret: '830412410225c0b99fb1af7fe3167bc8',
        app: {
            name: 'Nodejs Express Mongoose Demo'
        },
        postsql: {
            dbname: 'bendi',
            username: 'postgres',
            password: '123456',
            dbType: {
                host: 'localhost',
                dialect: 'postgres',
            }
        }

    },
    test: {
        db: 'mongodb://localhost/test',
        root: rootPath,
        client_id: "267680df1ce7e493",
        client_secret: '830412410225c0b99fb1af7fe3167bc8',
        app: {
            name: 'Nodejs Express Mongoose Demo'
        },
        postsql: {
            dbname: 'bendi',
            username: 'postgres',
            password: '123456',
            dbType: {
                host: 'localhost',
                dialect: 'postgres',
            }
        }

    },
    production: {
        db: process.env.OPENSHIFT_MONGODB_DB_URL + 'nodejs',
        root: rootPath,
        ip:'162.243.148.223',
        client_id: "267680df1ce7e493",
        client_secret: '830412410225c0b99fb1af7fe3167bc8',
        app: {
            name: 'Nodejs Express Mongoose Demo'
        },
        postsql: {
            dbname: 'bendi',
            username: 'postgres',
            password: '123456',
            dbType: {
                host: 'localhost',
                dialect: 'postgres',
            }
        }
    },
    getCheck: function() {
        var env = process.env.OPENSHIFT_MONGODB_DB_URL ? 'production' : 'development';
        return env;
    }
}
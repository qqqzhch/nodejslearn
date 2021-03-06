var express = require('express');
// load express doT
var doT = require('dot-emc');
// var errorHandler = require('express-async-error').Handler

// var errorhandler = require('errorhandler')

// var errorhandler = require('express-error')
module.exports = function(app, config) {
    //app.set('views', __dirname + '/views');
    app.use('/public', express.static(config.root + '/public'));
    // app.use(errorhandler())
    // app.use(errors.common);

    app.set('views', config.root + '/app/views');
    app.set('view engine', 'html'); // app.set('view engine', 'ejs');
    // app.engine('html', doT.__express);
    app.engine("html", doT.init({
        fileExtension: "html"
    }).__express);

    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(express.cookieSession({
        secret: 'unknownerror.org'
    }));

    app.use(function(req, res, next) {
        res.locals.seo = {
            title: '',
            keywords: '',
            description: ''
        }
        next()
    });


    app.configure("development", function() {
        console.log('开fa模式');
        app.engine("dot", doT.init({
            options: {
                templateSettings: {
                    cache: false
                }
            }
        }).__express);
        app.use(express.errorHandler());
    });

    require('./routes')(app, config);




    // app.configure('development', function() {
    //     app.use(express.errorHandler());
    // });

    // self.app.use(express.session({
    //     secret: 'test.unknownerror.org',
    //     store: store,
    //     cookie: {
    //         maxAge: 900000
    //     } // expire session in 15 min or 900 seconds
    // }));



}
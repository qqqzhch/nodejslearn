var express = require('express');
// load express doT
var doT = require('dot');
var fs = require('fs'); // this engine requires the fs module
var bodyParser = require('body-parser');
var Cookies = require( "cookies" )
// var errorHandler = require('express-async-error').Handler

// var errorhandler = require('errorhandler')

// var errorhandler = require('express-error')
// require("dot").process({
//     global: "_page.render"
//     , destination: config.root + "/app/render/"
//     , path: (config.root + '/app/views')
// });
var env = process.env.NODE_ENV;
var cacheFile={}
module.exports = function(app, config) {
    //app.set('views', __dirname + '/views');
    app.use('/public', express.static(config.root + '/public'));
    // app.use(errorhandler())
    // app.use(errors.common);

    app.set('views', config.root + '/app/views');
    // app.set('view engine', 'html'); // app.set('view engine', 'ejs');
    // // app.engine('html', doT.__express);

    app.set("view engine", "html");
    var layout= fs.readFileSync(config.root + '/app/views/layout.html', "utf8");
    app.engine("html", function(filePath, options, callback) {
        var resultText ;
        var tempFn;
        if(cacheFile[filePath]&&env=="production" ){
            tempFn=cacheFile[filePath];
            resultText = tempFn(options);
            
            return callback(null, resultText);
        }else{
            fs.readFile(filePath, function(err, content) {
            if (err) return callback(new Error(err));
            // this is an extremely simple template engine
            tempFn = doT.template(layout.toString(),undefined,{
                content:content.toString()
            } );
            cacheFile[filePath]=tempFn; 
             resultText = tempFn(options);
            
            return callback(null, resultText);
        })
        }
        

    });

app.use(require('express-bunyan-logger')({
    format: ":remote-address - :user-agent[major] custom logger"
}));
    // app.use(express.favicon());
    // app.use(express.logger('dev'));
app.use( Cookies.express( ['userCookieID'] ))
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json 
app.use(bodyParser.json())
    // app.use(express.methodOverride());
    // app.use(express.cookieParser());
    // app.use(express.cookieSession({
    //     secret: 'unknownerror.org'
    // }));

    app.use(function(req, res, next) {
        res.locals.seo = {
            title: '',
            keywords: '',
            description: ''
        }
        next()
    });


    // app.use(express.errorHandler());
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
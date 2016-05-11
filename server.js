#!/bin/env node
 //  OpenShift sample Node application
 require('oneapm');
var express = require('express');
var fs = require('fs');
var env = process.env.NODE_ENV,
    config = require('./config/config')[env];

// var mongoose = require('mongoose');
// var errorhandler = require('express-common-errors');

// mongoose.connect(config.db);


/**
 *  Define the sample application.
 */
var SampleApp = function() {

    //  Scope.
    var self = this;


    /*  ================================================================  */
    /*  Helper functions.                                                 */
    /*  ================================================================  */

    /**
     *  Set up server IP address and port # using env variables/defaults.
     */
    self.setupVariables = function() {
        //  Set the environment variables we need.
        console.log('***********');
        console.log(env);
        // console.log(process.env.OPENSHIFT_NODEJS_IP);
        // console.log(process.env.OPENSHIFT_NODEJS_PORT);
        // console.log("process.env.NODE_ENV :"+process.env.NPM_CONFIG_PRODUCTION);

        console.log('***********');

        self.ipaddress = config.ip;
        self.port = env =="development"? 8080:80;
        console.log(self.port )
        console.log(env )

        if (typeof self.ipaddress === "undefined") {
            //  Log errors on OpenShift but continue w/ 127.0.0.1 - this
            //  allows us to run/test the app locally.
            console.warn('No OPENSHIFT_NODEJS_IP var, using 127.0.0.1');
            self.ipaddress = "127.0.0.1";
        };
    };


    /**
     *  Retrieve entry (content) from cache.
     *  @param {string} key  Key identifying content to retrieve from cache.
     */
    self.cache_get = function(key) {
        return self.zcache[key];
    };


    /**
     *  terminator === the termination handler
     *  Terminate server on receipt of the specified signal.
     *  @param {string} sig  Signal to terminate on.
     */
    self.terminator = function(sig) {
        if (typeof sig === "string") {
            console.log('%s: Received %s - terminating sample app ...',
                Date(Date.now()), sig);
            process.exit(1);
        }
        console.log('%s: Node server stopped.', Date(Date.now()));
    };


    /**
     *  Setup termination handlers (for exit and a list of signals).
     */
    self.setupTerminationHandlers = function() {
        //  Process on exit and signals.
        process.on('exit', function() {
            self.terminator();
        });

        // Removed 'SIGPIPE' from the list - bugz 852598.
        ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
            'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
        ].forEach(function(element, index, array) {
            process.on(element, function() {
                self.terminator(element);
            });
        });
    };


    /*  ================================================================  */
    /*  App server functions (main app logic here).                       */
    /*  ================================================================  */

    /**
     *  Create the routing table entries + handlers for the application.
     */
    // self.createRoutes = function() {

    //     require('./config/routes')(self.app, config);


    // };


    /**
     *  Initialize the server (express) and create the routes and register
     *  the handlers.
     */
    self.initializeServer = function() {

        self.app =  express();
        // self.app.set('mydb', mongoose);
        require('./config/express')(self.app, config);
        //  Add handlers for the app (from the routes).
        // self.createRoutes();

    };


    /**
     *  Initializes the sample application.
     */
    self.initialize = function() {
        self.setupVariables();
        // self.populateCache();
        //self.setupTerminationHandlers();

        // Create the express server and routes.
        self.initializeServer();
    };


    /**
     *  Start the server (starts up the sample application).
     */
    self.start = function() {
        //  Start the app on the specific interface (and port).
        // self.app.use(errorhandler.common);　
        // self.app.error=function(err, req, res) {
        //    errorhandler.common(err, req, res)
        // };
        self.app.listen(self.port, self.ipaddress, function() {
            console.log('%s: Node server started on %s:%d ...',
                Date(Date.now()), self.ipaddress, self.port);
        });


    };

}; /*  Sample Application.  */



/**
 *  main():  Main code.
 */

//  process.on('uncaughtException', function(err) {
//         console.log(err);
// });
var zapp = new SampleApp();
zapp.initialize();

zapp.start();

var Sequelize = require('Sequelize');
var async = require('async');
// var sequelize = new Sequelize('postgres://user:postgres:5432/bendi');
var gitRepoSql = require('../model/gitRepo')

var _ = require('underscore');

gitRepoSql
    .getReposPager(0, 50)
    .then(function(data) {
        console.log(data)
    }, function(err) {
        console.log(err)
    })
console.log('======================');
gitRepoSql
    .getRepoInfo('FortAwesome/Font-Awesome')
    .then(function(data) {
        console.log(data)
    }, function(err) {
        console.log(err)
    })
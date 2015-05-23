var fs = require('fs');
var generator = require('mongoose-gen');
var mongoose = require('mongoose');
var prefix = Math.random();

function parse(obj) {
    var key, value, type, schema;
    type = obj.constructor.name;
    switch (type) {
        case 'Object':
            schema = {};
            for (key in obj) {
                value = parseKey(key, obj);
                if (value !== undefined) schema[key] = value;
            }
            return schema;
        case 'Array':
            value = parseKey(0, obj);
            schema = [];
            if (value !== undefined) schema.push(value);
            return schema;
        default:
            return prefix + type;
    }
}

function parseKey(key, obj) {
    var type;
    if (obj[key] !== undefined&&obj[key]!=null) {
        type = obj[key].constructor.name;
        switch (type) {
            case 'Object':
            case 'Array':
                return parse(obj[key]);
            default:
                return prefix + type;
        }
    }
}

function stringToConstructor(schema) {
    var str = JSON.stringify(schema);
    return str.replace(new RegExp('"' + prefix + '(\\S+?)"', 'g'), '$1');
}

var githubSearch = require('./modeljson/gitSearch.json')
var githubSearchJsonSchema=stringToConstructor(parse(githubSearch));
fs.writeFileSync('./app/schema/gitSearch.json', githubSearchJsonSchema, {
    encoding: 'utf8'
});


var githubreadme = require('./modeljson/gitreadme.json')
var githubreadmeSchema=stringToConstructor(parse(githubreadme));
fs.writeFileSync('./app/schema/githubreadme.json', githubreadmeSchema, {
    encoding: 'utf8'
});

var stackquestion = require('./modeljson/stackquestion.json')
var stackquestionSchema=stringToConstructor(parse(stackquestion));
fs.writeFileSync('./app/schema/stackquestion.json', stackquestionSchema, {
    encoding: 'utf8'
});

var youtubesearch = require('./modeljson/youtubesearch.json')
var youtubesearchSchema=stringToConstructor(parse(youtubesearch));
fs.writeFileSync('./app/schema/youtubesearch.json', youtubesearchSchema, {
    encoding: 'utf8'
});

var stackanswersnfo = require('./modeljson/stackanswersnfo.json')
var stackanswersnfoSchema=stringToConstructor(parse(stackanswersnfo));
fs.writeFileSync('./app/schema/stackanswersnfo.json', stackanswersnfoSchema, {
    encoding: 'utf8'
});
var youtubeVideo = require('./modeljson/youtubeVideo.json')
var youtubeVideoSchema=stringToConstructor(parse(youtubeVideo));
fs.writeFileSync('./app/schema/youtubeVideo.json', youtubeVideoSchema, {
    encoding: 'utf8'
});
var env = process.env.NODE_ENV,
config = require('../../config/config')[env];
var fs = require('fs'); // this engine requires the fs module
var _=require('underscore');

var layout= fs.readFileSync(config.root + '/app/views/codetpl.html', "utf8");
var compiled = _.template(layout);

exports.tpl=function(html) {
   return	compiled(html);
}
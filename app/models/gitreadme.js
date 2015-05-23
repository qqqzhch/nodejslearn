var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
var gitReadmeSchema = new Schema({
    "repo":  Schema.Types.Object,
    "name": String,
    "path": String,
    "sha": String,
    "size": Number,
    "url": String,
    "html_url": String,
    "git_url": String,
    "download_url": String,
    "type": String,
    "content": String,
    "encoding": String,
    "_links": Schema.Types.Object

})

module.exports = mongoose.model('gitReadme',  gitReadmeSchema);
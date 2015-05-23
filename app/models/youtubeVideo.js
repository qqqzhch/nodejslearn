var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
var youtubeVideoSchema = new Schema({
    "kind": String,
    "etag": String,
    "id": String,
    "statistics": Schema.Types.Object,
    "player": Schema.Types.Object
})

module.exports = mongoose.model('youtubeVideo', youtubeVideoSchema);
var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
var youtubesearchSchema = new Schema({
    "kind": String,
    "etag": String,
    "id":Schema.Types.Object,
    "snippet": Schema.Types.Object,
    "repo":  Schema.Types.Object
})

module.exports = mongoose.model('youtubesearch', youtubesearchSchema);
var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
var stackQuestionSchema = new Schema({
    "tags": [String],
    "owner":  Schema.Types.Object,
    "is_answered": Boolean,
    "view_count": Number,
    "accepted_answer_id": Number,
    "answer_count": Number,
    "score": Number,
    "last_activity_date": Number,
    "creation_date": Number,
    "last_edit_date": Number,
    "question_id": Number,
    "link": String,
    "title": String,
    "body":String,
    "repo":  Schema.Types.Object
})

module.exports = mongoose.model('stackQuestion',  stackQuestionSchema);
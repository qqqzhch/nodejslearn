var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
var stackanswersnfoSchema = new Schema({
    "owner": Schema.Types.Object,
    "is_accepted": Boolean,
    "score": Number,
    "last_activity_date": Number,
    "last_edit_date": Number,
    "creation_date": Number,
    "answer_id": Number,
    "question_id": Number,
    "body": String
})

module.exports = mongoose.model('stackanswersnfo',  stackanswersnfoSchema);
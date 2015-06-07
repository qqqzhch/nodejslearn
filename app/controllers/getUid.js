var env = process.env.NODE_ENV,
	config = require('../../config/config')[env];
var uid = require('uid'); // this engine requires the fs module
exports.getid = function() {
	if (env == "production") {
		return uid();
	} else {
		return 'hello_world'
	}

}
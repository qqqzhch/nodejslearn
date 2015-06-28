var aws = require("aws-lib");

var prodAdv = aws.createProdAdvClient('AKIAISTUCK6M4FWOKQUQ','dDpQldNyrp7FBVsOvl1Egq9wO5V1kSGB/3PqQSp+', 'unknownerroro-20');





exports.ItemSearch = function(user, repo, callbaack) {
	var options = {
		SearchIndex: "Books",
		Keywords: repo,
		ResponseGroup:'Medium'
	}

	prodAdv.call("ItemSearch", options, function(err, result) {

		callbaack(err, result)
	})

}
// var am = require('../dataApi/Amazon');
// var fs = require('fs');

// am.ItemSearch('', 'java', function(err, result) {
// 	console.log(err);
// 	// console.log(JSON.stringify(result));
// 	fs.writeFileSync('../schema/book.json',JSON.stringify(result), {
// 		encoding: 'utf8'
// 	});
// })
// var book = require('./book');
// book.run()

var amazonBook = require('../model/amazonBook');
amazonBook .getBookPager('DmitryBaranovskiy/raphael',0,10)
                         .then(function  (err,result) {
                         	console.log(err);
                         	console.log(result);
                         })
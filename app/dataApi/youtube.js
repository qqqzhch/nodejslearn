var Youtube = require("youtube-api");

Youtube.authenticate({
    type: "key",
    key: "AIzaSyBjmUkp7h_VT7UcwW0TCqWU3-7KJUyutMM"
});

exports.search = function(q,inxex,callbaack) {
    var start=0+50*inxex;
    var end=50+50*inxex;
    
    Youtube.search.list({
        part: 'snippet,id',
        q: q,
        type: 'video',
        maxResults:[start,end],
        // videoCategoryId:'26,22,27',
        order:'rating'


    }, function(err, data) {
      callbaack(err, data,data)

    });
}
exports.videos = function(q,callbaack) {
    
    Youtube.videos.list({
        part: 'statistics,player',
        id: q,
        type: 'video',
        maxResults:50

    }, function(err, data) {
      callbaack(err, data,data)

    });
}
var request = require('request');
var gitHubApi = require('../dataApi/gitHub');
var youtubeApi = require('../dataApi/youtube');
var stackApi = require('../dataApi/stack');
var env =process.env.NODE_ENV;

function tryReq() {

    var errorNum = 0;
    return function getgithubrepos(url, callbaack) {
        request(url, function(error, response, body) {

            if (error && errorNum < 5) {
                errorNum = errorNum + 1;
                getgithubrepos(url, callbaack);
            } else {
                callbaack(error, response, JSON.parse(body))
            }
        })
    }
}


module.exports.getgithubrepos = function(q, pageindex, callbaack) {
    if (env == 'development') {
        //请求代理站点
        // gitHubApi.repos(q, pageindex, callbaack)
        // return;
        var req = new tryReq();
        req('http://test.unknownerror.org/github/repos/?q=' + q + "&page=" + pageindex, callbaack)
    } else {
        gitHubApi.repos(q, pageindex, callbaack)
    }
}

module.exports.getgithubReadMe = function(user, repo, callbaack) {
    if (env == 'development') {
        //请求代理站点
        // gitHubApi.getReadme(user, repo, callbaack)
        // return;
        var req = new tryReq();
        req('http://test.unknownerror.org/github/getReadme?user=' + user + '&repo=' + repo, callbaack)
    } else {
        gitHubApi.getReadme(user, repo, callbaack)
    }
}
module.exports.getYoutubeSearch = function(q, index, callbaack) {
    if (env == 'development') {
        //请求代理站点
        // gitHubApi.getReadme(user, repo, callbaack)
        // return;
        var req = new tryReq();
        req('http://test.unknownerror.org/youtube/search?q=' + q, callbaack)
    } else {
        youtubeApi.search(q, index, callbaack)
    }
}
module.exports.getstackSearch = function(q, index, callbaack) {
    if (env == 'development') {
        //stackApi.getSearch(q, index, callbaack)
        var req = new tryReq();
        console.log('http://test.unknownerror.org/stack/getSearch?q=' + q);
        req('http://test.unknownerror.org/stack/getSearch?q=' + q, callbaack)
    } else {
        stackApi.getSearch(q, index, callbaack)
    }
}
module.exports.getYoutubeVideoInfo = function(ids, callbaack) {
    if (env == 'development') {
        //stackApi.getSearch(q, index, callbaack)
        var req = new tryReq();
        req('http://test.unknownerror.org/youtube/videos?q=' + ids, callbaack)
    } else {
        youtubeApi.videos(ids, callbaack)
    }
}

module.exports.getgetAnswersnfo = function(q, callbaack) {
    if (env == 'development') {
        //stackApi.getSearch(q, index, callbaack)
        var req = new tryReq();
        req('http://test.unknownerror.org/stack/getAnswersnfo?q=' + q, callbaack)
    } else {
        stackApi.getAnswersnfo(q,  callbaack)
    }
}
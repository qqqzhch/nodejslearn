var GitHubApi = require("github");
var github = new GitHubApi({
    // required 
    version: "3.0.0",
    // optional 
    debug: true,
    protocol: "https",
    host: "api.github.com", // should be api.github.com for GitHub 
    pathPrefix: "", // for some GHEs; none for GitHub 
    timeout: 50000,
    headers: {
        "user-agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.122 Safari/537.36" // GitHub is happy with a unique user agent 
    }
});
github.authenticate({
    type: "basic",
    username: "544262408@qq.com",
    password: "qq569033569033"
});

exports.repos = function(q, index, callbaack) {

    github.search.repos({
        q: q,
        sort: 'stars',
        order: 'desc',
        page: index
    }, function(err, data) {
        callbaack(err, data,data)
    })

}
exports.getReadme = function(user, repo, callbaack) {


    github.repos.getReadme({
        user: user, //jrburke
        repo: repo //requirejs
    }, function(err, data) {
        callbaack(err, data,data)

    })

}
exports.getConent = function(user, repo, callbaack) {
    var user = req.query.user;
    var repo = req.query.repo;
    var path = req.query.path || '';
    if (user == undefined || repo == undefined) {
        return res.send({
            error: '缺少参数user 或者repo'
        })

    }
    github.repos.getContent({
        user: user, //jrburke
        repo: repo, //requirejs
        path: path
    }, function(err, data) {
        callbaack(err, data,data)

    })

}

// GET /repos/:owner/:repo/issues
//  https://api.github.com/repos/sequelize/sequelize/issues

exports.issues = function(owner, repo, callbaack) {
   console.log(github.issues);
    github.issues.repoIssues({
        user: owner,
        repo: repo
    }, function(err, data) {
        callbaack(err, data,data)
    })

}
//    https://api.github.com/repos/sequelize/sequelize/issues/5396/comments
//    fanhui jieguo zhong de    number  ziduan 
//  /repos/:owner/:repo/issues/:number/comments
exports.issuesComments = function(owner, repo, number,callbaack) {
   console.log(github.issues);
    github.issues.getComments({
        user: owner,
        repo: repo,
        number:number
    }, function(err, data) {
        callbaack(err, data,data)
    })

}
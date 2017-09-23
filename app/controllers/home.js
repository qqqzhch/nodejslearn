var GitHubApi = require("github");
var Base64 = require('./base64.js').Base64;
var Youtube = require("youtube-api");

Youtube.authenticate({
    type: "key",
    key: "AIzaSyBjmUkp7h_VT7UcwW0TCqWU3-7KJUyutMM"
});

var github = new GitHubApi({
    // required 
    version: "3.0.0",
    // optional 
    debug: true,
    protocol: "https",
    host: "api.github.com", // should be api.github.com for GitHub 
    pathPrefix: "", // for some GHEs; none for GitHub 
    timeout: 5000,
    headers: {
        "user-agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.122 Safari/537.36" // GitHub is happy with a unique user agent 
    }
});
github.authenticate({
    type: "basic",
    username: "544262408@qq.com",
    password: "qq569033569033"
});

// var stackexchange = require('stackexchange');



var options = {
    version: 2.2
};
// var context = new stackexchange(options);
var filter = {
    key: '1bHwZK)j3oMWIjndaVT*lQ((',
    pagesize: 50,
    sort: 'votes',
    order: 'desc',
    filter: 'withbody',
    page: 1
};
var filterInfo = {
    key: '1bHwZK)j3oMWIjndaVT*lQ((',
    pagesize: 50,
    sort: 'votes',
    order: 'desc',
    page: 1
};
var filterInfoQ = {
    key: '1bHwZK)j3oMWIjndaVT*lQ((',
    filter: 'withbody'
};
//按照星星等级获取项目
//http://test.unknownerror.org/github/repos/?q=stars:%3E1
exports.index = function(req, res) {
    console.log('首页');
            res.locals.seo={
            title:'unknownerror-collect relevant information about open source projects, for you!',
            keywords:'unknownerror',
            description:'Pay attention to open source projects, collect relevant information about open source projects, for you!'
        }
    res.render('index', {
        title: 'index',
        dev: process.env
    });
}
exports.http404 = function(req, res) {
    console.log('首页');
            res.locals.seo={
            title:'unknownerror-collect relevant information about open source projects, for you!',
            keywords:'unknownerror',
            description:'Pay attention to open source projects, collect relevant information about open source projects, for you!'
        }
    res.statusCode = 404;
    res.render('404');
}
exports.errortest = function(req, res) {
    console.log('首页');
            res.locals.seo={
            title:'unknownerror-collect relevant information about open source projects, for you!',
            keywords:'unknownerror',
            description:'Pay attention to open source projects, collect relevant information about open source projects, for you!'
        }
    res.statusCode = 404;
    res.render('errortest');
}


exports.info = function(req, res) {
    console.log('首页');
    res.render('info', {
        title: 'info',
        dev: process.env
    });
}
exports.rlist = function(req, res) {
    console.log('rlist');
    res.render('rlist', {
        title: 'rlist',
        dev: process.env
    });
}
exports.error = function(req, res) {
    console.log('errorerrorerrorerrorerrorerrorerrorerrorerror');
    res.render('error', {
        title: 'error',
        dev: process.env
    });
}
exports.robots = function(req, res) {
    console.log('errorerrorerrorerrorerrorerrorerrorerrorerror');
    res.render('robots');
}



exports.repos = function(req, res) {
    console.log('测试');
    var serchName = req.query.q;
    if (serchName == undefined || serchName == '') {
        return res.send({
            error: '参数不能为空'
        })
    }

    github.search.repos({
        q: serchName,
        sort: 'stars',
        order: 'desc',
        page: 0
    }, function(err, data) {

        if (err) {
            res.send({
                error: err
            })
        } else {
            res.send(data)
        }

    })

}
exports.getReadme = function(req, res) {
    var user = req.query.user;
    var repo = req.query.repo;
    if (user == undefined || repo == undefined) {
        return res.send({
            error: '缺少参数user 或者repo'
        })

    }
    github.repos.getReadme({
        user: user, //jrburke
        repo: repo //requirejs
    }, function(err, data) {
        if (err) {
            res.send({
                error: err
            })
        } else {
            // if (data.encoding == "base64") {
            //     data.content = Base64.decode(data.content);
            // }

            res.send(data)
        }

    })

}
exports.getConent = function(req, res) {
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
        if (err) {
            res.send({
                error: err
            })
        } else {
            if (data.encoding == "base64") {
                data.content = Base64.decode(data.content);
            }

            res.send(data)
        }

    })

}
// exports.getSearch = function(req, res) {
//     var q = req.query.q
//     if (q == undefined) {
//         return res.send({
//             error: '缺少参数q'
//         })
//     }
//     filter.intitle = q;
//     context.search.search(filter, function(err, results) {
//         if (err) {
//             return res.send({
//                 error: err
//             })

//         }
//         res.send(results)
//     });
// }
// exports.getQuestionsInfo = function(req, res) {
//     var q = req.query.q
//     if (q == undefined) {
//         return res.send({
//             error: '缺少参数q'
//         })
//     }
//     q=q.split(',')
//     context.questions.questions(filterInfoQ, function(err, results) {
//         if (err) {
//             return res.send({
//                 error: err
//             })

//         }
//         res.send(results)
//     }, q);
// }
// exports.getAnswersnfo = function(req, res) {
//     var q = req.query.q
//     if (q == undefined) {
//         return res.send({
//             error: '缺少参数q'
//         })
//     }
//     q=q.split(',')
//     context.questions.answers(filterInfoQ, function(err, results) {
//         if (err) {
//             return res.send({
//                 error: err
//             })

//         }
//         res.send(results)
//     }, q);
// }
// 获取目录接口 /repos/:owner/:repo/contents/:path
//https://api.github.com/repos/jrburke/requirejs/contents

//http://api.stackexchange.com/2.1/questions/940905/answers?site=stackoverflow&filter=withbody

exports.search = function(req, res) {
    var q = req.query.q;
    if (q == undefined) {
        return res.send({
            error: '缺少参数q'
        })
    }
    Youtube.search.list({
        part: 'snippet,id',
        q: q,
        type: 'video',
        maxResults:50,
        order:'rating'

    }, function(err, data) {
        if (err) {
            return res.send({
                error: err
            })

        }
        res.send(data)

    });
}
exports.videos = function(req, res) {
    var q = req.query.q
    if (q == undefined) {
        return res.send({
            error: '缺少参数q'
        })
    }
    Youtube.videos.list({
        part: 'statistics,player',
        id: q,
        type: 'video',
        maxResults:50

    }, function(err, data) {
        if (err) {
            return res.send({
                error: err
            })

        }
        res.send(data)

    });
}
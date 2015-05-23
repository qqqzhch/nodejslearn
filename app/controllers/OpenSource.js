var gitRepoSql = require('../model/gitRepo');
var MarkdownIt = require('markdown-it');

exports.index = function(req, res) {
    var index = req.params.pager || 1;

    gitRepoSql
        .getReposPager(index - 1, 30)
        .then(function(data) {

            var allNum = data.count;
            var allpager = allNum % 30 == 0 ? (allNum / 30) : ((allNum - allNum % 30)/30 + 1);

            res.locals.respList = data;
            res.locals.pager = {
                start: ((index - 5) < 0 ? 1 : (index - 5)),
                end: ((index + 5) > allpager ? allpager : (index + 5)),
                now: index,
                allitems: allNum,
                pagerUrl:'/opensource/'
            }
            console.log(res.locals.pager);
            res.render('OpenSource_Index');

        }, function(err) {
            throw err;

        })
}
exports.repo = function(req, res) {
    var ower = req.params.ower;
    var repo = req.params.repo;
    var full_name = ower + "/" + repo;
    console.log(full_name);
    if (ower && repo) {
        gitRepoSql
            .getRepoInfo(full_name)
            .then(function(data) {
                var md = new MarkdownIt();
                try {
                    data.readme_content = md.render(data.readme_content);
                } catch (e) {

                }

                res.locals.respInfo = data;
                res.render('OpenSource_repo');
            }, function(err) {
                console.log(err);
                res.render('error');
            })
    } else {
        //跳到错误页面
        console.log(full_name);
        res.render('error');

    }

}


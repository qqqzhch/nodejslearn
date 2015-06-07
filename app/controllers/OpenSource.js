var gitRepoSql = require('../model/gitRepo');
var markdown = require('markdown-it')({  html: true,
  linkify: true,
  typographer: true});
var pagerCom = require('./pager');

exports.index = function(req, res) {
    var index = req.params.pager || 1;
    if (index < 1) {
        index = 1
    }
    res.locals.seo.title = "opensource -Find what you are looking for open source projects, to share and Exchange"
  
    gitRepoSql
        .getReposPager(index - 1, 30)
        .then(function(data) {
            if (index > 1) {
                res.locals.seo.title = "page " + index + " of  " + res.locals.seo.title
            }
            pagerCom.getPager(res, data, index, '/opensource/')
            res.locals.respList = data;

            res.render('OpenSource_Index');

        }, function(err) {
            console.log('88888')
            throw err;

        }).catch(function(error) {
      
                 console.log('8888866668886')
            res.statusCode = 500;
            res.render('error');
        })
}
exports.repo = function(req, res) {
    var ower = req.params.ower;
    var repo = req.params.repo;
    var full_name = ower + "/" + repo;
    res.locals.keywords = ower + "," + repo;
    res.locals.seo.title = full_name
    console.log(full_name);
    if (ower && repo) {
        gitRepoSql
            .getRepoInfo(full_name)
            .then(function(data) {

                res.locals.description = data.description;
                
                try {
                    data.readme_content = markdown.render(data.readme_content);
                } catch (e) {

                }

                res.locals.respInfo = data;
                res.render('OpenSource_repo');
            }, function(err) {
                console.log('8888866668886==============')
                console.log(err);
                res.render('error');
            })
            .catch(function(error) {
                console.log('8888866668886')
            res.statusCode = 500;
            res.render('error');
        })
    } else {
        //跳到错误页面
        console.log(full_name);
        res.render('error');

    }

}
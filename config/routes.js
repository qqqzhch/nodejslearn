var home = require('../app/controllers/home');
var OpenSource = require('../app/controllers/OpenSource');
var question = require('../app/controllers/question');
var video = require('../app/controllers/video');
var book = require('../app/controllers/book');
var share = require('../app/controllers/share');
var yanzheng = require('../app/controllers/yanzheng');
var search = require('../app/controllers/search');
var DeveloperTools = require('../app/controllers/DeveloperTools');


module.exports = function(app, config) {
    console.log('luyou');
    //app.get('/',home.index );
    app.get('/codeshow',share.codetpl)

    app.get('/', home.index);
    app.get('/404', home.http404);
    app.get('/error', home.error);
    app.get('/errortest', home.errortest);
    app.get('/info', home.info);
    app.get('/rlist', home.rlist);
    app.get('/robots.txt', home.robots);
    app.get('/sharecode',share.code)
    app.post('/sharecodeToimg',share.codeToimg)

    

    app.get('/googled096f8f26eebd636.html',yanzheng.google)
    app.get('/opensource/:pager(\\d+)?', OpenSource.index);
    app.get('/opensource/:ower/:repo', OpenSource.repo);
    app.get('/opensource/:ower/:repo/question/:pager(\\d+)?', question.list);
    app.get('/opensource/:ower/:repo/video/:pager(\\d+)?', video.list);
    app.get('/opensource/:ower/:repo/book/:pager(\\d+)?', book.list);
                   ///opensource/jadejs/jade/book
    app.get('/opensource/:ower/:repo/q/:id_site/:id_question/:title?', question.info);
    app.get('/opensource/:ower/:repo/v/:id_site/:id_video/:title?', video.info);
    app.get('/opensource/:ower/:repo/b/:id_site/:id_book/:title?',  book.info);
    app.get('/search/:keyword?',search.gitRepo )
    app.get('/DeveloperTools/feature',DeveloperTools.feature )

    



    // app.get('/github/repos', home.repos);
    // app.get('/github/getReadme', home.getReadme);
    // app.get('/github/getConent', home.getConent);
    // app.get('/stack/getSearch', home.getSearch);
    // app.get('/stack/getQuestionsInfo', home.getQuestionsInfo);
    // app.get('/stack/getAnswersnfo', home.getAnswersnfo);
    // app.get('/youtube/search', home.search);
    // app.get('/youtube/videos', home.videos);
    app.get('*', function(req, res) {
        res.writeHead(301, {
            'Location': '/404'
        });
        res.end();
    });


}
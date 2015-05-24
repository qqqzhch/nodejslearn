var stackexchange = require('stackexchange');



var options = {
    version: 2.2
};
var context = new stackexchange(options);
var filter = {
    key: '1bHwZK)j3oMWIjndaVT*lQ((',
    pagesize: 50,
    sort: 'votes',
    order: 'desc',
    filter: 'withbody',
    page: 1
};
var filterInfoQ = {
    key: 'lELWSWzGpXNP5Yt4)KIhfA((',
    filter: 'withbody'
};
exports.getSearch = function(q, index, callbaack) {


    filter.intitle = q;
   context.search.search(filter, function(err, data) {
           callbaack(err, data, data)
    });
}
exports.getAnswersnfo = function(q, callbaack) {

    q = q.split(',')
    context.questions.answers(filterInfoQ, function(err, data) {
        callbaack(err, data, data)
    }, q);
}
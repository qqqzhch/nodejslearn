var request = require('request');
var async = require('async');
var env = process.env.OPENSHIFT_MONGODB_DB_URL ? 'production' : 'development',
    config = require('../config/config')[env]
var mongoose = require('mongoose');
console.log(env);
mongoose.connect(config.db);
var gitrepoModel = require('./models/gitrepo');
var gitreadmeModel = require('./models/gitreadme');
var stackQuestionModel = require('./models/stackQuestion');
var _ = require('underscore');
var youtubesearchModel = require('./models/youtubesearch');
var stackanswersnfoModel = require('./models/stackanswersnfo');
var youtubeVideoModel = require('./models/youtubeVideo');

function getgithubrepos(callbaack) {
    console.log("one");
    request('http://test.unknownerror.org/github/repos/?q=stars:%3E1', function(error, response, body) {

        if (error) {
            //采集失败
            console.log(error)
            throw error
        }
        body = JSON.parse(body)
        callbaack(error, body)
    })
}

function getgitreadme(aitem, callbaack) {


    request('http://test.unknownerror.org/github/getReadme?user=' + aitem.owner.login + '&repo=' + aitem.name, function(error, response, body) {
        if (error) {
            //采集失败
            console.log(error)
            throw error
        }
        body = JSON.parse(body)
        if(body){
              body.repo = {
                        full_name: aitem.full_name,
                        language: aitem.language
                    }
        }
        // console.log(body.content)
        // aitem.__readme = body;
        callbaack(error, body)
    })


}

function getrespQuestion(list, callbaack) {
    console.log('采集问题')
    async.map(list, function(aitem, callback) {
        console.log('采集' + aitem.name);
        request('http://test.unknownerror.org/stack/getSearch?q=' + aitem.name, function(error, response, body) {
            if (error) {
                //采集失败
                console.log(error)
                throw error
            }
            console.log('采集回来' + aitem.name);
            body = JSON.parse(body)
            // console.log(body.content)
            // aitem.__readme = body;
            if (body.items) {
                _.each(body.items, function(qitem) {
                    qitem.repo = {
                        full_name: aitem.full_name,
                        language: aitem.language
                    }
                });
            }
            callback(error, body);
        })
    }, function(err, result) {
        callbaack(err, result)

    })

}

function getYoutubeSearch(list, callbaack) {
    console.log('采集视频列表')
    async.map(list, function(aitem, callback) {
        console.log('采集视频' + aitem.name);
        request('http://test.unknownerror.org/youtube/search?q=' + aitem.name, function(error, response, body) {
            if (error) {
                //采集失败
                console.log(error)
                throw error
            }
            console.log('采集视频回来' + aitem.name);
            body = JSON.parse(body)
            if (body.items) {
                _.each(body.items, function(qitem) {
                    qitem.repo = {
                        full_name: aitem.full_name,
                        language: aitem.language
                    }
                });
            }
            // console.log(body.content)
            // aitem.__readme = body;
            callback(error, body);
        })
    }, function(err, result) {
        callbaack(err, result)

    })
}

function getAnswerListByGroup(list, callbaack) {
    console.log('采集问题的答案')
    async.map(list, function(aitem, callback) {
        var idlist = _.pluck(aitem, 'question_id').join(',');
        console.log('采集答案' + idlist);
        request('http://test.unknownerror.org/stack/getAnswersnfo?q=' + idlist, function(error, response, body) {
            if (error) {
                //采集失败
                console.log(error)
                throw error
            }
            console.log('采集答案回来' + idlist);
            body = JSON.parse(body)
            // console.log(body.content)
            // aitem.__readme = body;
            if (body.items) {
                callback(error, body.items);
            } else {
                callback(error, []);
            }

        })
    }, function(err, result) {
        callbaack(err, result)

    })
}

function getyoutubeVideoListByGroup(list, callbaack) {
    console.log('采集视频')
    async.map(list, function(aitem, callback) {
        var idlist = _.pluck(aitem, 'id');
        idlist = _.pluck(idlist, 'videoId').join(',');

        console.log('采集视频' + idlist);
        request('http://test.unknownerror.org/youtube/videos?q=' + idlist, function(error, response, body) {
            if (error) {
                //采集失败
                console.log(error)
                throw error
            }
            console.log('采集视频回来' + idlist);
            body = JSON.parse(body)
            // console.log(body.content)
            // aitem.__readme = body;
            if (body.items) {
                callback(error, body.items);
            } else {
                callback(error, []);
            }

        })
    }, function(err, result) {
        callbaack(err, result)

    })
}





function storeReopData(body, callbaack) {
    // body...
    console.log("storeReopData");
    async.each(body.items, function(aitem, callback) {
        console.log('存储');
        var gitrepoItem = new gitrepoModel(aitem);
        gitrepoItem.save(function(err) {

            console.log(err);
            callback();
        });




    }, function() {
        console.log('存储完了');
        callbaack(null, body)
    });
}

function getReadmeData(body, callbaack) {
    // body...
    console.log("storeReadmeData");
    // console.log(items)

    async.map(body.items, getgitreadme, function(err, result) {
        callbaack(err, result)
    });

}

function storeReadmeData(body, callbaack) {

    async.each(body, function(aitem, callback) {
        console.log('存储');
        var gitreadmeItem = new gitreadmeModel(aitem)
        gitreadmeItem.save(function(err) {

            console.log(err);
            callback();
        });
    }, function() {
        console.log('readme存储完了');
        callbaack(null)

    });


}

function getresplist(callbaack) {
    console.log('读取repos');
    gitrepoModel.find(function(err, list) {
        callbaack(err, list)
    })
}

function makedataRespQuestion(list, callbaack) {
    async.map(list, function(aitem, callback) {

        if (aitem.items) {
            callback(null, aitem.items)
        } else {
            callback(null, [])
        }


    }, function(error, list) {
        callbaack(error, list);
    });
}

function storerespQuestion(list, callbaack) {
    var listTemp = _.flatten(list, true)

    console.log('开始存储');
    async.map(listTemp, function(aitem, callback) {
        console.log('--');
        var stackQuestion = new stackQuestionModel(aitem);
        stackQuestion.save()
        callback(null, stackQuestion.question_id)

    }, function(error, list) {
        callbaack(error);
    });
}

function mapYoutubeSearch(list, callbaack) {
    async.map(list, function(aitem, callback) {

        if (aitem.items) {
            callback(null, aitem.items)
        } else {
            callback(null, [])
        }


    }, function(error, list) {
        callbaack(error, list);
    });
}

function storeYoutubeSearch(list, callbaack) {
    console.log('存储视频列表');
    //items
    var listTemp = _.flatten(list, true)
    async.each(listTemp, function(item, callback) {
        var youtubesearchItem = youtubesearchModel(item);
        youtubesearchItem.save();
        callback();

    }, function(err) {
        callbaack(err)
    });
}

function getQuestion(callbaack) {
    stackQuestionModel.find(function(err, list) {
        callbaack(err, list)
    })
}

function getForGroup(list, callbaack) {
    var listdiGroup = [];
    var i = 0
    while (list.length > 0) {
        listdiGroup[i] = list.slice(0, 15);
        if (list.length > 15) {
            list = list.slice(15);
        } else {
            list = []
        }
        i++;
    }
    callbaack(null, listdiGroup)
}

function storesatckAnswer(list, callbaack) {
    var listTemp = _.flatten(list, true)
    console.log('存储答案');
    async.each(listTemp, function(item, callback) {
        var stackanswersnfoItem = stackanswersnfoModel(item)
        stackanswersnfoItem.save()
        callback(null)

    }, function(err) {
        callbaack(err)
    });
}

function foryoutubeSearch(callbaack) {
    youtubesearchModel.find(function(err, list) {
        callbaack(err, list)
    })
}

function stroeyoutubeVideo(list, callbaack) {
    var listTemp = _.flatten(list, true)
    console.log('存储答案');
    async.each(listTemp, function(item, callback) {
        var youtubeVideoItem = youtubeVideoModel(item)
        youtubeVideoItem.save()
        callback(null)

    }, function(err) {
        callbaack(err)
    });

}



function parallelPartForList(callbaack) {
    async.parallel([

        function(callback) {
            async.waterfall([
                getresplist,
                getrespQuestion,
                makedataRespQuestion,
                storerespQuestion,
                getQuestion,
                getForGroup,
                getAnswerListByGroup,
                storesatckAnswer
            ], function(err) {
                callback(err)
            })
        },
        function(callback) {
            async.waterfall([
                getresplist,
                getYoutubeSearch,
                mapYoutubeSearch,
                storeYoutubeSearch,
                foryoutubeSearch,
                getForGroup,
                getyoutubeVideoListByGroup,
                stroeyoutubeVideo
            ], function(err) {
                callback(err)
            })
        }
    ], function(err) {
        callbaack(err)
    });
}



async.waterfall([
        getgithubrepos,
        storeReopData,
        getReadmeData,
        storeReadmeData,
        // parallelPartForList,

    ],
    function(err, body) {
        // results is now equal to: {one: 1, two: 2} 
        console.log('这一页完了最终完了，可以开始尝试下一页了');

    });


// async.waterfall([
//     getresplist,
//     getrespQuestion,
//     makedataRespQuestion,
//     storerespQuestion,
//     getQuestion,
//     getForGroup,
//     getAnswerListByGroup,
//     storesatckAnswer
// ], function(err) {
//     console.log('===');
// })

// async.waterfall([
//     getresplist,
//     getYoutubeSearch,
//     mapYoutubeSearch,
//     storeYoutubeSearch,
//     foryoutubeSearch,
//     getForGroup,
//     getyoutubeVideoListByGroup,
//     stroeyoutubeVideo
// ], function(err) {
//     console.log('===');
// })
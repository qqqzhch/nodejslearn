exports.getPager=function (res,data,index,pagerUrl) {
            var allNum = data.count;
            var allpager = allNum % 30 == 0 ? (allNum / 30) : ((allNum - allNum % 30)/30 + 1);
            index=index-0;
            res.locals.pager = {
                start: ((index - 5) < 0 ? 1 : (index - 5)),
                end: ((index + 5) > allpager ? allpager : (index + 5)),
                now: index,
                allitems: allNum,
                pagerUrl:pagerUrl
            }
}
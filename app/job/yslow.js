var YSlow = require('yslowjs');
var yslow = new YSlow('http://www.baidu.com/',
    [ '--info', 'grade' ]);//basic  grade'
console.log('\nRunning (Async)....');
yslow.run( function (error, result) {
    if (error) {
        console.trace(error);
    } else {
        console.log(result);
        console.log('=> grade:   ' + result.o);
        console.log('=> load time: ' + result.lt);


    }
});


// Name	Value
// w	total page size
// o	overall score
// u	url
// r	total number of requests
// s	space id of the page
// i	id of the ruleset used
// ynumreq	score for Make fewer HTTP Requests
// ycdn	score for Use a Content Delivery Network(CDN)
// yemptysrc	score for Avoid empty src or href
// yexpires	score for Add Expires headers
// ycompress	score for Compress components with gzip
// ycsstop	score for Put CSS at top
// yjsbottom	score for Put JavaScript at bottom
// yexpressions	score for Avoid CSS expressions
// yexternal	score for Make JavaScript and CSS external
// ydns	score for Reduce DNS lookups
// yminify	score for Minify JavaScript and CSS
// yredirects	score for Avoid URL redirects
// ydupes	score for Remove duplicate JavasScript and CSS
// yetags	score for Configure entity tags (ETags)
// yxhr	score for Make AJAX cacheable
// yxhrmethod	score for Use GET for AJAX requests
// ymindom	score for Reduce the number of DOM elements
// yno404	score for Avoid HTTP 404 (Not Found) error
// ymincookie	score for Reduce cookie size
// ycookiefree	score for Use cookie-free domains
// ynofilter	score for Avoid AlphaImageLoader filter
// yimgnoscale	score for Do not scale images in HTML
// yfavicon	score for Make favicon small and cacheable
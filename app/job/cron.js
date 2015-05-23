var CronJob = require('cron').CronJob;
console.log('kaishi');
new CronJob('* 4 * * * *', function(){
    console.log('4min  search github');
    require('./github').run()
}, null, true, "America/Los_Angeles");


new CronJob('*2 * * * *', function(){
    console.log('2min  search youtube');
    require('./youtube').run()
}, null, true, "America/Los_Angeles");

new CronJob('*2 * * * *', function(){
    console.log('2min  search stackSearch');
    require('./stackSearch').run()
}, null, true, "America/Los_Angeles");


new CronJob('*2 * * * *', function(){
    console.log('2min  search youtubeVideo');
    require('./youtubeVideo').run()
}, null, true, "America/Los_Angeles");

new CronJob('*2 * * * *', function(){
    console.log('2min  search stackAnswer');
    require('./stackAnswer').run()
}, null, true, "America/Los_Angeles");
console.log('kaishiend');
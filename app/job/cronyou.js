var CronJob = require('cron').CronJob;
console.log('kaishi');

new CronJob('*1 * * * *', function() {
    console.log('2min  search youtube');
    require('./youtube').run()
}, null, true, "America/Los_Angeles");

new CronJob('*2 * * * *', function() {
    console.log('2min  search youtubeVideo');
    require('./youtubeVideo').run()
}, null, true, "America/Los_Angeles");

console.log('kaishiend');
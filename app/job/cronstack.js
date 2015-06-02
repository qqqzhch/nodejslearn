var CronJob = require('cron').CronJob;
console.log('kaishi');
new CronJob('*2 * * * *', function() {
    console.log('2min  search stackSearch');
    require('./stackSearch').run()
}, null, true, "America/Los_Angeles");

new CronJob('*2 * * * *', function() {
    console.log('2min  search stackAnswer');
    require('./stackAnswer').run()
}, null, true, "America/Los_Angeles");

console.log('kaishiend');
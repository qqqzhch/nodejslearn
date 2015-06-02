var CronJob = require('cron').CronJob;

console.log(process.env.NODE_ENV);
var github = require('./github');
//github.run()
new CronJob('*4 * * * *', function() {
    console.log('4min  search github');
    //github.run()
}, null, true, "America/Los_Angeles");

new CronJob('*1 * * * *', function() {
    console.log('1min  search gitReadme');
    require('./gitReadme').run()
}, null, true, "America/Los_Angeles");

console.log('kaishiend');
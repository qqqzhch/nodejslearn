var CronJob = require('cron').CronJob;
console.log('kaishi');

new CronJob('*2 * * * *', function() {
    console.log('2min  search hacknewsjob');
    var hacknewsjob = require('./hacknewsjob');
    hacknewsjob.run();
}, null, true, "America/Los_Angeles");




var CronJob = require('cron').CronJob;
console.log('kaishi');

new CronJob('*2 * * * *', function() {
    console.log('2min  search youtube');
    var book = require('./book');
  book.run()
}, null, true, "America/Los_Angeles");
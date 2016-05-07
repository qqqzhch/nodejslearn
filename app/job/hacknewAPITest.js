var hn = require('hacker-news-api');
hn.story().search('react').hitsPerPage(2).before('past_week', function (error, data) {
  if (error) throw error;
  console.log(data);
  // console.log(JSON.stringify(data));
}
});
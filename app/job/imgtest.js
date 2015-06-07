var webshot = require('webshot');

webshot('<html><body>Hello World</body></html>', 'public/webshot/hello_world.png', {siteType:'html'}, function(err,data) {
  // screenshot now saved to hello_world.png
  console.log(data);
});
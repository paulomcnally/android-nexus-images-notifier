var http = require('http');
var Lib = require('./lib');
var lib = new Lib();

var CronJob = require('cron').CronJob;
new CronJob('1 10 * * * *', function() {
  lib.check();
}, null, true);

http.createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  lib.getCache(function(error, cache) {
    var output = '';
    if (error) {
      output = error;
    }
    else {
      output = cache
    }
    res.end(output);
  });
}).listen(process.env.PORT || 1337, null);

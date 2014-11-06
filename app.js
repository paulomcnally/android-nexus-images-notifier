var http = require('http');
var Lib = require('./lib');
var lib = new Lib();

var CronJob = require('cron').CronJob;
new CronJob('1 10 * * * *', function() {
  lib.check();
}, null, true, 'America/Mangua');

http.createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  lib.getCache(function(error, cache) {
    if (error) {
      res.end(error);
    }
    else {
      res.end(cache);
    }
  });
}).listen(process.env.VMC_APP_PORT || 1337, null);

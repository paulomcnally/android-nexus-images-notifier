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
    var d = new Date();
    if (error) {
      res.end(error + '\n' + d.toString());
    }
    else {
      res.end(cache  + '\n' + d.toString());
    }
  });
}).listen(process.env.PORT || 1337, null);

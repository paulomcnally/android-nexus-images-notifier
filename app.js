var http = require('http');
var moment = require('moment');
var Lib = require('./lib');
var lib = new Lib();
moment.locale('es');

var CronJob = require('cron').CronJob;
new CronJob('1 10 * * * *', function() {
  lib.check();
}, null, true, 'America/Mangua');

http.createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  lib.getCache(function(error, cache) {
    var output = '';
    var date = moment().format('llll');
    if (error) {
      output = error;
    }
    else {
      output = cache
    }
    res.end(output  + '<br />' + date);
  });
}).listen(process.env.PORT || 1337, null);

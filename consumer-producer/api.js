var restify = require('restify');
var moment = require('moment');

var bs = require('nodestalker'),
    client = bs.Client('127.0.0.1:11300');

client.use('default');

var server = restify.createServer();
server.use(restify.queryParser());

server.post("/:id", function (req, res, next){
  console.log("got GET request at "+ moment().format('h:mm:ss'));

  res.header("Cache-Control","max-age=3600");

  client.put(req.params.id)

  res.send(200, {result:"i'm server #1"});
})

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});


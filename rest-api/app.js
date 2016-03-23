var restify = require('restify');
var moment = require('moment');

var server = restify.createServer();
server.use(restify.queryParser());

server.get("/", function (req, res, next){
  console.log("got GET request at "+ moment().format('h:mm:ss'));

  res.header("Cache-Control","max-age=3600");

  res.send(200, {result:"i'm server #1"});
})

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});


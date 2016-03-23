var restify = require('restify');

var server = restify.createServer();
server.use(restify.queryParser());


server.get("/", function (req, res, next){
  res.send(200, {result:"i'm server #1"})
})

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});


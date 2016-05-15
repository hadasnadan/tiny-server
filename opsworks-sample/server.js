var restify = require('restify');

var knox = require('knox').createClient({
    key: 'AKIAJNBXIHGAC6UR2NXA',
    secret: process.env.s3secret,
    bucket: 'tiny-server'
});

var server = restify.createServer();
server.use(restify.queryParser());


server.get("/", function (req, res, next){
    res.send(200, {result:"ok"});
})

server.put("/files/:id", function (req, res, next) {
    var s3Request = knox.put(req.params.id, {'Content-Length': req.contentLength()});
    req.pipe(s3Request)
    s3Request.on("response", function(err, s3res){ 
		if (err) { console.log(err); }
		res.send(200, {result:"/files/"+req.params.id});
		next();
	})
});

server.get("/files/:id", function (req, res, next) {
    knox.getFile(req.params.id, function(err, result){
    	if(err) { return next(err); }   

	res.setHeader('Content-Type', 'image/png');
 
   	result.pipe(res);           
    });

});

server.listen(80, function() {
	console.log('%s listening at %s', server.name, server.url);
});


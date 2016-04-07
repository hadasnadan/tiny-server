var restify = require('restify');
var moment = require('moment');
var redis = require('redis');

var server = restify.createServer();
var redisClient = redis.createClient({
    host:"redis-host-here",
    port:6739
})


server.use(restify.queryParser());

server.get("/fibonacci/:n", function (req, res, next){
    console.log("got GET request at "+ moment().format('h:mm:ss'));

    var from = moment();

    var n=req.params.n;
    var result = nthFibonacci(n);

    var to = moment();

    res.send(200, {
        result:result,
        timeTaken: moment.utc(to.diff(from)).format("HH:mm:ss.SSS")
    });
})

function nthFibonacci(n) {
    return n < 1 ? 0
        : n <= 2 ? 1
        : nthFibonacci(n - 1) + nthFibonacci(n - 2);
}


server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
});


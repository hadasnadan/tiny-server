var restify = require('restify');
var moment = require('moment');
var redis = require('redis');

var server = restify.createServer();
var redisClient = redis.createClient({
    host:"52.91.196.219",
    port:6739
})

server.use(restify.queryParser());

server.get("/", function (req, res, next){
    res.send(200, {result:"ok"});
})

server.get("/fibonacci/:n", function (req, res, next){
    console.log("got GET request at "+ moment().format('h:mm:ss') + " for number "+req.params.n);

    var from = moment();
    
    var n=req.params.n;

    redisClient.get("fib_"+n, function(err, result){
        if (!result) {
            result = nthFibonacci(n);
            redisClient.set("fib_" + n, result)
        }

        var to = moment();

        res.send(200, {
            result:result,
            timeTaken: moment.utc(to.diff(from)).format("HH:mm:ss.SSS")
        });
    })
})

function nthFibonacci(n) {
    return n < 1 ? 0
        : n <= 2 ? 1
        : nthFibonacci(n - 1) + nthFibonacci(n - 2);
}

server.get("/loaderio-6c90ecae45950a945eaa8652c84d0528.txt", function (req, res, next){
    res.write("loaderio-6c90ecae45950a945eaa8652c84d0528");
    res.end();
})

server.get("/tests", function (req, res, next){
    res.send(200, {
            "keys": ["number"] ,
            "values": [
                [0], [1], [2], [3], [4], [5], [6], [7], [8], [9], [10], [11], [12], [13], [14], [15], [16], [17], [18], [19], [20], [21]
            ]
        }
    );
})

server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
});


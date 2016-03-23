var bs = require('nodestalker'),
    client = bs.Client('127.0.0.1:11300');

client.use('default').onSuccess(function(data) {
  console.log(data);

  client.put('my job').onSuccess(function(data) {
    console.log(data);
    client.disconnect();
  });
});

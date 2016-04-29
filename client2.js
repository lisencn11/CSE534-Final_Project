var https = require('https');
var fs = require("fs");
var spdy = require("spdy");

var options = {
    host: 'localhost',
    port: 8081,
    path: '/backbone.js',
    method: 'GET',
    rejectUnauthorized: false,
    key: fs.readFileSync("key/userB.key"),
    cert: fs.readFileSync("key/userB.crt"),
    ca: fs.readFileSync("key/ca.crt")
};

var agent = spdy.createAgent({
  // host: 'ec2-52-36-120-88.us-west-2.compute.amazonaws.com',
  host: 'localhost',
  port: 8081,
  path: '/backbone.js',
  key: fs.readFileSync("key/userB.key"),
  cert: fs.readFileSync("key/userB.crt"),
  ca: fs.readFileSync("key/ca.crt")
});

var req = https.request(options, function(res) {
    console.log("statusCode: ", res.statusCode);
    console.log("headers: ", res.headers);
    
    res.on('data', function(d) {
        process.stdout.write(d);
    });
});

req.end();

req.on('error', function(e) {
    console.error(e);
});
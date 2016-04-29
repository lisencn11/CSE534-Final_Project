// var spdy = require('spdy');
// var https = require('https');

// var agent = spdy.createAgent({
//   host: 'localhost',
//   port: 8081,

//   // Optional SPDY options
//   spdy: {
//     plain: false,
//     ssl: false,

//     // **optional** send X_FORWARDED_FOR
//     'x-forwarded-for': '127.0.0.1'
//   }
// });

// https.get({
//   host: 'localhost',
//   agent: agent
// }, function(response) {
//   console.log('yikes');
//   // Here it goes like with any other node.js HTTP request
//   // ...
//   // And once we're done - we may close TCP connection to server
//   // NOTE: All non-closed requests will die!
//   agent.close();
// }).end();

var spdy = require('spdy');
var https = require('https');
var fs = require('fs');



var agent = spdy.createAgent({
  // host: 'ec2-52-36-120-88.us-west-2.compute.amazonaws.com',
  host: 'localhost',
  port: 8081
});

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

// https.get({
//   host: 'localhost',
//   port: 8081,
//   path: '/backbone.js',
//   key: fs.readFileSync("key/userB.key"),
//   cert: fs.readFileSync("key/userB.crt"),
//   ca: fs.readFileSync("key/userB.csr"),
//   agent: agent
// }, function(response) {
//   console.log('yikes');
//   // Here it goes like with any other node.js HTTP request
//   // ...
//   // And once we're done - we may close TCP connection to server
//   // NOTE: All non-closed requests will die!
//   agent.close();
// }).end();


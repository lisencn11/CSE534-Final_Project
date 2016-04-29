var fs = require("fs");
var spdy = require("spdy");

var backbone = fs.readFileSync("backbone.js");
var underscore = fs.readFileSync("underscore.js");
var applicationjs = fs.readFileSync("application.js");

var options = {
    key: fs.readFileSync("key/server.key"),
    cert: fs.readFileSync("key/server.crt"),
    ca: fs.readFileSync("key/server.csr")
};

var server = spdy.createServer(options, function(request, response) {
    var headers = {
        "content-type": "application/javascript"
    };
    console.log("receive a http request!");
    console.log(request.url.substring(1));
//     response.push("/backbone.js", headers, function(err, stream) {
//         if (err) return;
// console.log(request.url);
//         stream.end(backbone);
//     });
//     response.push("/underscore.js", headers, function(err, stream){
//     if (err) return;
// console.log(request.url);
//     stream.end(underscore);
//     });
//     response.push("/application.js", headers, function(err, stream){
//         if (err) return;
// console.log(request.url);
//         stream.end(applicationjs);
//     });

    response.writeHead(200, {"content-type": "text/html"});
    var body = fs.readFileSync(request.url.substring(1));
//     var message = "No SPDY for you!";
//     if (request.isSpdy) {
//         message = "YAY! SPDY Works!";
//     }
    // response.end("" +
    //     "<html>" +
    //       "<head>" +
    //         "<title>First SPDY App!</title>" +
    //         "<script src='/underscore.js'></script>" +
    //         "<script src='/backbone.js'></script>" +
    //         "<script src='/application.js'></script>" +
    //       "</head>" +
    //       "<body>" +
    //         "<h1>" + message + "</h1>" +
    //       "</body>" +
    //     "</html>");
        response.end(body);
});

server.listen(8081, function() {
    console.log("SPDY Server started on 8081");
})

// var spdy = require('spdy'),
//     fs = require('fs');

// var options = {
//   key: fs.readFileSync("keys/server.key"),
//     cert: fs.readFileSync("keys/server.crt"),
//     ca: fs.readFileSync("keys/server.csr")
// };

// var server = spdy.createServer(options, function(req, res) {
//     console.log("receive a spdy request");
//   res.writeHead(200);
//   res.end('hello world!');
// });

// server.listen(3000);
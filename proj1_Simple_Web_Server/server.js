// get required modules
// javascript - declare variable but not types
var http = require('http');
var url = require('url');
var path = require('path');                 // for file paths
var fs = require('fs');                     // file system

// Array of Mime Types {}
var mimeTypes = {                           // label given to a type of data so software knows what to do with it
    "html" : "text/html",
    "jepg" : "image/jepg",
    "jpg" : "image/jepg",
    "png" : "image/png",
    "js" : "text/javascript",
    "css" : "text/css",
}

// Create Server
http.createServer(function(req, res){         // request, response
    var uri = url.parse(req.url).pathname;   // URI = Uniform Resource Identifier
    // Do not use unescape to decode URIs, use decodeURI instead.
    // unescape is depreciated
    // These deprecated features can still be used, but should be used with caution because they are expected to be removed entirely sometime in the future. You should work to remove their use from your code.
    var fileName = path.join(process.cwd(), decodeURI(uri)); // process.cwd returns current working dir of the process
    console.log("Loading " + uri);
    var stats;                                // declare stats variable

    try{
        stats = fs.lstatSync(fileName);       // look for file name, if not catch
    } catch(err) {
        res.writeHead(404, {'Content-type':'text/plain'}); // throw 404 error
        res.write('404 Not Found\n');
        res.end();
        return;
    }

    if(stats.isFile()) {
        var mimeType = mimeTypes[path.extname(fileName).split(".").reverse()[0]]; // gets the mimetype
        res.writeHead(200, {'Content-type': mimeType}); // 200 status is successful

        var fileStream = fs.createReadStream(fileName)
        fileStream.pipe(res);

    } else if (stats.isDirectory()){
        res.writeHead(302, {'Location' : 'index.html'});// 302 redirect
        res.end();
    } else {                         // not a file or directory
        res.writeHead(500, {'Content-Type':'text/plain'});         // 500 internal error
        res.write('500 Internal Error');
        res.end();
    }

}).listen(3000); // listen to prt 3000




/** // Video 3

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type':'text/plain'});
    res.end('Hello World\nSimple server here\nMY TEXT HERE :D');
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/ \n MY TEXT HERE :D');

// we need to add more stuff i.e. if we have about.html in same package --> make server grab that

*/

var http = require("http"),
    fs = require("fs");

function serveStaticFile(res, path, contentType, responseCode) {
    if(!responseCode) responseCode = 200;
    fs.readFile(__dirname + path, function(err, data) {
       if(err)  {
           res.writeHead(500, { 'Content-Type': 'text/plain' });
           res.end('500 - Internal Error');
       } else {
           res.writeHead(responseCode, { 'Content-Type': contentType });
           res.end(data, 'utf-8');
       } 
     });
}

http.createServer(function(req,res) {
    // normalize URL
    //   remove querystring, any trailing slash, them to LowerCase
    var path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();

    switch(path) {

        case '':
            serveStaticFile(res, '/public/home.html', 'text/html');
            break;

        case '/about':
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('ITC230 SU17 Advanced JavaSript\nApp Name: bookknow\nVersion : 1.0.0\n');
            break;

        default:
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Error - Resource Not Found: ' + path);
            break;
    }
}).listen(process.env.PORT || 3000);

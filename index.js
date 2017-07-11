var http = require("http"),
    qs = require("querystring"),
    books = require("./lib/books.js"),
    fs = require("fs");

const LISTEN_PORT = 3000;

/**
 * Serve a static file
 * @param object res = HTTP response
 * @param string path = path to file
 * @param string contentType
 * @param int responseCode
 */
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

/**
 * Create server
 * @param object req
 * @param object res
 */
http.createServer(function(req,res) {
    // build url, path and params object
    let url = req.url.split("?"); // split the request URL
    let params = qs.parse(url[1]); // create params
    let path = url[0].toLowerCase(); // establish lowercased path
   
    switch(path) {

        case '/':
            serveStaticFile(res, '/public/home.html', 'text/html');
            break;

        case '/about':
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('ITC230 SU17 Advanced JavaSript\nApp Name: bookknow\nVersion : 1.0.0\n');
            break;
            
        case '/getall':
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(books.byTitleAsc());
            break;
            
        case '/get':
            if (params.title) {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end(books.get(params.title));
            } else {
                res.writeHead(422, { 'Content-Type': 'text/plain' });
                res.end('422 Error - get request requires title parameter');
            }
            break;
            
        case '/add':
            if (params.title) {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end(books.add(params));
            } else {
                res.writeHead(422, { 'Content-Type': 'text/plain' });
                res.end('422 Error - add request requires at least title parameter');
            }
            break;
            
        case '/delete':
            if (params.title) {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end(books.delete(params.title));
            } else {
                res.writeHead(422, { 'Content-Type': 'text/plain' });
                res.end('422 Error - delete request requires title parameter');
            }
            break;

        default:
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Error - Resource Not Found: ' + path);
            break;
    }
}).listen(process.env.PORT || LISTEN_PORT);
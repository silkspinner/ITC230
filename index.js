'use strict'
let qs = require("querystring"),
    handlebars = require("express-handlebars"),
    books = require("./lib/books.js"),
    fs = require("fs");

const http = require("http"),
      express = require("express"),
      app = express(),
      LISTEN_PORT = 3000,
      TEXT_HTML = 'text/html',
      TEXT_PLAIN = 'text/plain';

// initialize express configuration
app.set('port', process.env.PORT || LISTEN_PORT);
app.use(express.static(__dirname + '/public'));
app.use(require("body-parser").urlencoded({extended: true}));
// initialize render engine
app.engine(".html", handlebars({extname: '.html'}));
app.set("view engine", ".html");

// initialize express configuration
app.set('port', process.env.PORT || LISTEN_PORT);
app.use(express.static(__dirname + '/public'));
app.use(require("body-parser").urlencoded({extended: true}));

// ***** DEFINE ROUTES *****

// ROUTE: home page
app.get('/', (req,res) => {
    let booklist = books.byTitleAsc();
    res.render('home', { results: booklist});
});

// ROUTE: add book page
app.get('/addbook', (req,res) => {
    let booklist = books.byTitleAsc();
    res.render('addbook', { results: booklist});
});

// ROUTE: about page
app.get('/about', (req,res) => {
    let bookcount = books.count();
    res.render('about', {bookcount: bookcount});
});

// ROUTE: getall page
app.get('/getall', (req,res) => {
    let booklist = books.byTitleAsc();
    res.render('details-all', { results: booklist});
});

// ROUTE: detail page
app.get('/detail', (req,res) => {
    let booklist = books.get(req.query.searchtext);
    res.render('details', {searchtext: req.query.searchtext, results: booklist});
});

// ROUTE: add page
app.get('/add', (req,res) => {
    let results = books.add({title: req.query.title,
                            author: req.query.author,
                            publisher: req.query.publisher,
                            year: req.query.year,
                            isbn: req.query.isbn,
                            volumes: req.query.volumes});
    res.render('add', {results: results});
});

// ROUTE: delete page
app.get('/delete', (req,res) => {
    let results = books.delete(req.query.title);
    res.render('delete', {results: results});
});

// ***** DEFINE ERROR HANDLING *****

// ERROR: 404 handler
app.use((req,res) => {
    res.type(TEXT_PLAIN);
    res.status(404);
    res.send('404 Error - Resource Not Found');
});

// ERROR: 500 handler
app.use((req,res) => {
    res.type(TEXT_PLAIN);
    res.status(500);
    res.send('500 Error - Internal Server Error');
});

// ERROR: 503 handler
app.use((req,res) => {
    res.type(TEXT_PLAIN);
    res.status(503);
    res.send('503 Error - Service Unavailable');
});

// ***** START SERVER *****

app.listen(app.get('port'), () => {
    console.log('Express Started');
});

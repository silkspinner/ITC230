/** index.php
 *
 * @package ITC230
 * @author Ron Nims <rleenims@gmail.com>
 * @link http://www.artdevsign.com/
 * @version 0.1 2017/07/28add update route
 * @license http://opensource.org/licenses/osl-3.0.php Open Software License ("OSL") v. 3.0
 * @todo add update route
 */

'use strict';
let handlebars = require('express-handlebars'),
    _ = require('underscore'),
    Book = require('./models/Book.js');

const express = require('express'),
    app = express(),
    LISTEN_PORT = 3000,
    TEXT_PLAIN = 'text/plain',
    TEXT_HTML = 'text/html';

// initialize express configuration
app.set('port', process.env.PORT || LISTEN_PORT);
app.use(express.static(__dirname + '/public'));
app.use(require('body-parser').urlencoded({extended: true}));
// initialize render engine
app.engine('.html', handlebars({extname: '.html'}));
app.set('view engine', '.html');

// initialize express configuration
app.set('port', process.env.PORT || LISTEN_PORT);
app.use(express.static(__dirname + '/public'));
app.use(require('body-parser').urlencoded({extended: true}));

// ***** DEFINE ROUTES *****

// ROUTE: home page
app.get('/', (req, res, next) => {
    Book.find({}, function (err, booklist) {
        if (err) return next(err);
        res.render('home', { results: booklist});
    });
});

// ROUTE: about page
app.get('/about', (req, res, next) => {
    Book.find({}, function (err, booklist) {
        if (err) return next(err);
        res.render('about', { bookcount: booklist.length});
    });
});


// ROUTE: getall page
app.get('/getall', (req, res, next) => {
    Book.find({}, function (err, booklist) {
        if (err) return next(err);
        booklist = _.sortBy(booklist, 'title');
        res.render('details-all', { results: booklist});
    });
});

// ROUTE: detail page
app.get('/detail', (req, res, next) => {
    var find_regex = new RegExp( req.query.searchtext, "i");
    Book.find({"title": {$regex:find_regex }}, function (err, booklist) {
        if (err) return next(err);
        res.render('details', {searchtext: req.query.searchtext, results: booklist});
    });
});

// ROUTE: delete page
app.get('/delete', (req, res, next) => {
    Book.remove({ title:req.query.title }, (err, result) => {
        if (err) return next(err);
        let delresult = result.result.n !== 0;
      
        Book.count((err, total) => {
            res.type(TEXT_HTML);
            res.render('delete', {title: req.query.title, result: delresult, total: total.toString() } );    
        });
    });
});


// ROUTE: add book page
app.get('/addbook', (req, res, next) => {
    Book.find({}, function (err, booklist) {
        if (err) return next(err);
        res.render('addbook', { results: booklist});
    });
});

/* TODO
// ROUTE: edit book page
app.get('/editbook', (req, res, next) => {
    var find_regex = new RegExp( req.query.title, "i");
    Book.find({"title": {$regex:find_regex }}, function (err, book) {
        if (err) return next(err);
        res.render('editbook', {results: book});
    });
});
*/

// ROUTE: add page
app.get('/add', (req,res) => {
    
    let title = req.query.title;
    Book.update({ title: title}, {title:title,
                                  author: req.query.author,
                                  publisher: req.query.publisher,
                                  pubdate: req.params.pubdate,
                                  isbn: req.query.isbn,
                                  volumes: req.query.volumes
                                 }, {upsert: true },
                (err, result) => {
        if (err) return next(err);
        let addresult = result;
      
        Book.count((err, total) => {
            res.type(TEXT_HTML);
            res.render('add', {title: req.query.title, result: addresult, total: total.toString() } );    
        });

    });
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

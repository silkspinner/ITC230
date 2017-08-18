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

const express = require('express'),
    handlebars = require('express-handlebars'),
    _ = require('underscore'),
    cors = require('cors'),
    Book = require('./models/Book.js'),
    app = express();

const LISTEN_PORT = 3000,
    TEXT_PLAIN = 'text/plain',
    TEXT_HTML = 'text/html';

const bodyParser = require('body-parser');

// initialize express configuration
app.set('port', process.env.PORT || LISTEN_PORT);
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


// initialize render engine
app.engine('.html', handlebars({extname: '.html'}));
app.set('view engine', '.html');


// set Access-Control-Allow-Origin header
app.use('/api', require('cors')()); 

// ***** DEFINE ROUTES *****

// ROUTE: home page
app.get('/', (req, res, next) => {
    Book.find({}, function (err, booklist) {
        if (err) return next(err);
        booklist = _.sortBy(booklist, 'title');
        console.log(booklist);
        res.render('home', {booklist: JSON.stringify(booklist)}); 
    });
});

// ROUTE: about page
app.get('/about', (req, res, next) => {
    Book.find({}, function (err, booklist) {
        if (err) return next(err);
        booklist = _.sortBy(booklist, 'title');
        console.log(booklist);
        res.render('about', {booklist: JSON.stringify(booklist)}); 
    });
});

// ROUTE: API getall
app.get('/api/getall', (req, res, next) => {
    Book.find({}, function (err, booklist) {
        if (err) {
            res.json(err);           
        } else {
            booklist = _.sortBy(booklist, 'title');
            res.json(booklist);
        }
    });
});

// ROUTE: API detail
app.get('/api/detail', (req, res, next) => {
    var find_regex = new RegExp( req.query.searchtext, "i");
    Book.find({"title": {$regex:find_regex }}, function (err, booklist) {
        if (err) {
            res.json(err);           
        } else {
            booklist = _.sortBy(booklist, 'title');
            res.json(booklist);
        }
    });
});

// ROUTE: API delete
app.get('/api/delete/:id', (req, res, next) => {
    Book.remove({"_id":req.params.id }, (err, result) => {
        if (err) return next(err);
        // return # of items deleted
        res.json({"deleted": result.result.n});
    });
});

// ROUTE: API add
app.post('/api/add/', (req, res, next) => {
    // if new book then instantiate new Book and save  

    if (!req.body._id) { // insert new document
       
        let book = new Book({title:req.body.title,
                            author: req.body.author,
                            publisher: req.body.publisher,
                            pubdate: req.body.pubdate,
                            isbn: req.body.isbn,
                            volumes: req.body.volumes
                            });
        book.save((err, newBook) => {
            if (err) return next(err);
            res.json({updated: 0, _id: newBook._id});
        });
    } else { // update existing book
        Book.updateOne({ _id: req.body._id},
                       {title:req.body.title,
                        author: req.body.author,
                        publisher: req.body.publisher,
                        pubdate: req.body.pubdate,
                        isbn: req.body.isbn,
                        volumes: req.body.volumes
                         }, (err, result) => {
            if (err) return next(err);
            res.json({updated: result.nModified, _id: req.body._id});
        });
    }    
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

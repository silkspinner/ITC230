/* Mongoose data model for Book object
 *
 */
let mongoose = require('mongoose'),
    credentials = require('../lib/credentials.js');

var conn = mongoose.connection; 
conn.on('error', console.error.bind(console, 'connection error:'));

// define Book model in JSON key/value pairs
// values indicate the data type of each key
var mySchema = mongoose.Schema({
    title: { type: String, required: true },
    author: String,
    publisher: String,
    pubdate: Date,
    isbn: String,
    volumes: Number
}); 

module.exports = mongoose.model('Book', mySchema);
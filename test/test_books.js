/**
 * test_books.js - mocha test suite for books objects
 *
 * JavaScript version XX
 *
 * @author     Ron Nims <rleenims@gmail.com>
 * @copyright  2017 Ron Nims
 */

'use strict';
let expect = require('chai').expect,
    books = require('../lib/books');

let booksCount = 0;

beforeEach(function() {
  booksCount = parseInt(books.count());
});


describe('Books module', () => {
    
    //test books.get function
    it('returns requested book', function() {
        var result = books.get('Dragonflight');
        expect(result[0]).to.deep.equal({title: 'Dragonflight',
            author: 'Anne McCaffrey',
            publisher: 'Del Rey Books/Ballantine Books',
            year: '1978',
            isbn: '034527749X',
            volumes: 1});
    });

    it('fails with invalid book', () => {
        var result = books.get('JXJ4XJD6SJ23VEF75ZZ');
        expect(result.length > 0).to.equal(false);     

    });
    
    //test books.add function
    it('adds new book successfully', function() {
        var result = books.add({
            title: 'A Great New Book',
            author: 'Great Author'
        });

        expect(parseInt(books.count())).to.equal(booksCount+1);
    });
    
    it('fails to add if book exists', () => {
        var result = books.add({
            title: 'Dragonflight',
            author: 'Anne McCaffrey'
        });

        expect(parseInt(books.count())).to.equal(booksCount);  

    });
    
    //test books.delete function
    it('deletes requested book', function() {
        var result = books.delete('Dragonflight');
        expect(parseInt(books.count())).to.equal(booksCount-1);
    });

    it('fails to delete with invalid book', () => {
        var result = books.delete('JXJXJDSJVEFZZ');
        expect(parseInt(books.count())).to.equal(booksCount);     

    });

});

/**
 * books.js - node.js module for book objects
 *
 * JavaScript version XX
 *
 * @author     Ron Nims <rleenims@gmail.com>
 * @copyright  2017 Ron Nims
 */

var books = [
    {   title: 'The Princess Bride',
        author: 'William Goldman',
        publisher: 'Harcourt Brace Jovanovich',
        year: '1973',
        isbn: '0-345-41826-3',
        volumes: 1
    },
    
    {   title: 'The Chronicles of Amber',
        author: 'Roger Zelazny',
        publisher: 'Nelson Doubleday',
        year: '1972',
        isbn: '1568650019',
        volumes: 2
    },
    
    {   title: 'Jhereg',
        author: 'Steven Brust',
        publisher: 'Ace',
        year: '1987',
        isbn: '0441385540',
        volumes: 1
    },
    
    {   title: 'The Lord of the Rings',
        author: 'J.R.R. Tolkien',
        publisher: 'Ballantine',
        year: '1965',
        isbn: '0345240324',
        volumes: 3
    },
    
    {   title: 'Jonathon Livingston Seagull, a Story',
        author: 'Richard Bach',
        publisher: 'Avon',
        year: '1970',
        isbn: '0684846845',
        volumes: 1
    },
    
    {   title: 'The Farseer Trilogy',
        author: 'Robin Hobb',
        publisher: 'Spectra',
        year: '1996',
        isbn: '055357339X',
        volumes: 3
    },
    
    {   title: 'Enders Game',
        author: 'Orson Scott Card',
        publisher: 'Tor Science Fiction',
        year: '1991',
        isbn: '0812550706',
        volumes: 1
    },
    
    {   title: 'Dragonflight',
        author: 'Anne McCaffrey',
        publisher: 'Del Rey Books/Ballantine Books',
        year: '1978',
        isbn: '034527749X',
        volumes: 1
    },
    
    {   title: 'A Wizard of Earthsea',
        author: 'Marion Zimmer Bradley',
        publisher: 'Parnassus Press',
        year: '1968',
        isbn: '0395276535',
        volumes: 1
    },
    
    {   title: 'The Winds of Darkover',
        author: 'William Goldman',
        publisher: 'Ace Books',
        year: '1970',
        isbn: '044189254X',
        volumes: 1
    }
];

/**
 * Return a count of books as string
 * @return string
 */
exports.count = function () {
    var results = books.length;                      
    return results.toString();
};

/**
 * Return a sorted list of books
 * by Title Ascending
 * @return array
 */
exports.byTitleAsc = function () {
    var results = books.sort(function (book1, book2) {
        if (book1.title.toLowerCase() < book2.title.toLowerCase()) {
            return -1;
        } else {
            return 1;
        }                       
    });
    return results;
};

/**
 * Return a sorted list of books
 * that have searchText in their title
 * by Title Ascending
 * @param string searchText = text to search for in book title
 * @return array
 */
exports.get = function (searchText) {
    var results = books.filter((book) => {
        return book.title.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
    });
    return results;
};

/**
 * Delete any book whose title matches searchText
 * @param string searchText = text to search for in book title
 * @return string
 */
exports.delete = function (searchText) {
    const START_LENGTH = books.length;
    let newBooks = books.filter((book) => {
        return (book.title.toLowerCase() != searchText.toLowerCase());
    });
    books = newBooks;
    var results = searchText;
    if (START_LENGTH > books.length) {
        results += ' removed, ';   
    } else {
        results += ' NOT removed, ';   
    }
    results += books.length.toString() + ' total books remaining';
    return (results);
};

/**
 * Add a new book
 * Must have at least title param
 * Do not add if matching title exists
 * @param object params
 * @return string
 */
exports.add = function (params) {
    var match = false;   
    books.forEach( (book) => 
    {
        if (book.title.toLowerCase() === params.title.toLowerCase()) {
            match = true;
        }
    });
    
    var results = params.title; 
    if (!match) {
        var addedBook = {
            title: params.title     
        };
        (params.author) ? addedBook.author = params.author : addedBook.author = '';
        (params.publisher) ? addedBook.publisher = params.publisher : addedBook.publisher = '';
        (params.year) ? addedBook.year = params.year : addedBook.year = '';
        (params.isbn) ? addedBook.isbn = params.isbn : addedBook.isbn = '';
        (params.volumes) ? addedBook.volumes = params.volumes : addedBook.volumes = '1';

        books.push(addedBook);
        results += ' added , ';   
    } else {
        results += ' NOT added, ';   
    }
    results += books.length.toString() + ' total books';
    return (results);
};
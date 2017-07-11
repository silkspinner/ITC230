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
 * Return a sorted list of books
 * by Title Ascending
 * @return array
 */
exports.byTitleAsc = function () {
    return books.sort(function (book1, book2) {
       if (book1.title.toLowerCase() < book2.title.toLowerCase()) {
            return -1;
        } else {
            return 1;
        };                       
    });
}

/**
 * Return a sorted list of books
 * that have searchText in their title
 * by Title Ascending
 * @param string searchText = text to search for in book title
 * @return array
 */
exports.get = function (searchText) {
    var bookList = books.filter((book) => {
        return book.title.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
    });
    return bookList
}

/**
 * Delete any book whose title matches searchText
 * @param string searchText = text to search for in book title
 * @return object
 */
exports.delete = function (searchText) {
    const START_LENGTH = books.length;
    let newBooks = books.filter((book) => {
        return (book.title.toLowerCase() != searchText.toLowerCase());
    });
    books = newBooks;
    results = searchText;
    if (START_LENGTH > books.length) {
        results += ' removed, ';   
    } else {
        results += ' NOT removed, ';   
    }
    results += books.length.toString() + ' total books'
    return (results);
}
const express = require('express'); // Include Express module.

const bodyParser = require('body-parser'); // Include body-parser module.

const mysql = require('mysql'); // Include MySQL module.

const cors = require('cors'); // Include CORS module.

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

const mySqlConnection = mysql.createConnection({ // Create the connection variable with the required details.
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'BookShop',
    multipleStatements: true
});

mySqlConnection.connect((error) => { // Database connection.
    if (!error) {
        console.log('[Books_Table] The connection to the database is successful!');
    } else {
        console.log('[Books_Table] Failed to connect to the database. \n Error: ' + JSON.stringify(error, undefined, 2));
    }
});

app.post('/create', (req, res) => { // Create a new book in the database.
    let book = req.body;
    mySqlConnection.query('INSERT INTO Books (`BookID`, `UserID`, `ISBN`, `BookCover`, `BookTitle`, `BookAuthor`, `BookGenreID`, `PublicationYear`, `BookOverview`, `Quantity`, `Price`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);', [book.BookID, book.UserID, book.ISBN, book.BookCover, book.BookTitle, book.BookAuthor, book.BookGenreID, book.PublicationYear, book.BookOverview, book.Quantity, book.Price], (error, results, fields) => {
        if (!error) {
            res.send('Created successfully!');
        } else {
            return res.status(400).send({
                message: error
            });
        }
    });
});

app.get('/', (req, res) => { // Get all books from the database.
    mySqlConnection.query('SELECT Books.BookID, Books.UserID, Users.Name, Users.Surname, Users.AdminRole, Books.ISBN, Books.BookCover, Books.BookTitle, Books.BookAuthor, Books.BookGenreID, BookGenres.BookGenre, Books.PublicationYear, Books.BookOverview, Books.Quantity, Books.Price FROM Books INNER JOIN BookGenres ON Books.BookGenreID = BookGenres.BookGenreID INNER JOIN Users ON Books.UserID = Users.UserID;', (error, results, fields) => {
        if (!error) {
            res.send(results);
        } else {
            return res.status(400).send({
                message: error
            });
        }
    });
});

app.get('/:id', (req, res) => { // Get book by ID from the database.
    mySqlConnection.query('SELECT Books.BookID, Books.UserID, Users.Name, Users.Surname, Books.ISBN, Books.BookCover, Books.BookTitle, Books.BookAuthor, Books.BookGenreID, BookGenres.BookGenre, Books.PublicationYear, Books.BookOverview, Books.Quantity, Books.Price FROM Books INNER JOIN BookGenres ON Books.BookGenreID = BookGenres.BookGenreID INNER JOIN Users ON Books.UserID = Users.UserID WHERE Books.BookID = ?;', [req.params.id], (error, results, fields) => {
        if (!error) {
            res.send(results);
        } else {
            return res.status(400).send({
                message: error
            });
        }
    });
});

app.get('/customer/:id', (req, res) => { // Get book by customer ID from the database.
    mySqlConnection.query('SELECT Books.BookID, Books.UserID, Users.Name, Users.Surname, Books.ISBN, Books.BookCover, Books.BookTitle, Books.BookAuthor, Books.BookGenreID, BookGenres.BookGenre, Books.PublicationYear, Books.BookOverview, Books.Quantity, Books.Price FROM Books INNER JOIN BookGenres ON Books.BookGenreID = BookGenres.BookGenreID INNER JOIN Users ON Books.UserID = Users.UserID WHERE Books.UserID = ?;', [req.params.id], (error, results, fields) => {
        if (!error) {
            res.send(results);
        } else {
            return res.status(400).send({
                message: error
            });
        }
    });
});

app.put('/update', (req, res) => { // Update book by ID in the database.
    let book = req.body;
    mySqlConnection.query('UPDATE Books SET Books.UserID = ?, Books.ISBN = ?, Books.BookCover = ?, Books.BookTitle = ?, Books.BookAuthor = ?, Books.BookGenreID = ?, Books.PublicationYear = ?, Books.BookOverview = ?, Books.Quantity = ?, Books.Price = ? WHERE Books.BookID = ?', [book.UserID, book.ISBN, book.BookCover, book.BookTitle, book.BookAuthor, book.BookGenreID, book.PublicationYear, book.BookOverview, book.Quantity, book.Price, book.BookID], (error, results, fields) => {
        if (!error) {
            res.send('Updated successfully!');
        } else {
            return res.status(400).send({
                message: error
            });
        }
    });
});

app.delete('/delete/:id', (req, res) => { // Delete book by ID from the database.
    mySqlConnection.query('DELETE FROM Books WHERE Books.BookID = ?;', [req.params.id], (error, results, fields) => {
        if (!error) {
            res.send('Deleted successfully!');
        } else {
            return res.status(400).send({
                message: error
            });
        }
    });
});

module.exports = app; // Export app object with CRUD functions.
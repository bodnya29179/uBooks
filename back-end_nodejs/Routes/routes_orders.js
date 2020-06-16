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
        console.log('[Orders_Table] The connection to the database is successful!');
    } else {
        console.log('[Orders_Table] Failed to connect to the database. \n Error: ' + JSON.stringify(error, undefined, 2));
    }
});

app.post('/create', (req, res) => { // Create a new order in the database.
    let order = req.body;
    mySqlConnection.query('INSERT INTO Orders (`OrderID`, `UserID`, `BookID`, `Quantity`, `OrderDate`, `OrderStatus`) VALUES (?, ?, ?, ?, ?, ?);', [order.OrderID, order.UserID, order.BookID, order.Quantity, order.OrderDate, order.OrderStatus], (error, results, fields) => {
        if (!error) {
            res.send('Created successfully!');
        } else {
            return res.status(400).send({
                message: error
            });
        }
    });
});

app.get('/', (req, res) => { // Get all orders from the database.
    mySqlConnection.query('SELECT Orders.OrderID, Orders.UserID, Users.Name, Users.Surname, Users.Email, Customers.CountryID, Countries.CountryName, Countries.CountryCode, Customers.PhoneNumber, Orders.BookID, Books.ISBN, Books.BookTitle, Books.BookAuthor, Books.PublicationYear, Books.Price, Orders.Quantity, Orders.OrderDate, Orders.OrderStatus FROM Orders INNER JOIN Users ON Orders.UserID = Users.UserID INNER JOIN Customers ON Users.UserID = Customers.UserID INNER JOIN Countries ON Customers.CountryID = Countries.CountryID INNER JOIN Books ON Orders.BookID = Books.BookID;', (error, results, fields) => {
        if (!error) {
            res.send(results);
        } else {
            return res.status(400).send({
                message: error
            });
        }
    });
});

app.get('/:id', (req, res) => { // Get order by ID from the database.
    mySqlConnection.query('SELECT Orders.OrderID, Orders.UserID, Users.Name, Users.Surname, Users.Email, Customers.CountryID, Countries.CountryName, Countries.CountryCode, Customers.PhoneNumber, Orders.BookID, Books.ISBN, Books.BookTitle, Books.BookAuthor, Books.PublicationYear, Books.Price, Orders.Quantity, Orders.OrderDate, Orders.OrderStatus FROM Orders INNER JOIN Users ON Orders.UserID = Users.UserID INNER JOIN Customers ON Users.UserID = Customers.UserID INNER JOIN Countries ON Customers.CountryID = Countries.CountryID INNER JOIN Books ON Orders.BookID = Books.BookID WHERE Orders.OrderID = ?;', [req.params.id], (error, results, fields) => {
        if (!error) {
            res.send(results);
        } else {
            return res.status(400).send({
                message: error
            });
        }
    });
});

app.get('/full/order/:id', (req, res) => { // Get full order info for customer by ID from the database.
    mySqlConnection.query("SELECT Orders.OrderID, Orders.UserID, Orders.BookID, Books.BookCover, Books.ISBN, Books.BookTitle, Books.BookAuthor, BookGenres.BookGenre, Books.PublicationYear, Books.Price, Orders.Quantity, SUM(Books.Price*Orders.Quantity) AS 'TotalPrice', Orders.OrderDate, Orders.OrderStatus FROM Orders INNER JOIN Users ON Orders.UserID = Users.UserID INNER JOIN Books ON Orders.BookID = Books.BookID INNER JOIN bookgenres ON Books.BookGenreID = BookGenres.BookGenreID WHERE Orders.UserID = ? GROUP BY Orders.OrderID, Orders.UserID, Books.ISBN, Books.BookTitle, Books.BookAuthor, Books.PublicationYear, Books.Price, Orders.Quantity, Orders.OrderDate, Orders.OrderStatus;", [req.params.id], (error, results, fields) => {
        if (!error) {
            res.send(results);
        } else {
            return res.status(400).send({
                message: error
            });
        }
    });
});

app.get('/full/orders', (req, res) => { // Get full orders info for customers from the database.
    mySqlConnection.query("SELECT Orders.OrderID, Orders.UserID, Users.Name, Users.Surname, Users.Email, Countries.CountryCode, Customers.PhoneNumber, Orders.BookID, Books.BookCover, Books.ISBN, Books.BookTitle, Books.BookAuthor, BookGenres.BookGenre, Books.PublicationYear, Books.Price, Orders.Quantity, SUM(Books.Price*Orders.Quantity) AS 'TotalPrice', Orders.OrderDate, Orders.OrderStatus FROM Orders INNER JOIN Users ON Orders.UserID = Users.UserID INNER JOIN Books ON Orders.BookID = Books.BookID INNER JOIN bookgenres ON Books.BookGenreID = BookGenres.BookGenreID INNER JOIN Customers ON Customers.UserID = Users.UserID INNER JOIN Countries ON Customers.CountryID = Countries.CountryID GROUP BY Orders.OrderID, Orders.UserID, Books.ISBN, Books.BookTitle, Books.BookAuthor, Books.PublicationYear, Books.Price, Orders.Quantity, Orders.OrderDate, Orders.OrderStatus;", [req.params.id], (error, results, fields) => {
        if (!error) {
            res.send(results);
        } else {
            return res.status(400).send({
                message: error
            });
        }
    });
});

app.put('/update', (req, res) => { // Update order details by ID in the database. [Changing the order date is not possible. This is a business rule.]
    let order = req.body;
    mySqlConnection.query('UPDATE Orders SET Orders.BookID = ?, Orders.Quantity = ?, Orders.OrderStatus = ? WHERE Orders.OrderID = ?', [order.BookID, order.Quantity, order.OrderStatus, order.OrderID], (error, results, fields) => {
        if (!error) {
            res.send('Updated successfully!');
        } else {
            return res.status(400).send({
                message: error
            });
        }
    });
});

app.put('/update/status', (req, res) => { // Update order status in the database.
    let status = req.body;
    mySqlConnection.query('UPDATE Orders SET OrderStatus = ? WHERE OrderID = ?;', [status.OrderStatus, status.OrderID], (error, results, fields) => {
        if (!error) {
            res.send('Updated successfully!');
        } else {
            return res.status(400).send({
                message: error
            });
        }
    });
});

module.exports = app; // Export app object with CRUD functions.
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
        console.log('[Customers_Table] The connection to the database is successful!');
    } else {
        console.log('[Customers_Table] Failed to connect to the database. \n Error: ' + JSON.stringify(error, undefined, 2));
    }
});

app.post('/create', (req, res) => { // Create a new customer in the database. Using Stored Procedure.
    let customer = req.body;
    mySqlConnection.query('INSERT INTO Users (`UserID`, `Name`, `Surname`, `Email`, `Password`, `AdminRole`) VALUES (?, ?, ?, ?, ?, 0);', [customer.UserID, customer.Name, customer.Surname, customer.Email, customer.Password]);
    mySqlConnection.query('INSERT INTO Customers (`UserID`, `CountryID`, `PhoneNumber`, `CardNumber`) VALUES (?, ?, ?, ?);', [customer.UserID, customer.CountryID, customer.PhoneNumber, customer.CardNumber]);
});

app.get('/', (req, res) => { // Get all customers from the database.
    mySqlConnection.query('SELECT Users.UserID, Users.Name, Users.Surname, Users.Email, Users.Password, Countries.CountryID, Countries.CountryName, Countries.CountryCode, Customers.PhoneNumber, Customers.CardNumber, Users.AdminRole FROM Users INNER JOIN Customers ON Users.UserID = Customers.UserID INNER JOIN Countries ON Customers.CountryID = Countries.CountryID WHERE Users.AdminRole = 0;', (error, results, fields) => {
        if (!error) {
            res.send(results);
        } else {
            return res.status(400).send({
                message: error
            });
        }
    });
});

app.get('/:id', (req, res) => { // Get customer by ID from the database.
    mySqlConnection.query('SELECT Users.UserID, Users.Name, Users.Surname, Users.Email, Users.Password, Countries.CountryID, Countries.CountryName, Countries.CountryCode, Customers.PhoneNumber, Customers.CardNumber, Users.AdminRole FROM Users INNER JOIN Customers ON Users.UserID = Customers.UserID INNER JOIN Countries ON Customers.CountryID = Countries.CountryID WHERE Users.UserID = ?;', [req.params.id], (error, results, fields) => {
        if (!error) {
            res.send(results);
        } else {
            return res.status(400).send({
                message: error
            });
        }
    });
});

app.put('/update', (req, res) => { // Update customer by ID in the database.
    let customer = req.body;
    mySqlConnection.query('UPDATE Users SET Users.Name = ?, Users.Surname = ?, Users.Email = ?, Users.Password = ? WHERE UserID = ?; UPDATE Customers SET Customers.CountryID = ?, Customers.PhoneNumber = ?, Customers.CardNumber = ? WHERE Customers.UserID = ?;', [customer.Name, customer.Surname, customer.Email, customer.Password, customer.UserID, customer.CountryID, customer.PhoneNumber, customer.CardNumber, customer.UserID], (error, results, fields) => {
        if (!error) {
            res.send('Updated successfully!');
        } else {
            return res.status(400).send({
                message: error
            });
        }
    });
});

app.delete('/delete/:id', (req, res) => { // Delete customer by ID from the database. The Users table has a cascading relationship with the Customers table.
    mySqlConnection.query('DELETE FROM Users WHERE Users.UserID = ?;', [req.params.id], (error, results, fields) => {
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
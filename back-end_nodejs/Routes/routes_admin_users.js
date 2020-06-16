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
        console.log('[AdminUsers_Table] The connection to the database is successful!');
    } else {
        console.log('[AdminUsers_Table] Failed to connect to the database. \n Error: ' + JSON.stringify(error, undefined, 2));
    }
});

app.post('/create', (req, res) => { // Create a new admin user in the database.
    let admin = req.body;
    mySqlConnection.query("INSERT INTO Users (`UserID`, `Name`, `Surname`, `Email`, `Password`, `AdminRole`) VALUES (?, ?, ?, ?, ?, 1);", [admin.UserID, admin.Name, admin.Surname, admin.Email, admin.Password], (error, results, fields) => {
        if (!error) {
            res.send('Created successfully!');
        } else {
            return res.status(400).send({
                message: error
            });
        }
    });
});

app.get('/', (req, res) => { // Get all admin users from the database.
    mySqlConnection.query('SELECT Users.UserID, Users.Name, Users.Surname, Users.Email, Users.Password, Users.AdminRole FROM Users WHERE Users.AdminRole = 1;', (error, results, fields) => {
        if (!error) {
            res.send(results);
        } else {
            return res.status(400).send({
                message: error
            });
        }
    });
});

app.get('/:id', (req, res) => { // Get admin user by ID from the database.
    mySqlConnection.query('SELECT Users.UserID, Users.Name, Users.Surname, Users.Email, Users.Password, Users.AdminRole FROM Users WHERE Users.AdminRole = 1 AND Users.UserID = ?;', [req.params.id], (error, results, fields) => {
        if (!error) {
            res.send(results);
        } else {
            return res.status(400).send({
                message: error
            });
        }
    });
});

app.put('/update', (req, res) => { // Update admin user by ID in the database.
    let admin = req.body;
    mySqlConnection.query('UPDATE Users SET Users.Name = ?, Users.Surname = ?, Users.Email = ?, Users.Password = ? WHERE Users.UserID = ?;', [admin.Name, admin.Surname, admin.Email, admin.Password, admin.UserID], (error, results, fields) => {
        if (!error) {
            res.send('Updated successfully!');
        } else {
            return res.status(400).send({
                message: error
            });
        }
    });
});

app.delete('/delete/:id', (req, res) => { // Delete admin user by ID from the database.
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
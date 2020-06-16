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
        console.log('[BookGenres_Table] The connection to the database is successful!');
    } else {
        console.log('[BookGenres_Table] Failed to connect to the database. \n Error: ' + JSON.stringify(error, undefined, 2));
    }
});

app.post('/create', (req, res) => { // Create a new book genre in the database.
    let genre = req.body;
    mySqlConnection.query('INSERT INTO BookGenres (`BookGenreID`, `BookGenre`) VALUES (?, ?);', [genre.BookGenreID, genre.BookGenre], (error, results, fields) => {
        if (!error) {
            res.send('Created successfully!');
        } else {
            return res.status(400).send({
                message: error
            });
        }
    });
});

app.get('/', (req, res) => { // Get all book genres from the database.
    mySqlConnection.query('SELECT * FROM BookGenres;', (error, results, fields) => {
        if (!error) {
            res.send(results);
        } else {
            return res.status(400).send({
                message: error
            });
        }
    });
});

app.get('/:id', (req, res) => { // Get book genre by ID from the database.
    mySqlConnection.query('SELECT * FROM BookGenres WHERE BookGenres.BookGenreID = ?;', [req.params.id], (error, results, fields) => {
        if (!error) {
            res.send(results);
        } else {
            return res.status(400).send({
                message: error
            });
        }
    });
});

app.put('/update', (req, res) => { // Update book genre by ID in the database.
    let genre = req.body;
    mySqlConnection.query('UPDATE BookGenres SET BookGenres.BookGenre = ? WHERE BookGenres.BookGenreID = ?;', [genre.BookGenre, genre.BookGenreID], (error, results, fields) => {
        if (!error) {
            res.send('Updated successfully!');
        } else {
            return res.status(400).send({
                message: error
            });
        }
    });
});

app.delete('/delete/:id', (req, res) => { // Delete book genre by ID from the database.
    mySqlConnection.query('DELETE FROM BookGenres WHERE BookGenres.BookGenreID = ?;', [req.params.id], (error, results, fields) => {
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
/**
 * Creates a NodeJS server using ExpressJS to host the web page.
 */
const express = require('express')
const app = express()
const port = 3000

app.set("port", port);
app.use(express.static(__dirname + '/public')); // allows for static files (images, CSS, etc.) to load properly

// default home page
app.get("/", (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

// enables connection to database
var mysql = require("./dbcon.js");

// SQL query that returns the distinct cohorts
app.get("/cohorts", function(req, res, next) {
    mysql.connection.query("SELECT DISTINCT cohort FROM cohorts ORDER BY cohort", function(err, rows, fields) {
        if (err) {
            next(err);
            return;
        }
        res.type("application/json");
        res.send(rows);
    });
});

// SQL query that does a general search
app.get("/create", function(req, res, next) {
    mysql.connection.query("SELECT * FROM cohorts", function(err, rows, fields) {
        if (err) {
            next(err);
            return;
        }
        res.type("application/json");
        res.send(rows);
    });
});

// SQL query that accepts GET request containing: list of cohorts, what column to order by, and sort order
app.get("/search", function(req, res, next) {
    // typical SQL queries can use "?" placeholders (e.g., SELECT ? FROM cohorts, [req.query.col, ...]) to prevent SQL injections
    // but unknown interaction with "req.query.cohorts" causes error and failure to execute query
    mysql.connection.query("SELECT * FROM cohorts WHERE cohort IN " + req.query.cohorts + " ORDER BY " + req.query.order + " " + req.query.sort, 
    function(err, rows, fields) {
        if (err) {
            next(err);
            return;
        }
        res.type("application/json");
        res.send(rows);
    })
});

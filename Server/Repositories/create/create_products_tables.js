const mysql = require('mysql2');
const tables = require('../defenition/products_tables_defenition');
const path = require('path');
const dotenv = require('dotenv');
const envFilePath = path.resolve(__dirname, '../../.env');
dotenv.config({ path: envFilePath });

const pool = mysql.createPool({
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    port: process.env.SQL_PORT,
    database: process.env.DATABASE
});


pool.getConnection((err, connection) => {
    if (err) console.log(err);
    connection.query(tables.cars, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log('cars table created successfully');
            connection.release();
            pool.end();
        }
    });
});

pool.getConnection((err, connection) => {
    if (err) console.log(err);
    connection.query(tables.furniture, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log('furniture table created successfully');
            connection.release();
            pool.end();
        }
    });
});

pool.getConnection((err, connection) => {
    if (err) console.log(err);
    connection.query(tables.appliances, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log('appliances table created successfully');
            connection.release();
            pool.end();
        }
    });
});

pool.getConnection((err, connection) => {
    if (err) console.log(err);
    connection.query(tables.animals, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log('animals table created successfully');
            connection.release();
            pool.end();
        }
    });
});


pool.getConnection((err, connection) => {
    if (err) console.log(err);
    connection.query(tables.companies, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log('companies table created successfully');
            connection.release();
            pool.end();
        }
    });
});
pool.getConnection((err, connection) => {
    if (err) console.log(err);
    connection.query(tables.businesses, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log('businesses table created successfully');
            connection.release();
            pool.end();
        }
    });
});

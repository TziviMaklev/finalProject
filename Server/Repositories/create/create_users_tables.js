const mysql = require('mysql2');
const tables = require('../defenition/users_tables_defenition');
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

//bnpkl
// pool.getConnection((err, connection) => {
//     if (err) console.log(err);
//     connection.query(tables.passwords, (err) => {
//         if (err) {
//             console.log(err);
//         }
//         else {
//             console.log('passwords table created successfully');
//             connection.release();
//             pool.end();
//         }
//     });
// });

pool.getConnection((err, connection) => {
    if (err) console.log(err);
    connection.query(tables.user_info, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log('user_info table created successfully');
            connection.release();
            pool.end();
        }
    });
});

pool.getConnection((err, connection) => {
    if (err) console.log(err);
    connection.query(tables.reserved_ads, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log('reserved_ads table created successfully');
            connection.release();
            pool.end();
        }
    });
});

pool.getConnection((err, connection) => {
    if (err) console.log(err);
    connection.query(tables.user_messages, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log('user_messages table created successfully');
            connection.release();
            pool.end();
        }
    });
});

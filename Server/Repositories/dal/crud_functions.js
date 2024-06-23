const mysql = require('mysql2');
const crudQuery = require('./crud_querys');
// const arrDetailsToQuery = require('./get_details_arr_to_query');

const path = require('path');
const dotenv = require('dotenv');
const envFilePath = path.resolve(__dirname, '../../.env');
dotenv.config({ path: envFilePath });

var connection = mysql.createConnection({
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    port: process.env.SQL_PORT,
    database: process.env.DATABASE,
    host : process.env.SQL_HOST
});

// Create
async function create(type, details) {
    const sql = crudQuery.createQuery(type);
    // const arr = arrDetailsToQuery.getDetailsInArr(type, details);
    try {
        // const connection = pool.getConnection();
        const result = await connection.promise().query(sql, details, async (err, result) => {
            if (err) {
                console.log(err);
            } 
            else {
                return  crudQuery.getQuery("getUserInfo"  , result.insertId);
            }
        });
        // connection.release();
        // connection.end();
        return result;
    } catch (error) {
        throw new Error(error);
    }
}




// Read
async function getAll(type, details) {
    const sql = crudQuery.getAllQuery(type, details);
    const arr = arrDetailsToQuery.getDetailsInArr(type, details);
    try {
        const connection = pool.getConnection();
        const result = await connection.query(sql, arr);
        connection.release();
        pool.end();
        return result;
    } catch (error) {
        throw new Error(error);
    }
};

async function get(type, details) {
    const sql = crudQuery.getQuery(type);
    // const arr = arrDetailsToQuery.getDetailsInArr(type, details);
    try {
        const connection = pool.getConnection();
        const result = await connection.query(sql, details);
        connection.release();
        pool.end();
        return result;
    } catch (error) {
        throw new Error(error);
    }
};

// Update
async function update(type, details) {
    const sql = crudQuery.updateQuery(type);
    const arr = arrDetailsToQuery.getDetailsInArr(type, details);
    try {
        const connection = pool.getConnection();
        const result = await connection.query(sql, arr);
        connection.release();
        pool.end();
        return result;
    } catch (error) {
        throw new Error(error);
    }
};

// Delete
async function delete_(type, details) {
    const sql = crudQuery.deleteQuery(type);
    const arr = arrDetailsToQuery.getDetailsInArr(type, details);
    try {
        const connection = pool.getConnection();
        const result = await connection.query(sql, arr);
        connection.release();
        pool.end();
        return result;
    } catch (error) {
        throw new Error(error);
    }
};

const crudFunctions = {
    create,
    getAll,
    get,
    update,
    delete_,
};

module.exports = crudFunctions;

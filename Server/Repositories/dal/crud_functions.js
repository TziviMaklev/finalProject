const mysql = require('mysql2');
const crudQuery = require('./crud_querys');
const path = require('path');
const dotenv = require('dotenv');
const envFilePath = path.resolve(__dirname, '../../.env');
dotenv.config({ path: envFilePath });


const pool = {
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    port: process.env.SQL_PORT,
    database: process.env.DATABASE
};
// Create
async function getNextId(type) {
    const sql = crudQuery.getQuery(type);
    const connection = mysql.createConnection(pool).promise();
    try {
        const result = await connection.query(sql);
        console.log("nextID", result[0][0].max_id + 1);
        const nextId = result[0][0].max_id + 1;
        return nextId;
    }
    catch (error) {
        throw new Error(error);
    }
}

async function create(type, details) {
    const sql = crudQuery.createQuery(type);
    const connection = mysql.createConnection(pool).promise();
    let result;
    try {
        result = connection.query(sql, details, (err, result) => {
            if (err) {
                console.error('שגיאה בהוספת רשומה:', err);
            } else {
                if (result.affectedRows > 0) {
                    console.log('רשומה חדשה נוספה בהצלחה. מזהה הרשומה:', result.insertId);
                    return result.insertId;
                } else {
                    console.log('לא נוספו רשומות חדשות.');
                }
            }
        });
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    } finally {
        connection.end();
    }
}


// Read
async function getAll(type, details) {
    const sql = crudQuery.getAllQuery(type, details);
    const connection = mysql.createConnection(pool).promise();
    let result;
    try {
        result = connection.query(sql, details)
        console.log("result1", result);
        return result;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    } finally {
        connection.end();
    }
};

async function get(type, details) {
    console.log(type, details);
    const sql = crudQuery.getQuery(type); // Assuming crudQuery provides SQL queries 
    const connection = mysql.createConnection(pool).promise();
    let result;
    try {
        result = connection.query(sql, details,
            (err, result) => {
                if (err) {
                    console.error('שגיאה בהוספת רשומה:', err);
                } else {
                    if (result.affectedRows > 0) {
                        console.log('רשומה חדשה נוספה בהצלחה. מזהה הרשומה:', result.insertId);
                        return result.insertId;
                    } else {
                        console.log('לא נוספו רשומות חדשות.');
                    }
                }
            });
        console.log("result2", result);
        return result;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    } finally {
        connection.end();
    }

}


// Update
async function update(type, details) {
    const sql = crudQuery.updateQuery(type);
    const connection = mysql.createConnection(pool).promise();
    let result
    try {
        result = await connection.query(sql, details,
            (err, result) => {
                if (err)
                    throw err;
                else {
                    console.log(`Number of rows affected: ${result.affectedRows}`);
                    return result;
                }
            }
        );
        console.log("result", result);
        return result;
    } catch (error) {
        throw new Error(error);
    } finally {
        connection.end();
    }
};

// Delete
async function delete_(type, details) {
    const sql = crudQuery.deleteQuery(type);
    const connection = mysql.createConnection(pool).promise();

    try {
        result = connection.query(sql, details,
            (err, result) => {
                if (err) {
                    console.error('שגיאה בהוספת רשומה:', err);
                } else {
                    if (result.affectedRows > 0) {
                        console.log('רשומה חדשה נוספה בהצלחה. מזהה הרשומה:', result.insertId);
                        return result.insertId;
                    } else {
                        console.log('לא נוספו רשומות חדשות.');
                    }
                }
            });
        console.log("result2", result);
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
    getNextId
};

module.exports = crudFunctions;

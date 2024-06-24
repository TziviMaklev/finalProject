const mysql = require('mysql2');
// const crudQuery = require('./crud_querys');
// const arrDetailsToQuery = require('./get_details_arr_to_query');
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
console.log(pool);
async function dropTable(tableName) {
    console.log(tableName);
    const connection = mysql.createConnection(pool).promise();
    try {
      await connection.query(`DROP TABLE ${tableName}`);
      console.log(`Table ${tableName} dropped successfully.`);
    } catch (error) {
      console.error(`Error dropping table ${tableName}:`, error);
      throw error; // Re-throw the error for global error handling
    } finally {
      connection.end(); // Close the connection
    }
  }
//   dropTable( );
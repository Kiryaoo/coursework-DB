import mysql from 'mysql2';
import dotenv from 'dotenv';


dotenv.config();

export const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

export const connectToDatabase = () => {
    db.connect((err) => {
        if (err) {
            console.error('Error while connecting to data base:', err);
            process.exit(1);
        }
        console.log(' Connected to data base.');
    });
};

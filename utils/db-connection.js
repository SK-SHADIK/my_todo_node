const { DataSource } = require('typeorm');
require('dotenv').config();
const User = require('../models/userModel');
const Category = require('../models/categoryModel');
const Priority = require('../models/priorityModel');
const Status = require('../models/statusModel');
const Task = require('../models/taskModel');

const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.PG_HOST,
    port: parseInt(process.env.PG_PORT, 10),
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
    logging: process.env.TYPEORM_LOGGING === 'true',
    entities: [User, Category, Priority, Status, Task],

});


const initializeDatabase = async () => {
    const maxRetries = 5; // Maximum number of retries
    let retries = 0; // Current retry count

    while (retries < maxRetries) {
        try {
            await AppDataSource.initialize();
            console.log('Connected to PostgreSQL with TypeORM');
            return; // Exit the function if successful
        } catch (error) {
            console.error('PostgreSQL connection error. Please make sure PostgreSQL is running:', error);
            retries += 1; // Increment the retry count
            console.log(`Retrying to connect... (${retries}/${maxRetries})`);
            await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds before retrying
        }
    }

    console.error('Max retries reached. Could not connect to PostgreSQL.');
    process.exit(1); // Exit the process if the database connection fails after retries
};

module.exports = { AppDataSource, initializeDatabase  };
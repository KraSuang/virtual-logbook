// src/config/db.config.js
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

const url = process.env.MONGODB_URI;
const db = process.env.MONGODB_DBN;

console.log(url)

const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        return client.db(db);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}

module.exports = {
    connectToDB
};

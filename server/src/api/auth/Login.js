const express = require('express');
const service = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');  // Add jwt library
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

const url = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DBN;
const jwtSecret = process.env.JWT_SECRET_KEY;  // Add JWT secret

service.use(bodyParser.urlencoded({ extended: true }));
service.use(bodyParser.json());

service.get('', async (req, res) => {
    console.log('Login Start');

    try {
        const { email, password } = req.query;

        if (!email || !password) {
            return res.status(400).json({ message: 'Missing required parameters' });
        }

        const client = new MongoClient(url, { useUnifiedTopology: true });
        await client.connect();

        const db = client.db(dbName);
        const collection = db.collection('users');

        const user = await collection.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Generate an access token with a 14-day expiration
        const accessToken = jwt.sign({ uid: user.uid }, jwtSecret, { expiresIn: '14d' });

        // Close the connection
        await client.close();

        res.status(200).json({ message: 'Login successful', status: 200, uid: user.uid, accessToken });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = service;

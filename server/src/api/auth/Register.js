const express = require('express');
const service = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

const generateUID = require('../../middleware/uidGen.js'); // Replace with the actual path

const url = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DBN;

service.use(bodyParser.urlencoded({ extended: true }));
service.use(bodyParser.json());

// service.post('/', async (req, res) => {
//     console.log('Register Start')

//     try {
//         const { email, password, firstname, lastname, simbriefUID } = req.body;

//         if (await isEmailTaken(email)) {
//             return res.status(400).json({ message: 'Email is already taken' });
//         }

//         // Generate unique UID
//         const uid = await generateUID();

//         // Hash the password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         const client = new MongoClient(url, { useUnifiedTopology: true });
//         await client.connect();

//         const db = client.db(dbName);
//         const collection = db.collection('users');

//         const userDocument = {
//             uid: uid,
//             email,
//             password: hashedPassword,
//             name: {
//                 first: firstname,
//                 last: lastname,
//             },
//             linkID: {
//                 simbrief: simbriefUID,
//             },
//             record: {
//                 flight_time: "",
//                 flightplan_log: "",
//                 latest_flight: "",
//                 fleet: {
//                     first: { icao: "", count: "" },
//                     second: { icao: "", count: "" },
//                     third: { icao: "", count: "" },
//                 },
//             },
//         };

//         await collection.insertOne(userDocument);

//         // Close the connection
//         await client.close();

//         res.status(200).json({ message: 'User registered successfully', status: 200, uid });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

service.get('/', async (req, res) => {
    console.log('Register Start');

    try {
        const { email, password, firstname, lastname, simbriefID } = req.query;

        if (!email || !password || !firstname || !lastname || !simbriefID) {
            return res.status(400).json({ message: 'Missing required parameters' });
        }

        if (await isEmailTaken(email)) {
            return res.status(400).json({ message: 'Email is already taken' });
        }

        // Generate unique UID
        const uid = await generateUID();

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const client = new MongoClient(url, { useUnifiedTopology: true });
        await client.connect();

        const db = client.db(dbName);
        const collection = db.collection('users');

        const userDocument = {
            uid: uid,
            email,
            password: hashedPassword,
            name: {
                first: firstname,
                last: lastname,
            },
            linkID: {
                simbrief: simbriefID,
            },
            record: {
                flight_time: "",
                flightplan_log: "",
                latest_flight: "",
                fleet: {
                    first: { icao: "", count: "" },
                    second: { icao: "", count: "" },
                    third: { icao: "", count: "" },
                },
            },
        };

        await collection.insertOne(userDocument);

        // Close the connection
        await client.close();

        res.status(200).json({ message: 'User registered successfully', status: 200, uid });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

async function isEmailTaken(email) {
    const client = new MongoClient(url, { useUnifiedTopology: true });

    try {
        await client.connect();

        const db = client.db(dbName);
        const collection = db.collection('users');

        const existingUser = await collection.findOne({ email });

        return !!existingUser; // Return true if email exists, false otherwise
    } finally {
        await client.close();
    }
}

module.exports = service;

const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config(); // Replace with the actual path

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DBN;
const colName = process.env.MONGODB_USER_COLLECTION;

async function checkUidInDatabase(uid) {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        const database = client.db(dbName);
        const collection = database.collection(colName);

        console.log(`Checking UID in database: ${JSON.stringify({ "uid": uid })}`);

        const existingUid = await collection.findOne({ uid: uid });

        return !!existingUid; // Return true if UID exists, false otherwise
    } finally {
        await client.close();
    }
}

const usedUIDs = new Set();

async function generateUID() {
    let uid = String(100001); // Initialize counter to start from 100000

    // Check if the UID is already used or exists in the database, regenerate if needed
    while (usedUIDs.has(uid) || await checkUidInDatabase(uid)) {
        uid = String(Number(uid) + 1);
    }

    // Mark the UID as used
    usedUIDs.add(uid);

    console.log(`Generated UID: ${uid}`); // Add logging to see the generated UID

    // You would typically update the database to mark this UID as used
    return uid; // Return an object with the uid property
}

module.exports = generateUID;

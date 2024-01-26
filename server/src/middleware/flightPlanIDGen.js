const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config(); // Replace with the actual path

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DBN;
const colName = process.env.MONGODB_FLIGHTPLAN_COLLECTION;

async function checkFpidInDatabase(fpid) {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        const database = client.db(dbName);
        const collection = database.collection(colName);

        console.log(`Checking UID in database: ${JSON.stringify({ "fpid": fpid })}`);

        const existingFpid = await collection.findOne({ fpid: fpid });

        return !!existingFpid; // Return true if UID exists, false otherwise
    } finally {
        await client.close();
    }
}

const usedFpid = new Set();

async function generateFpid() {
    let fpid = String(100001); // Initialize counter to start from 100000

    // Check if the UID is already used or exists in the database, regenerate if needed
    while (usedFpid.has(fpid) || await checkFpidInDatabase(fpid)) {
        fpid = String(Number(fpid) + 1);
    }

    // Mark the UID as used
    usedFpid.add(fpid);

    console.log(`Generated FPID: ${fpid}`); // Add logging to see the generated UID

    // You would typically update the database to mark this UID as used
    return fpid; // Return an object with the uid property
}

module.exports = generateFpid;

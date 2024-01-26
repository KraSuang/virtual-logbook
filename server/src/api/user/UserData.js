const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

const url = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DBN;

const getUserData = async (req, res) => {
    const userId = req.user.uid;

    const client = new MongoClient(url, { useUnifiedTopology: true });

    try {
        await client.connect();

        const db = client.db(dbName);
        const collection = db.collection('users');

        const user = await collection.findOne({ uid: userId });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const userData = {
            uid: user.uid,
            email: user.email,
            name: {
                first: user.name.first,
                last: user.name.last
            },
            link: {
                simbrief: user.linkID.simbrief
            }
            // ... other user data
        };

        res.json(userData);
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ message: 'Internal server error' });
    } finally {
        await client.close();
    }
};

module.exports = getUserData;

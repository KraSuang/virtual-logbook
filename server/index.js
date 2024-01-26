const express = require('express');
const cors = require('cors')
const vhost = require('vhost');
const dotenv = require('dotenv');
const { connectToDB } = require('./src/config/db.config.js')
const cookieParser = require('cookie-parser');
const axios = require('axios')

const registerRouter = require('./src/api/auth/Register.js');
const loginRouter = require('./src/api/auth/Login.js')
const authMiddleware = require('./src/middleware/authentication.js');
const userRoutes = require('./src/Routes/userRoutes.js')
const flightPlanRoutes = require('./src/Routes/flightPlanRoutes.js')
const apiVer = '/v1'

dotenv.config();

const app = express();
const api = express();
const port = process.env.PORT

app.use(express.json());
app.use(cookieParser());

api.use(`${apiVer}/register`, registerRouter);
api.use(`${apiVer}/login`, loginRouter);
api.use(`${apiVer}/user`, userRoutes);
api.use(`${apiVer}/flightplan`, flightPlanRoutes)

api.get('/fetchData', async (req, res) => {
    try {
        const simbriefUserId = '861686'; // Replace with your SimBrief User ID
        const apiUrl = `https://www.simbrief.com/api/xml.fetcher.php?userid=${simbriefUserId}&json=1`;

        const fpd = await axios.get(apiUrl);

        res.json(fpd.data);
    } catch (error) {
        console.error('Error fetching data:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

api.get(`${apiVer}/access/protection`, authMiddleware, (req, res) => {
    const userId = req.user.uid;
    console.log({ UID: userId })
    res.json({ message: 'Protected API endpoint', status: 200, userId });
});

app.use(cors());
api.use(cors())

app.use(vhost('api.*', api))

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

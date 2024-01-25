const express = require('express');
const cors = require('cors')
const vhost = require('vhost');
const dotenv = require('dotenv');
const { connectToDB } = require('./src/config/db.config.js')
const cookieParser = require('cookie-parser');

const registerRouter = require('./src/api/auth/Register.js');
const loginRouter = require('./src/api/auth/Login.js')
const authMiddleware = require('./src/middleware/authentication.js');


dotenv.config();

const app = express();
const api = express();
const port = process.env.PORT

app.use(express.json());
app.use(cookieParser());

api.use('/register',registerRouter);
api.use('/login', loginRouter);

api.get('/access/protection', authMiddleware, (req, res) => {
    const userId = req.user.uid;
    console.log({ UID: userId})
    res.json({ message: 'Protected API endpoint', status: 200, userId });
});

app.use(cors());
api.use(cors())

app.use(vhost('api.*', api))

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

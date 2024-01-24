const express = require('express');
const cors = require('cors')
const vhost = require('vhost');
const dotenv = require('dotenv');
const { connectToDB } = require('./src/config/db.config.js')


dotenv.config();

const app = express();
const api = express();
const port = process.env.PORT

app.use(cors());

app.use(vhost('api.*', api))

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

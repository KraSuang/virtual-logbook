const express = require('express')
const vhost = require('vhost')
const dotenv = require('dotenv');

dotenv.config();

const app = express()
const api = express()
const port = process.env.PORT

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

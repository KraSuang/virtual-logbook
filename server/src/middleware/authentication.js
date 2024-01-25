const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const secretKey = process.env.JWT_SECRET_KEY

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');

    console.log('Received token:', token);

    if (!token) {
        return res.status(401).json({ message: 'Missing access_token cookie', status: 401 });
    }

    // Remove 'Bearer ' if present
    const tokenWithoutBearer = token.replace('Bearer ', '');

    jwt.verify(tokenWithoutBearer, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token verification failed', status: 403 , error: err.message });
        }

        req.user = user;
        next();
    });
};

module.exports = authenticateToken;

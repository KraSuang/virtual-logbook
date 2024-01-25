const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET_KEY

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');

    console.log('Received token:', token);


    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET);

        // Attach the decoded user information to the request object
        req.user = decoded;

        // Continue to the next middleware or route
        next();
    } catch (error) {
        console.error('Token verification failed:', error.message);
        return res.status(401).json({ message: 'Invalid token.' });
    }
};

module.exports = verifyToken;

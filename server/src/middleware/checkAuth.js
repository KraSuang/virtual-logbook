const jwt = require('jsonwebtoken');

// Assuming you have a JWT string
const token = 'your.jwt.token';

// Decode the token
try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
} catch (error) {
    console.error('Token verification failed:', error.message);
}

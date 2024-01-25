const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');

// Generate multiple random strings using crypto
const randomStrings = Array.from({ length: 10 }, () => crypto.randomBytes(32).toString('hex'));

// Generate multiple random UUIDs using uuid
const randomUUIDs = Array.from({ length: 10 }, () => uuidv4());

// Concatenate all random strings and UUIDs
const combinedSecret = randomStrings.join('') + randomUUIDs.join('');

console.log('Generated JWT Secret:', combinedSecret);

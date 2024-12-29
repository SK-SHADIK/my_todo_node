const crypto = require('crypto');

// Generate a secure random key (32 bytes in length) and convert it to hexadecimal string
const JWT_SECRET_KEY = crypto.randomBytes(32).toString('hex');

module.exports = {
    JWT_SECRET_KEY
};

const jwt = require('jsonwebtoken');
const config = require('../config');

const authenticateJWT = (req, res, next) => {
    const token = req.cookies.auth_token;

    if (!token) {
        return res.redirect('/login'); // Redirect if no token is found
    }

    jwt.verify(token, config.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            return res.redirect('/login'); // Redirect if the token is invalid or expired
        }
        req.user = user;  // Attach the decoded user to the request object
        next();  // Proceed to the next middleware or route handler
    });
};

module.exports = authenticateJWT;

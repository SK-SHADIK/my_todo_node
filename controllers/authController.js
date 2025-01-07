const jwt = require('jsonwebtoken');
const authService = require('../services/authServices');
const LoginDTO = require('../dtos/loginDTO');
const config = require('../config');  // Define a config file with your JWT secret key

class AuthController {
    registrationForm(req, res) {
        res.render('registration', {
            title: 'Registration',
            errors: [], // Initialize as an empty array for no errors
            formData: {} // Initialize as an empty object for no pre-filled data
        });
    }

    loginForm(req, res) {
        res.render('login', {
            title: 'Login',
            errors: [], // Initialize as an empty array for no errors
            formData: {} // Initialize as an empty object for no pre-filled data
        });
    }

    async storeRegistration(req, res) {
        const { name, email, password, confirm_password } = req.body;

        try {
            // Attempt to create the user
            const user = await authService.createUser(name, email, password, confirm_password);
            res.redirect('/login'); // Redirect on success
        } catch (error) {
            // Log and pass errors to the registration view
            console.error('Error creating user:', error);

            // Render the registration form again with error messages
            res.status(400).render('registration', {
                title: 'Registration',
                errors: [error.message], // Send the error message as an array
                formData: { name, email, password, confirm_password }, // Pass the entered data
            });
        }
    }

    async storeLogin(req, res) {
        const loginDTO = new LoginDTO(req.body);
        const errors = loginDTO.validate();

        if (errors.length > 0) {
            return res.status(400).render('login', {
                title: 'Login',
                errors,
                formData: { email: loginDTO.email }, // Preserve the entered email
            });
        }

        try {
            const user = await authService.loginUser(loginDTO);

            // Generate a JWT token
            const token = jwt.sign(
                { id: user.id, email: user.email, user_id: user.user_id },  // Payload
                config.JWT_SECRET_KEY,               // Secret key from config
                { expiresIn: '15m' }                  // Expiry time
            );

            // Set the token as an HTTP-only cookie
            res.cookie('auth_token', token, {
                httpOnly: true,  // Ensures the cookie is only sent by the browser
                secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
                maxAge: 15 * 60 * 1000 // 15 min
            });

            return res.redirect('/tasks'); // Redirect to home/dashboard page after login
        } catch (error) {
            console.error('Login error:', error.message);

            return res.status(400).render('login', {
                title: 'Login',
                errors: [error.message],
                formData: { email: loginDTO.email }, // Preserve the entered email
            });
        }
    }

    logout(req, res) {
        // Clear the cookie by setting it to an expired value
        res.clearCookie('auth_token');
    
        // Redirect the user to the login page
        res.redirect('/login');
    }
    
}

module.exports = new AuthController();

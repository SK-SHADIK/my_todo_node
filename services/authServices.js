const authRepository = require('../repositories/authRepositories');
const CreateUserDTO = require('../dtos/registrationDTO');
const bcrypt = require('bcrypt');

class AuthService {
    async createUser(name, email, password, confirm_password) {
        try {
            // Create a new DTO instance
            const userDTO = new CreateUserDTO(name, email, password, confirm_password);

            // Validate the DTO instance
            userDTO.validate();

            // Check for duplicate email in the database
            const existingUser = await authRepository.findUserByEmail(email);
            if (existingUser) {
                throw new Error('Email already exists.');
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(userDTO.password, 10); // 10 is the salt rounds

            // Save the user in the database with the hashed password
            return await authRepository.createUser(userDTO.name, userDTO.email, hashedPassword);
        } catch (error) {
            console.error('Error creating user:', error.message);
            throw error;
        }
    }

    async loginUser(loginDTO) {
        const { email, password } = loginDTO;

        // Check if the user exists
        const user = await authRepository.findUserByEmail(email);
        if (!user) {
            throw new Error('Email does not exist. Please register first.');
        }

        // Validate the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password. Please try again.');
        }

        return user; // Return user for further processing
    }
}

module.exports = new AuthService();

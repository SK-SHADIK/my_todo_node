const crypto = require('crypto');

class CreateUserDTO {
    constructor(name, email, password, confirm_password) {
        this.generatedUuid = crypto.randomUUID(); // Generate UUID
        this.name = name;
        this.email = email;
        this.password = password;
        this.confirm_password = confirm_password;
    }

    // Custom validation method to check if the password and confirm password match
    validatePasswordsMatch() {
        if (this.password !== this.confirm_password) {
            throw new Error("Password and confirm password must match");
        }
    }

    // Simple validation method to check if name is a string
    validateName() {
        if (typeof this.name !== 'string' || this.name.length < 3 || this.name.length > 50) {
            throw new Error("Name must be a string between 3 and 50 characters");
        }
    }

    // Simple validation method to check if email is valid
    validateEmail() {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(this.email)) {
            throw new Error("Invalid email format. Please try with correct format");
        }
    }

    // Simple validation method to check if password is valid
    validatePassword() {
        if (typeof this.password !== 'string' || this.password.length < 6 || this.password.length > 100) {
            throw new Error("Password must be a string between 6 and 100 characters");
        }
    }

    // Validate if required fields are provided
    validateRequiredFields() {
        if (!this.name || !this.email || !this.password || !this.confirm_password) {
            throw new Error("All fields are required. Please make sure no field is left blank.");
        }
    }

    // Validate the entire object
    validate() {
        this.validateRequiredFields(); // Check for empty fields first
        this.validateName();
        this.validateEmail();
        this.validatePassword();
        this.validatePasswordsMatch();
    }
}

module.exports = CreateUserDTO;

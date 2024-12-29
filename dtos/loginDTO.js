class LoginDTO {
    constructor(data) {
        this.email = data.email;
        this.password = data.password;
    }

    validate() {
        const errors = [];
        if (!this.email || !this.email.trim()) {
            errors.push('Email is required.');
        } else if (!/\S+@\S+\.\S+/.test(this.email)) {
            errors.push('Invalid email format.');
        }

        if (!this.password || !this.password.trim()) {
            errors.push('Password is required.');
        }

        return errors;
    }
}

module.exports = LoginDTO;

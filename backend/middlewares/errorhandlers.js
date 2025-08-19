const handleErrors = (err) =>{
    let errors = { email: "", password: "", firstName: "", lastName: "", country: "" };

    // Validation errors
    if (err.message.includes("User validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

        // Duplicate error code
    if (err.code === 11000) {
        errors.email = "Email already exists";
        return errors;
    }

    if (err.message.includes("invalid email or role")) {
        errors.email = "Invalid email or role";
    }

    if (err.message.includes("invalid password")) {
        errors.password = "Invalid password";
    }

    return errors;
}

module.exports = handleErrors;
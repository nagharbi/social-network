exports.signUpErrors = (err) => {
    console.log(err.message);
    let errors = { username: "", email: "", password: "" };
  
    if (err.message.includes("username")) {
        errors.username = "Username incorrect or already taken!";
    }
  
    if (err.message.includes("email")) {
        errors.email = "Invalid Email or already taken!";
    }

    if(err.message.includes("password")) {
        errors.password = "It must contain at least eight characters, at least one uppercase letter, one lowercase letter, one number and one special character!";
    }

    return errors;
};
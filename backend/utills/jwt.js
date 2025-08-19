const jwt = require("jsonwebtoken");

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id, role) => {
    return jwt.sign({id, role}, process.env.SECRET, {
        expiresIn: maxAge
    })
}

module.exports = createToken;

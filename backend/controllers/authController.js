const handleErrors = require("../middlewares/errorhandlers");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const createToken = require("../utills/jwt");

const maxAge = 3 * 24 * 60 * 60 * 1000; // 3 days in seconds

register = async (req, res) => {
    const { email, password, firstName, lastName, country, phoneNo, role, userName } = req.body;
    
    try {
        const user = await User.create({
            email,
            password,
            firstName,
            lastName,
            country,
            role,
            phoneNo,
            userName
        });

        const token = createToken(user._id, user.role);
        console.log("Generated JWT:", token);
        res.cookie("jwt", token, {
             httpOnly: true,
              maxAge: maxAge
        });

        res.status(200).json({
            message: "User successfully registered",
            token: token
        });
    } catch (err) {
        console.error(err);
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }

};

login = async (req, res) => {
    const { email, password, role } = req.body;

    try {
        const user = await User.login(email, password, role);
        const token = createToken(user._id, user.role);
        res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: maxAge
        });

        res.status(200).json({
            message: "User successfully login",
            token: token
        })
    } catch (err) {
        console.log(err);
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
};

logout = async (req, res) => {
    //set the cookie maxAge to 0
    res.cookie("jwt", "", {
        maxAge: 1
    });
};

module.exports = {
    register,
    login,
    logout
};
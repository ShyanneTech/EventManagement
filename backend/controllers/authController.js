const handleErrors = require("../middlewares/errorhandlers");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const createToken = require("../utills/jwt");
const Organizer = require("../models/Organizer");

const maxAge = 3 * 24 * 60 * 60 * 1000; // 3 days in seconds

register_user = async (req, res) => {
    const { email, password, firstName, lastName, country, phoneNo, userName } = req.body;
    
    try {
        const user = await User.create({
            email,
            password,
            firstName,
            lastName,
            country,
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
            token: token,
            user: user.role
        });
    } catch (err) {
        console.error(err);
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }

};

register_organizer = async (req, res) => {
    const { email, password, firstName, lastName, country, phoneNo, userName } = req.body;
    
    try {
        const user = await Organizer.create({
            email,
            password,
            firstName,
            lastName,
            country,
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
            message: " Successfully registered",
            token: token,
            user: user.role
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
        if (role === "organizer") {
            const user = await Organizer.login(email, password, role);
            const token = createToken(user._id, user.role);
            res.cookie("jwt", token, {
                httpOnly: true,
                maxAge: maxAge
            });

            res.status(200).json({
                message: "User successfully login",
                token: token,
                user: user.role
            });
        } else {
            const user = await User.login(email, password, role);
            const token = createToken(user._id, user.role);
            res.cookie("jwt", token, {
                httpOnly: true,
                maxAge: maxAge
            });

            res.status(200).json({
                message: "User successfully login",
                token: token,
                user: user.role
            });
        };
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
    res.status(200).json({ message: "Successfully logged out" });
};

module.exports = {
    register_organizer,
    register_user,
    login,
    logout
};
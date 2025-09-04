const jwt = require("jsonwebtoken");
const Organizer = require("../models/Organizer");

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.status(401).json({ error: "Unauthorized Access" });
            } else {
                console.log(decodedToken);
                next();
            }
        })
    } else {
        res.redirect("/login");
    }
};

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.locals.user = null;
            } else {
                console.log(decodedToken);

                let user = user.findBy(decodedToken.id);
                res.locals.user = user;
            }
        })
    } else {
        res.locals.user = null;
    }
};

const organizerCheck = async (req, res, next) => {
    const token = req.cookies.jwt;

    if (!token) {
        return res.status(401).json({
            error: "Authentication required"
        });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.SECRET);

        const organizer = await Organizer.findById(decodedToken.id);
        if (!organizer || organizer.role !== "organizer") {
            return res.status(403).json({
                error: "Access Denied: Only organizers are allowed"
            });
        }

        req.user = organizer;
        next();
    } catch (err) {
        return res.status(401).json({
            error: "Invalid token"
        });
    }
};

module.exports = {
    organizerCheck
};

module.exports = {
    requireAuth,
    checkUser,
    organizerCheck
};
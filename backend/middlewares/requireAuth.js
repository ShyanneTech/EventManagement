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
    };

    try {
        const decodedToken = jwt.verify(token, process.env.SECRET);

        const user = await Organizer.findById(decodedToken.id);
        if (!user || user.role !== "organizer") {
            return res.status(403).json({
                error: "Access Denied only organizer is allowed"
            });
        }

        req.user = user;
        next();
    } catch(err) {
        return res.status(401).json({
            message: "Invalid token"
        });
    };
}

module.exports = {
    requireAuth,
    checkUser,
    organizerCheck
};
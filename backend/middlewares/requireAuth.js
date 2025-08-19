const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
    const token = res.cookies.jwt;

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
    const token = res.cookies.jwt;

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

module.exports = {
    requireAuth,
    checkUser
};
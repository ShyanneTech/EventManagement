const { Router } = require("express");
const router = Router();
const authController = require("../controllers/authController");

router.post("/login", authController.login);
router.post("/registerUser", authController.register_user);
router.post("/registerOrganizer", authController.register_organizer);
router.get("/logout", authController.logout);

module.exports = router;
const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const { organizerCheck } = require("../middlewares/requireAuth");

router.post("/createevents", organizerCheck, eventController.createEvents);
router.patch("/editevent", eventController.editEvents);

module.exports = router;
const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const { organizerCheck } = require("../middlewares/requireAuth");

router.use(organizerCheck);

router.post("/createevents", eventController.createEvents);
router.patch("/editevent/:eventId", eventController.editEvents);
router.patch("/disableevent/:eventId", eventController.disableEvent);
router.patch("/enableevent/:eventId", eventController.enableEvent);
router.delete("/deleteevent/:eventId", eventController.deleteEvent);

module.exports = router;
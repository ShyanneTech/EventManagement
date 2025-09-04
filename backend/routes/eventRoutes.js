const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const { organizerCheck } = require("../middlewares/requireAuth");

router.post("/createevents", organizerCheck, eventController.createEvents);
router.patch("/editevent/:eventId", organizerCheck, eventController.editEvents);
router.patch("/disableevent/:eventId", organizerCheck, eventController.disableEvent);
router.patch("/enableevent/:eventId", organizerCheck, eventController.enableEvent);
router.delete("/deleteevent/:eventId", organizerCheck, eventController.deleteEvent);

module.exports = router;
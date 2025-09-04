const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');
const { organizerCheck } = require('../middlewares/requireAuth');

router.use(organizerCheck);

router.post('/createTicket/:eventId', ticketController.createTicket);
router.patch('/disableTicket/:ticketId', ticketController.disableTicket);
router.patch('/enableTicket/:ticketId', ticketController.enableTicket);
router.delete('/deleteTicket/:ticketId', ticketController.deleteTicket);

module.exports = router;

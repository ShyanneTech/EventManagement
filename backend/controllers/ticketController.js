const Ticket = require('../models/Ticket');

const createTicket = async (req, res) => {
 try {
    const { eventId, ticketName, ticketPrice, venueCapacity, endDate } = req.body;

    const newTicket = await Ticket.create({
        eventId,
        ticketName,
        ticketPrice,
        venueCapacity,
        endDate
    });

    res.status(201).json({
        message: 'Ticket created successfully',
        newTicket 
    });
 } catch (err) {
    res.status(500).json({ error: 'Server error' });
 }
}

module.exports = {
  createTicket
};
const Ticket = require('../models/Ticket');

const createTicket = async (req, res) => {
 try {
    const { ticketName, ticketPrice, venueCapacity, endDate } = req.body;
    const eventId = req.params.eventId;

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
};

//disable ticket
const disableTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.ticketId);
        if (!ticket) {
            return res.status(404).json({ error: "Ticket not found" });
        }

        ticket.disabled = true;
        await ticket.save();
        res.status(200).json({ message: "Ticket disabled successfully" });
    } catch (err) {
        return res.status(500).json({
            error: "Internal server error"
        });
    }
};

//delete ticket
const deleteTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.ticketId);
        if (!ticket) {
            return res.status(404).json({ error: "Ticket not found" });
        }

        await ticket.deleteOne();
        res.status(200).json({ message: "Ticket deleted successfully" });
    } catch (err) {
        return res.status(500).json({
            error: "Internal server error"
        });
    }
};

//enable ticket
const enableTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.ticketId);
        if (!ticket) {
            return res.status(404).json({ error: "Ticket not found" });
        }

        ticket.disabled = false;
        await ticket.save();
        res.status(200).json({ message: "Ticket enabled successfully" });
    } catch (err) {
        return res.status(500).json({
            error: "Internal server error"
        });
    }
};



module.exports = {
  createTicket,
  disableTicket,
  deleteTicket,
  enableTicket
};
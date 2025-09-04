const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    ticketName: {
        type: String,
        required: true
    },
    ticketPrice: {
        type: Number,
        required: true
    },
    venueCapacity: {
        type: Number,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    }
});

const Ticket = mongoose.model('Ticket', TicketSchema);
module.exports = Ticket;
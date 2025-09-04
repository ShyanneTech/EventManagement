const mongoose = require("mongoose");
const { eventNames } = require("./User");

const eventSchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    venue: {
        type: String,
        required: true
    },
    eventDescription: {
        type: String,
        required: true
    },
    ticketImage: {
        type: String,
        required: true
    },
    venueAddress: {
        type: String,
        required: true
    },
    schedule: [
        {
            date: Date,
            startTime: String,
            endTime: String
        }
    ]
});

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
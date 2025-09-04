//const Organizer = require("../models/Organizer");
const Event = require("../models/Event");


//create an event
const createEvents = async  (req, res) => {
    try {
        const { eventName, category, price, startDate, endDate, venue, eventDescription, ticketImage, venueAddress, schedule } = req.body;

        const event = await Event.create({
            eventName,
            category,
            price,
            startDate,
            endDate,
            venue,
            eventDescription,
            ticketImage,
            venueAddress,
            schedule
        });

        res.status(201).json({
            message: "Event created successfully",
            event
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

//Edit an event
const editEvents = async  (req, res) => {
    try {
        const { eventName, category, price, startDate, endDate, venue, eventDescription, ticketImage, venueAddress, schedule } = req.body;
        const { eventId } = req.params.id;

        const event = await Event.findByIdAndUpdate(eventId, {
            eventName,
            category,
            price,
            startDate,
            endDate,
            venue,
            eventDescription,
            ticketImage,
            venueAddress,
            schedule
        });

        res.status(201).json({
            message: "Event edited successfully",
            event
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

module.exports = {
    createEvents,
    editEvents
};
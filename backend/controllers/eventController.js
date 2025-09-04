//const Organizer = require("../models/Organizer");
const Event = require("../models/Event");

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
        const eventId = req.params.id;

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
            message: "Event edited successfully"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

//diasble event 
const disableEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.eventId);
        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }
        event.disabled = true;
        await event.save();
        res.status(200).json({ message: "Event disabled successfully" });
    } catch (err) {
        return res.status(500).json({
            error: "Internal server error"
        });
    }
};

//enable event
const enableEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.eventId);
        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }
        event.disabled = false;
        await event.save();
        res.status(200).json({ message: "Event enabled successfully" });
    } catch (err) {
        return res.status(500).json({
            error: "Internal server error"
        });
    }
};

//delete event
const deleteEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.eventId);
        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }
        await event.remove();
        res.status(200).json({ message: "Event deleted successfully" });
    } catch (err) {
        return res.status(500).json({
            error: "Internal server error"
        });
    }
};

module.exports = {
    createEvents,
    editEvents,
    disableEvent,
    enableEvent,
    deleteEvent
};
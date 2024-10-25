const Event = require("../models/eventSchema.js");

const eventCreate = async (req, res) => {
    try {
      // Check if an event with the same eventID already exists
      const existingEventByID = await Event.findOne({
        eventID: req.body.eventID,
      });
  
      if (existingEventByID) {
        // If it exists, send a message and return
        return res.status(400).send({ message: "Sorry, this event ID already exists." });
      }
  
      // If it does not exist, create a new event
      const event = new Event({
        ...req.body, // Spread operator to handle the request body fields
      });
  
      // Save the event and send the result as a response
      const result = await event.save();
      return res.status(201).send({ result, message: "Event created successfully" });
  
    } catch (err) {
      return res.status(500).json({ error: err.message }); // Send a JSON response with the error message
    }
  };




  const getAllEvents = async (req, res) => {
    try {
      // Fetch all events from the database
      const events = await Event.find(); // Fetches all events without any conditions
      
      // If there are no events, return a 404 status with a message
      if (events.length === 0) {
        return res.status(404).json({ message: "No events found" });
      }
  
      // If events are found, return them in the response
      return res.status(200).json({ events }); // Send the events in JSON format
    } catch (err) {
      // If there's an error, return a 500 status with the error message
      return res.status(500).json({ error: err.message });
    }
  };
  



// Get the latest eventID
const getLatestEventID = async (req, res) => {
    try {
      const latestEvent = await Event.findOne().sort({ eventID: -1 }).exec();
      let newEventID;
      if (latestEvent) {
        const lastIDNumber = parseInt(latestEvent.eventID.split('-')[1], 10);
        newEventID = `CCI-${String(lastIDNumber + 1).padStart(3, "0")}`;
      } else {
        newEventID = "CCI-001"; // Default if no event exists
      }
      res.status(200).json({ eventID: newEventID });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };







  
//   module.exports = { getLatestEventID };
  

module.exports = { eventCreate, getAllEvents, getLatestEventID };

const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  eventID: { type: String, required: true },
  eventName: { type: String, required: true },
  eventDate: { type: Date, required: true },
  eventDescription: { type: String, required: true },
  location: { type: String, required: true },
  eventType: { type: String, required: true }, // E.g., service, meeting, outreach
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: "Member" }], // Array of member references
  checkinCount: { type: Number, default: 0 }, // Optional, could be calculated based on attendees length
  organizer: { type: String }, // Or reference to a member ID if organizers are members
  speaker: { type: String }, // Optional field for events with a speaker
  capacity: { type: Number }, // Optional for events with a capacity limit
  evenStatus: { type: String, default: "upcoming" }, // Status of the event: upcoming, ongoing, completed
  tags: [String], // Array of tags for event categorization
});

module.exports = mongoose.model("Event", eventSchema);

const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  eventID: { type: String, required: true },
  eventName: { type: String, required: true },
  eventDate: { type: Date, required: true },
  eventDescription: { type: String, required: true },
  location: { type: String, required: true },
  eventType: { type: String, required: true }, 
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: "Member" }],
  checkinCount: { type: Number, default: 0 }, 
  organizer: { type: String }, 
  speaker: { type: String }, 
  capacity: { type: Number },
  evenStatus: { type: String, default: "upcoming" }, 
  countdown: { type: String, required: true },
  tags: [String],
});

module.exports = mongoose.model("Event", eventSchema);

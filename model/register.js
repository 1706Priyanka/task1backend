const mongoose = require("mongoose");
const registerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  ticketNumber: { type: String },
  eventName: { type: String },
});

const EventRegistration = mongoose.model("event", registerSchema);
module.exports = EventRegistration;

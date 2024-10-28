const mongoose = require("mongoose");

const childSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    gender: {
        type: String,
        enum: ["Male", "Female"],
        required: true,
    },
    allergies: {
        type: String,
    },
    specialNeeds: {
        type: String,
    },
    ageCategory: {
        type: String,
        enum: ["Child", "Teen"],
    },
    fathersName: {
        type: String,
    },
    mothersName: {
        type: String,
    },
    guardianName: {
        type: String,
    },
    dateAdded: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Child", childSchema);

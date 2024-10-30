const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    address: {
        type: String,
    },
    state: {
        type: String,
        enum: ["New Member", "Existing Member"],
    },
    gender: {
        type: String,
        enum: ["Male", "Female"],
        required: true,
    },
    department: {
        type: String,
    },
    occupation: {
        type: String,
    },
    status: {
        type: String,
        enum: ["Active", "Inactive"],
    },
    contributionToWelfare: {
        type: String,
        enum: ["Yes", "No"],
    },
    memberSince: {
        type: Date,
    },
    numberOfChildren: {
        type: Number,
    },
    tithePayer: {
        type: String,
        enum: ["Yes", "No"],
    },
    branch: {
        type: String,
    },
    dateAdded: {
        type: Date,
        default: Date.now,
    },
    lastCheckInDate: {
        type: Date,
        default: null 
    },

});

module.exports = mongoose.model("Member", memberSchema);

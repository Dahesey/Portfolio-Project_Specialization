const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    contact: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    confirmPassword: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "Admin"
    },
    churchName: {
        type: String,
        unique: true,
        required: true
    },

    gender: {
        type: String,
        enum: ['Male', 'Female'], 
        required: [true, 'Gender is required'],
    },
    dateAdded: {
        type: Date,
        default: Date.now,
    },

});

module.exports = mongoose.model("admin", adminSchema)